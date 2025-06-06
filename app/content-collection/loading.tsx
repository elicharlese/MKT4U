import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="space-y-4 text-center">
          <Skeleton className="h-12 w-[300px] mx-auto" />
          <Skeleton className="h-6 w-[500px] mx-auto" />
          <div className="flex justify-center">
            <Skeleton className="h-1 w-24 rounded-full my-2" />
          </div>
        </div>

        <Card className="border border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading your content collection...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

