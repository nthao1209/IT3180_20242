// /app/(admin)/admin/payment-methods/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type PaymentMethod = {
  id: string
  name: string
  description: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Định nghĩa kiểu chung cho response của API
interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

export default function AdminPaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Form state
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isActive, setIsActive] = useState<boolean>(true)
  const [editId, setEditId] = useState<string | null>(null)

  useEffect(() => {
    fetchMethods()
  }, [])

  async function fetchMethods() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/payment-methods')
      const json = (await res.json()) as ApiResponse<PaymentMethod[]>

      if (json.success && Array.isArray(json.data)) {
        setMethods(json.data)
      } else {
        toast.error(json.message || 'Không lấy được danh sách')
      }
    } catch (error: unknown) {
      console.error('Fetch payment methods error:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Lỗi không xác định khi lấy danh sách')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Vui lòng nhập tên phương thức')
      return
    }

    try {
      let res: Response
      let json: ApiResponse<PaymentMethod> | ApiResponse<PaymentMethod[]>

      if (editId) {
        // UPDATE
        res = await fetch(`/api/admin/payment-methods?id=${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, isActive }),
        })
        json = (await res.json()) as ApiResponse<PaymentMethod>
        if (json.success) {
          toast.success('Cập nhật thành công')
          setEditId(null)
        } else {
          throw new Error(json.message || 'Cập nhật thất bại')
        }
      } else {
        // CREATE
        res = await fetch('/api/admin/payment-methods', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, isActive }),
        })
        json = (await res.json()) as ApiResponse<PaymentMethod>
        if (json.success) {
          toast.success('Tạo mới thành công')
        } else {
          throw new Error(json.message || 'Tạo mới thất bại')
        }
      }

      // Reset form và load lại list
      setName('')
      setDescription('')
      setIsActive(true)
      fetchMethods()
    } catch (error: unknown) {
      console.error('Submit payment method error:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Lỗi không xác định khi lưu phương thức')
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xoá?')) return
    try {
      const res = await fetch(`/api/admin/payment-methods?id=${id}`, {
        method: 'DELETE',
      })
      const json = (await res.json()) as ApiResponse<null>
      if (json.success) {
        toast.success('Xoá thành công')
        fetchMethods()
      } else {
        throw new Error(json.message || 'Xoá thất bại')
      }
    } catch (error: unknown) {
      console.error('Delete payment method error:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Lỗi không xác định khi xoá phương thức')
      }
    }
  }

  const handleEdit = (pm: PaymentMethod) => {
    setEditId(pm.id)
    setName(pm.name)
    setDescription(pm.description || '')
    setIsActive(pm.isActive)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý Phương thức Thanh toán</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form thêm / sửa */}
        <div className="col-span-1 border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? 'Chỉnh sửa phương thức' : 'Thêm mới phương thức'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Tên phương thức</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700">Mô tả</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-gray-700">Hoạt động</label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={e => setIsActive(e.target.checked)}
                className="h-4 w-4"
              />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editId ? 'Cập nhật' : 'Thêm mới'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null)
                    setName('')
                    setDescription('')
                    setIsActive(true)
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Huỷ
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Danh sách phương thức */}
        <div className="col-span-2">
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Tên</th>
                  <th className="border px-4 py-2">Mô tả</th>
                  <th className="border px-4 py-2">Hoạt động</th>
                  <th className="border px-4 py-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {methods.map(pm => (
                  <tr key={pm.id}>
                    <td className="border px-4 py-2">{pm.name}</td>
                    <td className="border px-4 py-2">{pm.description}</td>
                    <td className="border px-4 py-2">
                      {pm.isActive ? 'Có' : 'Không'}
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(pm)}
                        className="text-blue-600 hover:underline"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(pm.id)}
                        className="text-red-600 hover:underline"
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
                {methods.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="border px-4 py-2 text-center text-gray-500"
                    >
                      Chưa có phương thức nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
