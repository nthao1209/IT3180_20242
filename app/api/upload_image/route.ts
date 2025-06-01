import { uploadToGoogleDrive } from '@/lib/googleDrive';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const filename = formData.get('filename') as string;

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