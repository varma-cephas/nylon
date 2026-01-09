import { X, File } from 'lucide-react'
import { CheckCircle } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import type { FileListType } from '@/types/Files'

export default function UploadedFilesList({ files, uploads, handleRemoveFile }: FileListType & {handleRemoveFile: (index: number)=> void}) {
  return (
    <div>
      {files && files.length ? (
        <>
        <div>Files: {files.length}</div>
        <div className='max-h-[350px] lg:px-16 py-2 mb-2  lg:border rounded-md overflow-y-auto divide-y divide-slate-100'>
        <ul>
          {files.map((file, index: number) => (
            <li
              key={index}
              className={`border border-gray-400 max-w-70 w-80 md:w-full md:max-w-full ${uploads[file.fileId]?.status === 'success' ? 'border-green-400' : 'border'} flex justify-between  p-1.5 rounded-md mb-2 duration-300 ease-in-out `}
            >
              <div className='flex gap-2 items-center'>
                <File className='border h-[80%] border-gray-400 rounded-sm p-0.5' />
              <div>
                <span className="block">{file.fileName}</span>
                <span className="block text-sm text-gray-500">
                  {(file.fileSize / (1024 * 1024)).toFixed(2)} MB . <span className='pl-0.3'>{uploads[file.fileId]?.progress === 100 ? 'Uploaded' : `${uploads[file.fileId]?.progress || 0}%`}</span>
                </span>
                
              </div>
              </div>
              <div className='flex gap-2'>
                <div className={`${uploads[file.fileId]?.progress > 0 ? 'block' : 'hidden'}`}>
                  {
                    uploads[file.fileId]?.progress === 100
                      ?
                      <CheckCircle size={20} className='text-sm rounded-full' />
                      :
                      <Loader2 size={20} className='animate-spin text-sm rounded-full' />
                  }
                </div>
                <X
                  size={20}
                  className="cursor-pointer text-gray-700"
                  onClick={() => handleRemoveFile(index)}
                />
              </div>
            </li>
          ))}
        </ul>
        </div>
        </>
      ) : (
        <p className='text-center'>No files yet</p>
      )}
    </div>
  )
}
