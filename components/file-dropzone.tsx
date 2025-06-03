import { Loader, FileUp, X } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'

type FileUploadInterface = {
    file: File | null
    filePath: string
    filename: string
    state: 'pending' | 'complete' | 'error'
}

interface FileInputProps {
    onFileAdded?: (filePath: string) => Promise<void>
    onFileDelete?: (filePath: string) => void
    initialFile?: string | null
}

function FileDropzone({
    onFileAdded,
    onFileDelete,
    initialFile
}: FileInputProps) {
    const [fileState, setFileState] = useState<FileUploadInterface | null>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (initialFile) {
            setFileState({
                file: null,
                filePath: initialFile,
                filename: initialFile.split('/').pop() || '',
                state: 'complete',
            });
        }
    }, [initialFile]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        const newFileState: FileUploadInterface = {
            file: file,
            filePath: '',
            filename: file.name,
            state: 'pending',
        };
        setFileState(newFileState);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            
            setFileState(prevState => ({
                ...prevState,
                filePath: data.filePath,
                state: 'complete',
            } as FileUploadInterface));

            await onFileAdded?.(data.filePath);

        } catch (err) {
            console.error("Error uploading file:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An error occurred during file upload.");
            }
            setFileState(prevState => ({ ...prevState, state: 'error' } as FileUploadInterface));
        } finally {
            setUploading(false);
        }
    }, [onFileAdded]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'application/epub+zip': ['.epub']
        },
        maxFiles: 1,
        onDrop,
    });

    const _handleDelete = async () => {
        if (fileState?.filePath) {
            setUploading(true);
            setError(null);
            try {
                const response = await fetch('/api/upload', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ filePath: fileState.filePath }),
                });

                if (!response.ok) {
                    throw new Error('Delete failed');
                }

                setFileState(null);
                onFileDelete?.(fileState.filePath);
            } catch (err) {
                console.error("Error deleting file:", err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An error occurred during file deletion.");
                }
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div className="border-2 border-dashed border-slate-200 rounded-md p-4 relative">
            {fileState?.state === 'complete' ? (
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <FileUp className="h-6 w-6 text-green-500" />
                        <p className="text-sm text-gray-700 truncate">{fileState.filename || 'File Uploaded'}</p>
                    </div>
                    <button
                        type="button"
                        onClick={_handleDelete}
                        className="rounded-full text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        disabled={uploading}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div {...getRootProps()} className="text-center cursor-pointer">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-gray-500 text-sm">Drop the file here ...</p>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-xs text-gray-400">
                            <FileUp className="mb-4 w-8 h-8" />
                            <div className="text-gray-400">drag &amp; drop a file</div>
                            <div className="mt-2">
                                <Button disabled={uploading} type="button" variant="ghost">Select File</Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {uploading && fileState?.state === 'pending' && (
                <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-md bg-black bg-opacity-65">
                    <Loader className="text-white" />
                </div>
            )}

            {error && <p className="text-red-500 font-bold mt-2">{error}</p>}
        </div>
    );
}

export default FileDropzone;