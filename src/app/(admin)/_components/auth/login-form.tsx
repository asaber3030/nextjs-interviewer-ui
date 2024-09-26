"use client"

import zod from "zod"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { AdminSchema } from "@/schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/common/loading-button"

import { adminLoginAction } from "@/actions/admin"
import { adminRoutes } from "@/lib/route"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { responseCodes } from "@/lib/api"

export const AdminLoginForm = () => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(AdminSchema.login),
    defaultValues: {
      email: "a@a.com",
      password: "123456789",
    },
  })

  const loginMutation = useMutation({
    mutationFn: ({ values }: { values: zod.infer<typeof AdminSchema.login> }) => adminLoginAction(values),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (data) => {
      toast.error(data?.message)
    },
  })

  const handleLogin = () => {
    loginMutation.mutate({ values: form.getValues() })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Adress</FormLabel>
              <FormControl>
                <Input placeholder="ex@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton className="w-full" loading={loginMutation.isPending}>
          Login
        </LoadingButton>
      </form>
    </Form>
  )
}
