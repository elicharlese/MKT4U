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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border border-primary/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-4 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-primary/20 mt-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading campaign data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

