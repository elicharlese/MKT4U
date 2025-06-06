import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <AlertCircle className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight gradient-heading">Page Not Found</h1>
        <p className="text-xl text-muted-foreground">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
        <div className="flex justify-center">
          <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
        </div>
        <div className="pt-6">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

