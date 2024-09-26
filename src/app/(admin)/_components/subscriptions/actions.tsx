import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Subscription } from "@prisma/client"
import { CreditCard, Download } from "lucide-react"

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
      <CardContent className="space-y-2">
        <Button className="w-full">Change Plan</Button>
        <Button variant="outline" className="w-full">
          Cancel Subscription
        </Button>
        <Button variant="secondary" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Invoice
        </Button>
      </CardContent>
    </Card>
  )
}
