"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { User, Building2 } from "lucide-react"
import { StudentAuthForm } from "./student-auth-form"
import { PartnerAuthForm } from "./partner-auth-form"

export function AuthDropdown() {
  const [authType, setAuthType] = useState<"student" | "partner" | null>(null)

  const handleAuthSelect = (type: "student" | "partner") => {
    setAuthType(type)
  }

  const resetAuth = () => {
    setAuthType(null)
  }

  return (
    <Dialog open={!!authType} onOpenChange={(open) => !open && resetAuth()}>
      <div className="flex items-center space-x-3">
        {/* Student Button */}
        <Button
          onClick={() => handleAuthSelect("student")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          <User className="mr-2 h-4 w-4" />
          Student Login
        </Button>

        {/* Partner Button */}
        <Button
          onClick={() => handleAuthSelect("partner")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          <Building2 className="mr-2 h-4 w-4" />
          Partner Login
        </Button>
      </div>

      <DialogContent className="sm:max-w-md">
        {authType === "student" && <StudentAuthForm onClose={resetAuth} />}
        {authType === "partner" && <PartnerAuthForm onClose={resetAuth} />}
      </DialogContent>
    </Dialog>
  )
}
