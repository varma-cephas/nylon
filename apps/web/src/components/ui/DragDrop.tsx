import { useState } from 'react'
import PickFile from './PickFile'
import UploadedFilesList from './UploadedFilesList'
import Button from './Button'
import type { DragEvent } from 'react'
import type { FilesType } from '@/types/Files'
import { useFileMetaDataUpload } from '@/hooks/useFileMetaDataUpload'
import { useFilesUpload } from '@/hooks/useFileUpload'

export default function DragDrop() {
  const [files, setFiles] = useState<Array<FilesType> | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const { mutateAsync, isPending, isError } = useFileMetaDataUpload()
  const { mutateAsync: uploadFiles } = useFilesUpload()

  const handleFileDrop = (event: DragEvent) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files).map(file => ({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileRawInfo: file,
      presignedUrl: '',
    }))
    // console.info(droppedFiles)
    if (droppedFiles.length) {
      setIsDragging(false)
      if (!files?.length) {
        return setFiles(droppedFiles)
      }
      const uniqueNewFiles = droppedFiles.filter(
        newFile =>
          !files.some(
            prevFile =>
              prevFile.fileName === newFile.fileName &&
              prevFile.fileSize === newFile.fileSize
          )
      )
      const updatedFiles = [...files, ...uniqueNewFiles]

      setFiles(updatedFiles)
    }
  }

  const hanldeDragOver = (event: DragEvent) => {
    event.preventDefault()
  }

  // useEffect(() => {
  //   console.info(files)
  // }, [files])
  const handleDragEnter = () => setIsDragging(true)
  const handleDragLeave = () => setIsDragging(false)

  async function handleUploadFiles() {
    const filesReadyForUpload: Array<FilesType> = []
    if (files !== null && files.length >= 1) {
      await mutateAsync(files, {
        onSuccess: data => {
          const filesWithPresignUrl: Array<FilesType> = files.map(file => {
            const presignedUrl =
              data.files.find(
                signedFile => file.fileName === signedFile.fileName
              )?.presignedUrl || ''
            return {
              ...file,
              presignedUrl,
            }
          })
          setFiles(filesWithPresignUrl)
          filesReadyForUpload.push(...filesWithPresignUrl)
        },
      })
      await uploadFiles(filesReadyForUpload)
      return
    }
    // console.info('please upload a file')
    return 'No files uploaded yet'
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
