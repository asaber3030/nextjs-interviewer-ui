import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Subscription } from "@prisma/client"
import { Download } from "lucide-react"

type Props = {
  subscription: Subscription
}

export const SubscriptionActions = ({ subscription }: Props) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <CardDescription>Manage user's subscription</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-1">
        <Button className="w-full" variant="outline">
          Change Plan
        </Button>
        <Button variant="secondary" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Invoice
        </Button>
        <Button variant="outline-destructive" className="w-full">
          Cancel Subscription
        </Button>
      </CardContent>
    </Card>
  )
}
