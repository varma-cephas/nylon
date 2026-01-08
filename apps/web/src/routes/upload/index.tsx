import { createFileRoute } from '@tanstack/react-router'
import Button from '@/components/ui/Button'
import DragDrop from '@/components/ui/DragDrop'
import { useFileMetaDataUpload } from '@/hooks/useFileMetaDataUpload'
import { useFilesUpload } from '@/hooks/useFileUpload'
import type { FilesType } from '@/types/Files'
import PickFile from '@/components/ui/PickFile'
import UploadedFilesList from '@/components/ui/UploadFilesList'
import { useFile } from '@/hooks/useFile'


export const Route = createFileRoute('/upload/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync, isPending, isError } = useFileMetaDataUpload()
  const { mutateAsync: uploadFiles, uploads } = useFilesUpload()
  const { handleRemoveFile, handleFileDrop, hanldeDragOver, handleDragEnter, handleDragLeave, handleFileSelect, files, setFiles, isDragging} = useFile()

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
    <>
      <div className="flex items-center justify-between border-b pb-4 sticky top-0">
        <h2 className="text-xl font-semibold">nylon</h2>
      </div>
      <DragDrop handleFileDrop={handleFileDrop} hanldeDragOver={hanldeDragOver} handleDragEnter={handleDragEnter} handleDragLeave={handleDragLeave}>
      <div
        className={`border-2 border-dashed min-w-[70%] pt-18 mx-auto rounded-xl p-8 flex flex-col items-center ${isDragging ? 'border-sky-400' : 'border-gray-400'}`}
      >
        <PickFile handleFileSelect={handleFileSelect}  />
      </div>
      <div className="space-y-2 mx-auto w-[fit-content] border">
        <UploadedFilesList files={files} setFiles={setFiles} handleRemoveFile={handleRemoveFile} uploads={uploads} />
        <div className="space-x-2 flex gap-2 ">
          <Button name='Cancel' className={`border text-black ${files?.length? "block" : "hidden"} border-gray-500 font-bold rounded-md`} />
          <Button
            name="Upload files"
            className={`rounded-md bg-black text-white ${files?.length? "block" : "hidden"} font-bold `}
            disabled={!files?.length || isPending}
            handleClick={handleUploadFiles}
            />
        </div>
      </div>
      {isError && <p className="text-red-500 text-center">Upload failed</p>}
      </DragDrop>
    </>
  )
}
