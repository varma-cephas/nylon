import { X } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import type { FilesType } from '@/types/Files'

interface FileList {
  files: Array<FilesType> | null
  setFiles: Dispatch<SetStateAction<Array<FilesType> | null>>
}
export default function UploadedFilesList({ files, setFiles }: FileList) {
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
              key={index}
              className="border flex justify-between w-80 p-2 rounded-md mb-2"
            >
              <div>
                <span className="block">{file.fileName}</span>
                <span className="block">
                  {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
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
