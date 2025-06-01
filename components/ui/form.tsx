"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
<<<<<<< HEAD
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
=======
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
>>>>>>> origin/rate_cmt
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
<<<<<<< HEAD
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
=======
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>>>>>>> origin/rate_cmt
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
<<<<<<< HEAD
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
=======
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>>>>>>> origin/rate_cmt
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
<<<<<<< HEAD
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
=======
  const { getFieldState, formState } = useFormContext()

>>>>>>> origin/rate_cmt
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

<<<<<<< HEAD
function FormItem({ className, ...props }: React.ComponentProps<"div">) {
=======
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
>>>>>>> origin/rate_cmt
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
<<<<<<< HEAD
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
=======
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
>>>>>>> origin/rate_cmt
  const { error, formItemId } = useFormField()

  return (
    <Label
<<<<<<< HEAD
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
=======
      ref={ref}
      className={cn(error && "text-destructive", className)}
>>>>>>> origin/rate_cmt
      htmlFor={formItemId}
      {...props}
    />
  )
<<<<<<< HEAD
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
=======
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
>>>>>>> origin/rate_cmt
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
<<<<<<< HEAD
      data-slot="form-control"
=======
      ref={ref}
>>>>>>> origin/rate_cmt
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
<<<<<<< HEAD
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
=======
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
>>>>>>> origin/rate_cmt
  const { formDescriptionId } = useFormField()

  return (
    <p
<<<<<<< HEAD
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children
=======
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children
>>>>>>> origin/rate_cmt

  if (!body) {
    return null
  }

  return (
    <p
<<<<<<< HEAD
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
=======
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
>>>>>>> origin/rate_cmt
      {...props}
    >
      {body}
    </p>
  )
<<<<<<< HEAD
}
=======
})
FormMessage.displayName = "FormMessage"
>>>>>>> origin/rate_cmt

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
