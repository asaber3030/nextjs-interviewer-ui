"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["1 user", "10GB storage", "Basic support"],
    description: "Perfect for individuals just starting out.",
  },
  {
    name: "Pro",
    price: "$19.99",
    features: ["5 users", "50GB storage", "Priority support", "Advanced analytics"],
    description: "Ideal for small teams and growing businesses.",
  },
  {
    name: "Enterprise",
    price: "$49.99",
    features: ["Unlimited users", "500GB storage", "24/7 premium support", "Custom integrations"],
    description: "For large organizations with complex needs.",
  },
];

export default function SubscriptionDialog() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Subscription Plans</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Choose Your Subscription Plan</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          {plans.map((plan) => (
            <Button
              key={plan.name}
              variant={selectedPlan.name === plan.name ? "default" : "outline"}
              className="h-auto flex flex-col items-start p-4 space-y-2"
              onClick={() => setSelectedPlan(plan)}
            >
              <span className="text-lg font-bold">{plan.name}</span>
              <span className="text-2xl font-bold">{plan.price}/mo</span>
              <span className="text-sm text-muted-foreground">{plan.features[0]}</span>
            </Button>
          ))}
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">{selectedPlan.name} Plan Details</h3>
          <p className="text-sm text-muted-foreground mb-4">{selectedPlan.description}</p>
          <ul className="space-y-2">
            {selectedPlan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center text-sm"
              >
                <Check className="mr-2 h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="w-full sm:w-auto">
            Choose {selectedPlan.name} Plan
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
