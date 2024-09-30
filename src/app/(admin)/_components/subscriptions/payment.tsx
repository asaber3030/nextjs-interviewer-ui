import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Subscription } from "@prisma/client"
import { CreditCard } from "lucide-react"

type Props = {
  subscription: Subscription
}

export const SubscriptionPaymentDetails = ({ subscription }: Props) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Current payment information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <CreditCard className="h-8 w-8" />
          <div>
            <p className="font-semibold">Visa ending in 4242</p>
            <p className="text-sm text-muted-foreground">Expires 12/2024</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
