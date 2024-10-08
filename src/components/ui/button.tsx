import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

const buttonVariants = cva(
  "inline-flex px-2.5 py-1.5 text-sm font-semibold items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-secondaryMain text-white  hover:bg-secondaryMain/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        blue: "bg-blue-600 text-white hover:bg-blue-600/90",
        success: "bg-green-700 text-white hover:bg-green-700/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "outline-destructive": "border border-red-500 bg-background hover:bg-red-100 text-red-700",
        "outline-blue": "border border-blue-500 bg-background hover:bg-blue-100 text-blue-700",
        "outline-success": "border border-green-700 bg-background hover:bg-green-50 text-green-700",
        "outline-default": "bg-transparent border border-secondaryMain text-secondaryMain hover:bg-secondaryMain/20",
        "outline-warning": "bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500/20",
        indigo: "bg-indigo-600 hover:bg-indigo-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
