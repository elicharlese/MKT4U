import { Button } from "@/components/ui/button"
import { Save, Share, Download } from "lucide-react"
import { CampaignFlowEditor } from "./campaign-flow-editor"

export default function CampaignFlowPage() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight gradient-heading">Campaign Flow Editor</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Design, organize, and edit your marketing campaign flows
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-accent/30 text-accent-foreground hover:bg-accent/10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-secondary/30 text-secondary-foreground hover:bg-secondary/10">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Flow
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
        </div>

        <CampaignFlowEditor />
      </div>
    </main>
  )
}

