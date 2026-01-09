import { createFileRoute } from '@tanstack/react-router'
import Button from '@/components/ui/Button'
import DragDrop from '@/components/ui/DragDrop'
import { useFileMetaDataUpload } from '@/hooks/useFileMetaDataUpload'
import { useFilesUpload } from '@/hooks/useFileUpload'
import type { FilesType } from '@/types/Files'
import PickFile from '@/components/ui/PickFile'
import UploadedFilesList from '@/components/ui/UploadFilesList'
import { useFile } from '@/hooks/useFile'


export const Route = createFileRoute('/drive/upload/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync, isPending, isError } = useFileMetaDataUpload()
  const { mutateAsync: uploadFiles, uploads } = useFilesUpload()
  const { handleRemoveFile, handleFileDrop, hanldeDragOver, handleDragEnter, handleCancelUpload, handleDragLeave, handleFileSelect, files, setFiles, isDragging} = useFile()

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
      <header className="flex items-center justify-between border-b sticky top-0">
        {/* <h2 className="text-xl font-semibold">nylon</h2> */}
        {/* <nav>
          <ul className='flex gap-2'>
            <li>Upload</li>
            <li>Drive</li>
          </ul>
        </nav> */}
      </header>
      <DragDrop handleFileDrop={handleFileDrop} hanldeDragOver={hanldeDragOver} handleDragEnter={handleDragEnter} handleDragLeave={handleDragLeave}>
      <div
        className={`border-3 border-dashed min-w-[80%] pt-18 mx-auto rounded-xl p-8 flex flex-col items-center ${isDragging ? 'border-sky-400' : 'border-gray-400'}`}
      >
        <PickFile handleFileSelect={handleFileSelect}  />
      </div>
      <div className="mx-auto min-w-[70%]">
        <UploadedFilesList files={files} setFiles={setFiles} handleRemoveFile={handleRemoveFile} uploads={uploads} />
        <div className="space-x-2 flex gap-2 ">
          <Button name='Cancel All' handleClick={handleCancelUpload} className={`border text-black ${files?.length? "block" : "hidden"} border-gray-500 rounded-md`} />
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
