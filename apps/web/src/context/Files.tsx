import { createContext, useState, type ChangeEvent  } from 'react'
import type { DragEvent } from 'react'
import type { FilesContextType, FilesType } from '@/types/Files'
import type { Children } from '@/types/GeneralTypes'

export const Files = createContext<FilesContextType>(
  { handleRemoveFile: () => {}, 
    handleFileDrop: () => {}, 
    hanldeDragOver: () => {},
    handleDragEnter: () => {},
    handleCancelUpload: () => {},
    handleDragLeave: () => {}, 
    handleFileSelect: () => {},
    files: [], 
    setFiles: () => {}, 
    isDragging: false ,
  }
)

export default function FilesContext({ children }: Children) {
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
  return(
    <Files.Provider value={{files, handleFileDrop,hanldeDragOver, handleCancelUpload, isDragging, handleDragEnter, handleFileSelect, handleRemoveFile, handleDragLeave, setFiles}}>
      {children}
    </Files.Provider>
  )
}