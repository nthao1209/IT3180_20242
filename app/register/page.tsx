import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  username: z.string().min(3, { message: 'Tên người dùng quá ngắn' }),
  name: z.string().min(1, { message: 'Vui lòng nhập tên' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(8, { message: 'Mật khẩu tối thiểu 8 ký tự' }),
  confirmPassword: z.string(),
  date_of_birth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Ngày sinh không hợp lệ',
  }),
  gender: z.enum(['Nam', 'Nữ', 'Khác']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
})

const REGISTER_ERROR_URL = '/register?error='

async function handleRegister(formData: FormData) {
  'use server'

  const data = {
    username: formData.get('username'),
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    date_of_birth: formData.get('date_of_birth'),
    gender: formData.get('gender'),
  }

  const validated = formSchema.safeParse(data)
  if (!validated.success) {
    const message = validated.error.errors[0].message
    redirect(REGISTER_ERROR_URL + encodeURIComponent(message))
  }

  const { username, name, email, password, date_of_birth, gender } = validated.data

  const existing = await prisma.users.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  })

  if (existing) {
    redirect(REGISTER_ERROR_URL + encodeURIComponent('Email hoặc tên đăng nhập đã tồn tại'))
  }

  const hashed = await bcrypt.hash(password, 10)

  await prisma.users.create({
    data: {
      username,
      name,
      email,
      password: hashed,
      role: 'member',
      date_of_birth: new Date(date_of_birth),
      gender,
    },
  })

  redirect('/auth/signin')
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <form action={handleRegister} className="space-y-2 max-w-md mx-auto mt-8">
      {searchParams?.error && (
        <p className="border border-red-300 rounded-md p-2 bg-red-100 text-red-700">
          {searchParams.error}
        </p>
      )}
      <div>
        <Label htmlFor="username">Tên đăng nhập</Label>
        <Input name="username" id="username" required />
      </div>
      <div>
        <Label htmlFor="name">Họ và tên</Label>
        <Input name="name" id="name" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="date_of_birth">Ngày sinh</Label>
        <Input name="date_of_birth" id="date_of_birth" type="date" required />
      </div>
      <div>
        <Label htmlFor="gender">Giới tính</Label>
        <select name="gender" id="gender" required className="border rounded p-2 w-full">
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      <div>
        <Label htmlFor="password">Mật khẩu</Label>
        <Input name="password" id="password" type="password" required />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
        <Input name="confirmPassword" id="confirmPassword" type="password" required />
      </div>
      <Button type="submit" className="w-full">Đăng ký</Button>
    </form>
  )
}
