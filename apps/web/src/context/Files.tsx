import { createContext, useState, type ChangeEvent  } from 'react'
import { useMutation } from '@tanstack/react-query'
import type { DragEvent } from 'react'
import type { FilesContextType, FilesType } from '@/types/Files'
import type { Children } from '@/types/GeneralTypes'
import { api } from '@/api/axios'

export const Files = createContext<FilesContextType | undefined>(undefined)

export default function FilesContext({ children }: Children) {
  const [files, setFiles] = useState<Array<FilesType> | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploads, setUploads] = useState<{[key: string]: { progress: number, status: string }}>({})


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

  const confirmUpload =  useMutation({
      mutationFn: (id: string []) => api.post('/files/confirm-upload', {id}),
      onSuccess: (response) =>{
        const data: string [] = response.data
        setUploads( prev => {
          const newState = { ...prev }
          data.forEach( id => {
            if(newState[id]){
              newState[id].status = "saved"
            }
          })
          return newState
        })
      }
    })


  function handleCancelUpload(){
    setFiles(null)
  }
  return(
    <Files.Provider value={{files, handleFileDrop,hanldeDragOver, handleCancelUpload, isDragging, handleDragEnter, handleFileSelect, handleRemoveFile, handleDragLeave, setFiles, uploads, setUploads, confirmUpload}}>
      {children}
    </Files.Provider>
  )
}