import { createFileRoute } from '@tanstack/react-router'
import { useDrive } from '@/hooks/useDrive'
import type { FileMetaDataDBInsert } from '@repo/api'

export const Route = createFileRoute('/drive/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: files } = useDrive()

  return(
    <>
      {
        files?.length?
          <ul>
            {files.map((file:FileMetaDataDBInsert, index: number) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium max-w-50 text-balance">{file.fileName}</p>
                  <p className="text-xs text-gray-400">{(file.fileSize / 1024).toFixed(1)} KB</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded">Delete</button>
                </div>
              </div>
            ))}
          </ul>
          :
        <p>No file found</p>
      }
    </>
  )
}
