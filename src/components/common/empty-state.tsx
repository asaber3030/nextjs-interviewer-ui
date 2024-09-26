import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { FileQuestion, InboxIcon } from "lucide-react"

interface EmptyStateCardProps {
  title?: string
}

export default function EmptyStateCard({ title = "No items found" }: EmptyStateCardProps) {
  return (
    <Card className="w-full py-6 pb-0 mt-1">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center mb-4 ring-4 ring-background">
            <FileQuestion className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold text-center mb-2">{title}</CardTitle>
          <p className="text-sm text-center text-muted-foreground">Content you add will appear here.</p>
        </div>
      </CardContent>
      <div className="h-2 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"></div>
    </Card>
  )
}
