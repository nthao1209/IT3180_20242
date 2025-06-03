import React, { useEffect } from "react"
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle} from "./ui/dialog"
import {Form,FormControl,FormField,FormItem,FormLabel} from "./ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { addCategory, updateCategory } from "@/actions/actions"
import { usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Category } from "@/app/(admin)/admin/categories/columns"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  category?: Category
}

/**
 * Zod schema giữ cả hai field:
 * - id (default = -1, nhưng không dùng trực tiếp trong onSubmit)
 * - name
 */
const formSchema = z.object({
  id: z.number().default(-1),
  name: z
    .string()
    .min(2, { message: "Category must be entered" })
    .max(20, { message: "Category name too long" }),
})

// Input type cho useForm: { id?: number; name: string }
type FormValues = z.input<typeof formSchema>

function AddCategoryDialog({ setOpen, open, category }: Props) {
  const { toast } = useToast()
  const path = usePathname()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: -1,
      name: "",
    },
  })

  useEffect(() => {
    if (category) {
      form.setValue("id", category.category_id)
      form.setValue("name", category.category_name)
    }
  }, [category, form])

  const onSubmit = async (values: FormValues) => {
    try {
      // Chỉ cần name để add/update; id từ props.category khi edit
      const nameToUse = values.name

      let message = "Category has been saved"
      if (category) {
        await updateCategory(category.category_id, nameToUse, path)
        message = "Category updated"
      } else {
        await addCategory(nameToUse, path)
      }

      toast({
        description: message,
      })
      form.reset({ id: -1, name: "" })
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast({
        description: "Failed to perform action",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit category" : "Add category"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Update the existing category name."
              : "Enter a new category name."}
          </DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-600 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <Button type="submit">Save</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog
