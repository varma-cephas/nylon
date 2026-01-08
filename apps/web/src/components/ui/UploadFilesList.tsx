import { X } from 'lucide-react'
import type { FileListType } from '@/types/Files'

export default function UploadedFilesList({ files, uploads, handleRemoveFile }: FileListType & {handleRemoveFile: (index: number)=> void}) {
  return (
    <div>
      {files && files.length ? (
        <ul>
          {files.map((file, index: number) => (
            <li
              key={index}
              className={`border max-w-60 md:max-w-79 ${uploads[file.fileId]?.status === 'success' ? 'border-green-400' : 'border'} flex justify-between w-80 p-2 rounded-md mb-2`}
            >
              <div>
                <span className="block">{file.fileName}</span>
                <span className="block">
                  {(file.fileSize / (1024 * 1024)).toFixed(2)} MB . <span>{uploads[file.fileId]?.progress || 0}%</span>
                </span>
                
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
