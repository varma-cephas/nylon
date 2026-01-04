import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import type { FilesType } from '@/types/Files'

interface PropTypes {
  setFiles: Dispatch<SetStateAction<Array<FilesType> | null>>
}
export default function PickFile({ setFiles }: PropTypes) {
  const handleFileSelect = (event: ChangeEvent<EventTarget>) => {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files) {
        const selectedFiles = Array.from(event.target.files).map(file => ({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileRawInfo: file,
          presignedUrl: '',
        }))
        setFiles(prevDroppedFiles => {
          if (!prevDroppedFiles) return selectedFiles
          const uniqueNewFiles = selectedFiles.filter(
            newFile =>
              !prevDroppedFiles.some(
                prevFile =>
                  prevFile.fileName === newFile.fileName &&
                  prevFile.fileSize === newFile.fileSize
              )
          )
          return [...prevDroppedFiles, ...uniqueNewFiles]
        })
      } else {
        setFiles(null)
        return
      }
    }
  }
  return (
    <>
      <input
        type="file"
        id="browseFile"
        name="browseFile"
        onChange={handleFileSelect}
        className="hidden"
      />
      <label className="underline pl-1 cursor-pointer" htmlFor="browseFile">
        Browse.
      </label>
    </>
  )
}
