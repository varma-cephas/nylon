import { useState, type ChangeEvent } from 'react'
import type { DragEvent } from 'react'
import type { FilesType } from '@/types/Files'

export function useFile(){
  const [files, setFiles] = useState<Array<FilesType> | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileDrop = (event: DragEvent) => {
    event.preventDefault()
    if(event.dataTransfer){
        const droppedFiles = Array.from(event.dataTransfer.files).map(file => ({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileRawInfo: file,
          presignedUrl: '',
          fileId: ''
        }))
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
  }

  // useEffect(()=>{console.info(files)}, [files])
  const handleFileSelect = (event: ChangeEvent<EventTarget>) => {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files) {
        const selectedFiles = Array.from(event.target.files).map(file => ({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileRawInfo: file,
          presignedUrl: '',
          fileId: '',
        }))
        setFiles(prevDroppedFiles => {
          if (!prevDroppedFiles?.length) return selectedFiles
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


  const handleDragEnter = () => setIsDragging(true)
  const handleDragLeave = () => setIsDragging(false)

  const hanldeDragOver = (event: DragEvent) => {
    event.preventDefault()
  }
  function handleRemoveFile(fileIndex: number) {
    setFiles(prevFiles => {
      if (!prevFiles) return []
      const updatedFiles = prevFiles.filter((_, ind) => ind !== fileIndex)
      return updatedFiles
    })
  }

  function handleCancelUpload(){
    setFiles(null)
  }
return { files, handleFileDrop,hanldeDragOver, handleCancelUpload, isDragging, handleDragEnter, handleFileSelect, handleRemoveFile, handleDragLeave, setFiles}
}