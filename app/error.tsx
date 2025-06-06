"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight gradient-heading">Something went wrong</h1>
        <p className="text-xl text-muted-foreground">
          We apologize for the inconvenience. An error occurred while processing your request.
        </p>
        <div className="flex justify-center">
          <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
        </div>
        <div className="pt-6">
          <Button onClick={reset} className="bg-primary hover:bg-primary/90">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}

