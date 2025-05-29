import fs from 'fs'
import { google } from 'googleapis'
import path from 'path'

// Load credentials từ file JSON
const KEYFILEPATH = path.join(process.cwd(), 'google_drive.json') // đường dẫn tới file JSON của service account
const SCOPES = ['https://www.googleapis.com/auth/drive']

// Khởi tạo Google auth client
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
})

const driveService = google.drive({ version: 'v3', auth })

/**
 * Upload file lên Google Drive
 */
export async function uploadToGoogleDrive(file: File, filename: string): Promise<string> {
  const buffer = await file.arrayBuffer()
  const stream = Buffer.from(buffer)

  const fileMetadata = {
    name: filename,
    parents: ['1IcOFjC-KzZKlz2yVh8P7ZjCxp4pYveIw'], // ID của folder đã chia sẻ cho service account
  }

  const media = {
    mimeType: file.type,
    body: BufferToStream(stream),
  }

  const res = await driveService.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id',
  })

  const fileId = res.data.id
  await driveService.permissions.create({
    fileId: fileId!,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  })

  return fileId!
}

/**
 * Lấy public URL từ fileId
 */
export function getPublicUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

/**
 * Xoá file khỏi Google Drive
 */
export async function deleteFromGoogleDrive(fileId: string): Promise<void> {
  await driveService.files.delete({ fileId })
}

/**
 * Chuyển Buffer sang Readable stream
 */
function BufferToStream(binary: Buffer): NodeJS.ReadableStream {
  const stream = new (require('stream').Readable)()
  stream.push(binary)
  stream.push(null)
  return stream
}
