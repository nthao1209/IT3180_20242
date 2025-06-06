"use client"
import { useEffect, useState } from "react"
import axios from "axios"

export default function AdminPurchasesPage() {
    const [payments, setPayments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPayments = async () => {
            const res = await axios.get("/api/pending-payment")
            console.log("Kết quả từ API /api/pending-payment:", res.data) // Thêm dòng này
            setPayments(res.data)
            
        }
        fetchPayments()
    }, [])

    const handleConfirmPayment = async (id: number) => {
        try {
            await axios.post(`/api/confirm-payment/${id}`)
            setPayments(payments.filter((payment) => payment.id !== id))
        } catch (error) {
            console.error('Confirm payment error:', error)
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Pending Purchases</h2>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="border p-2">User ID</th>
                        <th className="border p-2">Pay ID</th>
                        <th className="border p-2">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id}>
                            <td className="border p-2">{payment.user_id}</td>
                            <td className="border p-2">{payment.book_id}</td>
                            <td className="border p-2">
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleConfirmPayment(payment.id)}
                                >
                                    Xác nhận
                                </button>
                            </td>
                        </tr>
                    ))}
                    {payments.length === 0 && (
                        <tr>
                            <td colSpan={3} className="text-center p-4 text-gray-500">
                                Không có thanh toán nào đang chờ.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}