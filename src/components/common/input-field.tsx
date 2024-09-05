import { Control } from "react-hook-form"
import { Input } from "../ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"

type Props = {
  label: string
  name: string
  isTextarea?: boolean
  control: Control<any, any>
  type?: string
  register?: any
  placeholder?: string
  defaultValue?: string | number
}

export const InputField = ({ name, label, isTextarea = false, placeholder, type, control, register, defaultValue }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea className="bg-white focus:border-orange-300 resize-none h-32" placeholder={placeholder} {...field}>
                {defaultValue}
              </Textarea>
            ) : (
              <Input className="bg-white focus:border-orange-300" type={type} placeholder={placeholder} defaultValue={defaultValue} {...field} {...register} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
