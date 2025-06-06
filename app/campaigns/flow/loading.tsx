import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-12 w-[300px]" />
            <Skeleton className="h-6 w-[500px] mt-2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-[120px]" />
            <Skeleton className="h-9 w-[120px]" />
            <Skeleton className="h-9 w-[120px]" />
          </div>
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-1 w-24 rounded-full my-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card className="border border-primary/20">
              <CardContent className="p-6">
                <div className="h-[600px] flex flex-col items-center justify-center">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Loading campaign flow editor...</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border border-secondary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-[150px]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-[200px] w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-accent/20 mt-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-[150px]" />
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

