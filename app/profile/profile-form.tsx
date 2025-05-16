'use client'

import { State, updateProfile } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import React, { useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const profileFormSchema = z.object({
  username: z.string().min(3),
  name: z.string(),
  email: z.string().email(),
  date_of_birth: z.string().optional(),
  gender: z.enum(['Nam', 'Nữ', 'Khác']).optional(),
  role: z.string().optional(),
  old_password: z.string().optional(),
  new_password: z.string().min(8).optional(),
  confirm_password: z.string().optional()
})

type Props = {
  user: {
    username?: string
    name?: string
    email?: string
    date_of_birth?: string
    gender?: 'Nam' | 'Nữ' | 'Khác'
    role?: string
  } | null
}

function ProfileForm({ user }: Props) {
  console.log(user)
  const initialState: State = { message: null }
  const [state, formAction] = useActionState(updateProfile, initialState)
  const [showPassword, setShowPassword] = useState(false)

  const formatDate = (date: Date | undefined | null): string => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user?.username || '',
      name: user?.name || '',
      email: user?.email || '',
      date_of_birth: user?.date_of_birth ? formatDate(new Date(user.date_of_birth)) : '',
      gender: user?.gender || undefined,
      role: user?.role || '',
      old_password: '',
      new_password: '',
      confirm_password: ''
    }
  })

  useEffect(() => {
  if (state.message?.includes('Cập nhật') && !state.requireSignOut) {
    form.reset()
    // Bắt reload lại trang để lấy session mới nhất từ server
    window.location.reload()
  }

  if (state.requireSignOut) {
    window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent('/')}&message=${encodeURIComponent(state.message ?? '')}`
  }
}, [state, form])


  return (
    <Form {...form}>
      <form action={formAction} className='space-y-4'>

        {/* Thông tin cá nhân */}
        <FormField name="username" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl><Input placeholder="Username" {...field} /></FormControl>
          </FormItem>
        )} />
        <FormField name="name" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Họ tên</FormLabel>
            <FormControl><Input placeholder="Họ tên" {...field} /></FormControl>
          </FormItem>
        )} />
        <FormField name="email" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input placeholder="Email" type="email" {...field} /></FormControl>
          </FormItem>
        )} />
        <FormField name="date_of_birth" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Ngày sinh</FormLabel>
            <FormControl><Input type="date" {...field} /></FormControl>
          </FormItem>
        )} />
        <FormField name="gender" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Giới tính</FormLabel>
            <FormControl>
              <select {...field} className="w-full border px-2 py-1 rounded">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </FormControl>
          </FormItem>
        )} />
        

        {/* Mật khẩu */}
        <FormField name="old_password" control={form.control} render={({ field }) => (
          <FormItem className="relative">
            <FormLabel>Mật khẩu cũ</FormLabel>
             <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-4 top-[50%] -translate-y-1/2"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
            <FormControl>
              <Input type={showPassword ? 'text' : 'password'} placeholder="Old password" {...field} />
            </FormControl>
          </FormItem>
        )} />
        <FormField name="new_password" control={form.control} render={({ field }) => (
          <FormItem className="relative">
            <FormLabel>Mật khẩu mới</FormLabel>
             <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-4 top-[50%] -translate-y-1/2"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
            <FormControl>
              <Input type={showPassword ? 'text' : 'password'} placeholder="New password" {...field} />
            </FormControl>
          </FormItem>
        )} />
        <FormField name="confirm_password" control={form.control} render={({ field }) => (
          <FormItem className="relative">
            <FormLabel>Nhập lại mật khẩu</FormLabel>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-4 top-[50%] -translate-y-1/2"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
            <FormControl>
              <Input type={showPassword ? 'text' : 'password'} placeholder="Confirm new password" {...field} />
            </FormControl>
          </FormItem>

        )} />

        <p className="text-red-500 text-sm">{state.message}</p>
        <Button type="submit" className="w-full"  >Cập nhật thông tin</Button>
      </form>
    </Form>
  )
}

export default ProfileForm
