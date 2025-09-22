"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronDown, User, Building2 } from "lucide-react"
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign Up / Login
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => handleAuthSelect("student")}>
            <User className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">Student Access</span>
              <span className="text-xs text-muted-foreground">Join or login as student</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAuthSelect("partner")}>
            <Building2 className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">Partner Access</span>
              <span className="text-xs text-muted-foreground">Join or login as partner</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-md">
        {authType === "student" && <StudentAuthForm onClose={resetAuth} />}
        {authType === "partner" && <PartnerAuthForm onClose={resetAuth} />}
      </DialogContent>
    </Dialog>
  )
}
