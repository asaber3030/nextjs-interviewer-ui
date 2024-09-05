import React from "react"

import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  label: string
  name: string
  control: Control<any, any>
  register?: any
  placeholder?: string
  defaultValue?: string
  children: React.ReactNode
}

export const SelectField = ({ name, label, control, register, placeholder, children, defaultValue }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value ? field.value : defaultValue}>
              <FormControl>
                <SelectTrigger className="bg-white" defaultValue={defaultValue}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{children}</SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
