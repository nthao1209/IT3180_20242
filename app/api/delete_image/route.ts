import { deleteFromGoogleDrive } from '@/lib/googleDrive'; // Đường dẫn đến file google-drive.js
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { fileId } = await request.json();

    if (!fileId) {
      return NextResponse.json({ error: 'Thiếu fileId' }, { status: 400 });
    }

    // Gọi hàm deleteFromGoogleDrive từ google-drive.js
    await deleteFromGoogleDrive(fileId);
    return NextResponse.json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error('Lỗi xóa Google Drive:', error);
    return NextResponse.json({ error: 'Lỗi xóa Google Drive' }, { status: 500 });
  }
}