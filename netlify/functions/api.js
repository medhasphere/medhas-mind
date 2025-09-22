// Netlify Function - API Router for MedhasMind
// This handles API requests using Supabase directly

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;
    const body = event.body ? JSON.parse(event.body) : null;

    // Extract auth token from Authorization header
    const authHeader = event.headers.authorization;
    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const { data: { user: authUser }, error } = await supabase.auth.getUser(token);
        if (!error && authUser) {
          user = authUser;
        }
      } catch (err) {
        console.log('Auth verification failed:', err.message);
      }
    }

    // Route handling
    switch (path) {
      case '/auth/signup':
        if (method !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

        try {
          const { data, error } = await supabase.auth.signUp({
            email: body.email,
            password: body.password,
            options: {
              data: {
                name: body.name,
                user_type: body.user_type,
                role: body.user_type === 'student' ? 'student' : 'partner'
              }
            }
          });

          if (error) throw error;

          // Create profile in database
          await supabaseAdmin.from('profiles').insert({
            id: data.user.id,
            email: body.email,
            name: body.name,
            role: body.user_type === 'student' ? 'student' : 'partner',
            user_type: body.user_type
          });

          return {
            statusCode: 201,
            headers,
            body: JSON.stringify({
              access_token: data.session?.access_token,
              token_type: 'bearer',
              expires_in: 3600,
              user: {
                id: data.user.id,
                email: body.email,
                name: body.name,
                role: body.user_type === 'student' ? 'student' : 'partner',
                user_type: body.user_type
              }
            })
          };
        } catch (error) {
          return { statusCode: 400, headers, body: JSON.stringify({ error: error.message }) };
        }

      case '/auth/login':
        if (method !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: body.email,
            password: body.password
          });

          if (error) throw error;

          // Get user profile
          const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              access_token: data.session?.access_token,
              token_type: 'bearer',
              expires_in: 3600,
              user: profile
            })
          };
        } catch (error) {
          return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid credentials' }) };
        }

      case '/users/profile':
        if (!user) return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };

        if (method === 'GET') {
          const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          return { statusCode: 200, headers, body: JSON.stringify(profile) };
        }

        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

      case '/courses':
        if (method === 'GET') {
          const { data: courses } = await supabase
            .from('courses')
            .select('*')
            .eq('is_published', true)
            .limit(20);

          return { statusCode: 200, headers, body: JSON.stringify(courses || []) };
        }

        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

      case '/hackathons':
        if (method === 'GET') {
          const { data: hackathons } = await supabase
            .from('hackathons')
            .select('*')
            .eq('is_active', true)
            .limit(20);

          return { statusCode: 200, headers, body: JSON.stringify(hackathons || []) };
        }

        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

      default:
        return { statusCode: 404, headers, body: JSON.stringify({ error: 'API endpoint not found' }) };
    }

  } catch (error) {
    console.error('API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};