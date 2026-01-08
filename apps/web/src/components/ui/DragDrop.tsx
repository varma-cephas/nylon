import PickFile from './PickFile'
import UploadedFilesList from './UploadFilesList'
import Button from './Button'
import type { FilesType } from '@/types/Files'
import { useFileMetaDataUpload } from '@/hooks/useFileMetaDataUpload'
import { useFilesUpload } from '@/hooks/useFileUpload'
import { useFile } from '@/hooks/useFile'

export default function DragDrop() {
  const { mutateAsync, isPending, isError } = useFileMetaDataUpload()
  const { mutateAsync: uploadFiles, uploads } = useFilesUpload()
  const {handleFileDrop, handleDragEnter, handleRemoveFile, hanldeDragOver, handleFileSelect, handleDragLeave, files, setFiles, isDragging} = useFile()
  
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
  }

  return (
    <div
      className="flex flex-col  mx-auto p-6 space-y-6 h-screen"
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={hanldeDragOver}
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
        className={`border-2 border-dashed min-w-[70%] pt-18 mx-auto rounded-xl p-8 flex flex-col items-center ${isDragging ? 'border-sky-400' : 'border-gray-400'}`}
      >
      <PickFile handleFileSelect={handleFileSelect}  />
      </div>
      <div className="space-y-2 mx-auto">
        <UploadedFilesList files={files} setFiles={setFiles} handleRemoveFile={handleRemoveFile} uploads={uploads} />
      </div>
      {isError && <p className="text-red-500 text-center">Upload failed</p>}
    </div>
  )
}
