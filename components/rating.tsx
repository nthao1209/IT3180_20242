'use client' // chỉ chạy ở client

import { StarIcon } from 'lucide-react' // đánh giá hiển hiner thị bằng sao
import React from 'react'

function Rating({
    rating, ratingClick // thuộc tính đánh giá và hàm xử lý khi click vào sao
}: {
    rating: number, ratingClick?: (index: number) => void // hàm callback tùy chọn
}) {

  return (
    <div className='flex'>
        {
            // spread operator ... để tạo ra một mảng có 5 phần tử undefined
            // sau đó dùng map để lặp qua từng phần tử
            // và tạo ra một sao cho mỗi phần tử
            // nếu index < rating thì sao đó sẽ có màu cam
            // ngược lại sẽ có màu trắng
            // dùng fill để thay đổi màu sắc của sao
            // dùng key để phân biệt các phần tử trong mảng
            // dùng onClick để gọi hàm ratingClick khi click vào sao
            [...Array(5)].map((_, index) => (
                <StarIcon 
                    size={16}
                    key={index}
                    onClick={() => ratingClick?.(index + 1)}
                    className='cursor-pointer text-orange-300'
                    fill={`${index < rating ? 'orange' : '#fff'}`}
                />
            ))
        }
    </div>
  )
}

export default Rating