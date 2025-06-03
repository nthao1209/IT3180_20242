// app/api/upload-image/route.js (SỬA ĐỔI ĐỂ TRUYỀN FILE - CÓ THỂ PHỨC TẠP HƠN)
import { uploadToGoogleDrive } from '@/lib/googleDrive';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const filename = formData.get('filename');

    if (!file || !filename) {
      return NextResponse.json({ error: 'Không có tệp hoặc tên tệp' }, { status: 400 });
    }


    // Truyền trực tiếp đối tượng File (hàm uploadToGoogleDrive cần được điều chỉnh để xử lý)
    const fileId = await uploadToGoogleDrive(file, filename);

    return NextResponse.json({ fileId });
  } catch (error) {
    console.error('Lỗi tải lên Google Drive:', error);
    return NextResponse.json({ error: 'Lỗi tải lên Google Drive' }, { status: 500 });
  }
}