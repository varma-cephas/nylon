import { X } from 'lucide-react'
import type { FileListType } from '@/types/Files'


export default function UploadedFilesList({ files, setFiles, uploads }: FileListType) {
  function handleRemoveFile(fileIndex: number) {
    setFiles(prevFiles => {
      if (!prevFiles) return []
      const updatedFiles = prevFiles.filter((_, ind) => ind !== fileIndex)
      return updatedFiles
    })
  }
  return (
    <div>
      {files !== null && files.length ? (
        <ul>
          {files.map((file, index: number) => (
            <li
              key={file.fileId}
              className={`border ${uploads[file.fileId]?.status === 'success' ? 'border-green-400' : 'border'} flex justify-between w-80 p-2 rounded-md mb-2`}
            >
              <div>
                <span className="block">{file.fileName}</span>
                <span className="block">
                  {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                </span>
                <span className='block'>Progress: {uploads[file.fileId]?.progress || 0}%</span>
              </div>
              <X
                className="cursor-pointer"
                onClick={() => handleRemoveFile(index)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No files yet</p>
      )}
    </div>
  )
}
