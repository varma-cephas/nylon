import { createFileRoute } from '@tanstack/react-router'
import { useDrive } from '@/hooks/useDrive'
import type { FileMetaDataDBInsert } from '@repo/api'
import useDeleteFile from '@/hooks/useDeleteFile'
import DragDropPage from '@/page/DragDrop'
import {
  FileText,
  Download,
  Trash2,
  HardDrive,
} from 'lucide-react'

export const Route = createFileRoute('/drive/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: files } = useDrive()
  const { mutate: deleteFile } = useDeleteFile()

  return (
    <>
      {files?.length ? (
        <div className="flex flex-col w-full max-w-6xl mx-auto mt-8 px-4 md:px-10">
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-400 border-b uppercase tracking-wider">
            <div className="col-span-6 flex items-center gap-2">
              <HardDrive size={16} /> Name
            </div>
            <div className="col-span-2 text-right">
              Size
            </div>
            <div className="col-span-2 text-right">
              Uploaded
            </div>
            <div className="col-span-2 text-right">
              Actions
            </div>
          </div>

          <ul className="flex flex-col">
            {files.map(
              (
                file: FileMetaDataDBInsert,
                index: number,
              ) => (
                <li
                  key={file.fileId || index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center p-4 md:px-4 md:py-3 border-b hover:bg-slate-50 transition-colors group"
                >
                  {/* File Name & Icon */}
                  <div className="col-span-1 md:col-span-6 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <FileText
                        size={20}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="font-medium text-slate-700 truncate">
                        {file.fileName}
                      </p>
                      <span className="md:hidden text-xs text-slate-400">
                        {(
                          file.fileSize / 1024
                        ).toFixed(1)}{' '}
                        KB • Jan 16, 2026
                      </span>
                    </div>
                  </div>

                  {/* Size Column (Desktop) */}
                  <div className="hidden md:block md:col-span-2 text-sm text-slate-500 text-right tabular-nums">
                    {(
                      file.fileSize / 1024
                    ).toFixed(1)}{' '}
                    KB
                  </div>

                  {/* Date Column (Desktop) */}
                  <div className="hidden md:block md:col-span-2 text-sm text-slate-500 text-right">
                    Jan 16, 26
                  </div>

                  {/* Actions Column */}
                  <div className="md:col-span-2 flex justify-end items-center gap-1">
                    <button
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all md:opacity-0 group-hover:opacity-100"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>

                    <button
                      onClick={() =>
                        deleteFile(file.fileId)
                      }
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all md:opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      ) : (
        <DragDropPage />
      )}
    </>
  )
}
