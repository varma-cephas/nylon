import { useState } from 'react'
import PickFile from './PickFile'
import UploadedFilesList from './UploadedFilesList'
import Button from './Button'
import type { DragEvent } from 'react'
import { useFileMetaDataUpload } from '@/hooks/useFileMetaDataUpload'

export default function DragDrop() {
  const [files, setFiles] = useState<Array<File> | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const { mutate, isPending, isError } = useFileMetaDataUpload()
  const handleFileDrop = (event: DragEvent) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files)
    // console.info(droppedFiles)
    if (droppedFiles.length) {
      mutate(droppedFiles)
      setIsDragging(false)
      setFiles(prevDroppedFiles => {
        if (!prevDroppedFiles) return droppedFiles
        const uniqueNewFiles = droppedFiles.filter(
          newFile =>
            !prevDroppedFiles.some(
              prevFile =>
                prevFile.name === newFile.name && prevFile.size === newFile.size
            )
        )
        return [...prevDroppedFiles, ...uniqueNewFiles]
      })
    }
  }

  const hanldeDragOver = (event: DragEvent) => {
    event.preventDefault()
  }
  const handleDragEnter = () => setIsDragging(true)
  const handleDragLeave = () => setIsDragging(false)

  function handleUploadFiles() {
    if (files) {
      mutate(files)
    }
  }
  return (
    <div
      className="flex flex-col  mx-auto p-6 space-y-6 h-screen"
      onDrop={handleFileDrop}
      onDragOver={hanldeDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className="flex items-center justify-between border-b pb-4 sticky top-0">
        <h2 className="text-xl font-semibold">nylon</h2>
        <div className="space-x-2">
          <Button
            name="Upload files"
            className="rounded-md bg-black font-bold"
            disabled={!files?.length || isPending}
            handleClick={handleUploadFiles}
          />
        </div>
      </div>
      <div
        className={`border-2 border-dashed w-[80%] pt-18 mx-auto rounded-xl p-8 text-center ${isDragging ? 'border-sky-400' : 'border-gray-400'}`}
      >
        <p className="text-gray-600">
          Drag files here or <PickFile setFiles={setFiles} />
        </p>
      </div>
      <div className="space-y-2 mx-auto">
        <UploadedFilesList files={files} setFiles={setFiles} />
      </div>
      {isError && <p className="text-red-500 text-center">Upload failed</p>}
    </div>
  )
}
