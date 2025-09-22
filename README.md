# MedhasMind - AI-Powered Hackathon Preparation Platform

A comprehensive full-stack platform for hackathon preparation featuring AI-powered learning paths, real-time collaboration, and personalized mentorship.

## 📁 Project Structure

```
medhasmind/
├── 📁 frontend/          # Next.js React Application
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components & UI
│   ├── lib/             # Utilities & API client
│   ├── public/          # Static assets
│   ├── package.json     # Frontend dependencies
│   └── .env.local       # Frontend environment variables
├── 📁 backend/          # FastAPI Python Backend
│   ├── app/             # FastAPI application
│   ├── requirements.txt # Python dependencies
│   └── supabase_setup.sql # Database schema
├── netlify.toml         # Netlify deployment config
├── DEPLOYMENT.md        # Complete deployment guide
├── deploy-check.js      # Deployment readiness checker
└── package.json         # Monorepo root scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- Supabase account

### Development Setup

1. **Clone and setup:**
   ```bash
   git clone <your-repo>
   cd medhasmind
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Setup Supabase:**
   - Create project at [supabase.com](https://supabase.com)
   - Run `backend/supabase_setup.sql` in SQL Editor
   - Get API keys from Settings → API

4. **Configure environment:**
   ```bash
   # Backend (.env)
   cp backend/.env.example backend/.env
   # Edit with your Supabase keys

   # Frontend (.env.local)
   # Already configured for development
   ```

5. **Start development servers:**
   ```bash
   # Terminal 1: Backend
   npm run backend:dev

   # Terminal 2: Frontend
   npm run dev
   ```

6. **Visit:** http://localhost:3000

## 🎯 Features

### Frontend (Next.js)
- ✅ **Modern UI** with Tailwind CSS & Shadcn/ui
- ✅ **Authentication** with Supabase Auth
- ✅ **Real-time API integration**
- ✅ **Responsive design** for all devices
- ✅ **TypeScript** for type safety

### Backend (FastAPI)
- ✅ **RESTful API** with automatic documentation
- ✅ **JWT authentication** with secure tokens
- ✅ **Database integration** with Supabase
- ✅ **Row Level Security** for data protection
- ✅ **CORS configured** for frontend integration

### Database (Supabase)
- ✅ **PostgreSQL** with 9 core tables
- ✅ **User management** (students, partners, admins)
- ✅ **Course system** with progress tracking
- ✅ **Hackathon management** with team formation
- ✅ **Portfolio showcase** with GitHub integration
- ✅ **Analytics** and activity tracking

## 🔧 Available Scripts

```bash
# Development
npm run dev                 # Start frontend dev server
npm run backend:dev         # Start backend dev server

# Building
npm run build              # Build frontend for production
npm run deploy:check       # Check deployment readiness

# Installation
npm run install:all        # Install all dependencies
npm run frontend:install   # Install frontend deps only
npm run backend:install    # Install backend deps only

# Testing
npm run backend:test       # Test backend database connection
```

## 🚀 Deployment

### Netlify + Vercel (Recommended)

1. **Frontend → Netlify:**
   ```bash
   # Push to GitHub, connect to Netlify
   # Netlify auto-builds from frontend/ directory
   ```

2. **Backend → Vercel:**
   ```bash
   cd backend && vercel --prod
   # Get backend URL for frontend config
   ```

3. **Update frontend environment** in Netlify dashboard

### Alternative Deployments

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Railway deployment
- Render deployment
- Manual Netlify deployment
- Environment configuration

## 📊 API Documentation

When backend is running:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **OpenAPI Schema:** http://localhost:8000/openapi.json

## 🧪 Testing

```bash
# Check deployment readiness
npm run deploy:check

# Test backend database
npm run backend:test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** - The React framework
- **FastAPI** - Modern Python web framework
- **Supabase** - Open source Firebase alternative
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful UI components

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/medhasmind/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/medhasmind/discussions)

---

**Built with ❤️ for the hackathon community**