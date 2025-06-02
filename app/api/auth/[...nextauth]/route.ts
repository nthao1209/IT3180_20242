// app/api/auth/[...nextauth]/route.ts

// 1. XÓA TOÀN BỘ NỘI DUNG HIỆN TẠI CỦA FILE NÀY.

// 2. THAY THẾ BẰNG CODE SAU:

import { handlers } from "@/auth"; // Đảm bảo đường dẫn này trỏ đúng đến file auth.ts của bạn
                                 // Nếu auth.ts ở thư mục gốc, đường dẫn có thể là "../../../../auth"
                                 // (đi lên 4 cấp từ app/api/auth/[...nextauth]/)
                                 // Hoặc nếu bạn đã cấu hình path alias "@/" trỏ đến thư mục gốc,
                                 // thì "@/auth" có thể đúng nếu file auth.ts của bạn là your-project-root/auth.ts

export const { GET, POST } = handlers;