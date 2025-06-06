import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        
        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create upload directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'ebooks')
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        // Generate unique filename
        const filename = `${Math.random().toString(36).slice(2, 10)}_${Date.now()}.${file.name.split('.').pop()}`
        const filePath = join(uploadDir, filename)
        const publicPath = `/ebooks/${filename}`

        // Save file
        await writeFile(filePath, buffer)

        return NextResponse.json({ filePath: publicPath })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json(
            { error: 'Error uploading file' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { filePath } = await request.json()
        
        if (!filePath) {
            return NextResponse.json(
                { error: 'No file path provided' },
                { status: 400 }
            )
        }

        // Convert public path to filesystem path
        const fullPath = join(process.cwd(), 'public', filePath)

        // Delete file
        await unlink(fullPath)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting file:', error)
        return NextResponse.json(
            { error: 'Error deleting file' },
            { status: 500 }
        )
    }
} 