import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import plimit from 'p-limit'
import type { FilesType } from '@/types/Files'
import { useContext, useRef } from 'react'
import { Files } from '@/context/Files'

export function useFilesUpload() {
  const {setUploads, uploads, confirmUpload} = useContext(Files)
  const { mutation:confirmFilesMutation } = confirmUpload()
  const limit = plimit(3)
  const batchSize = 10
  const successUploads = useRef<string []>([])
  const mutation = useMutation({
    mutationFn: async (files:  Array<FilesType>) => {
      const uploadTasks = files.map((fileData) => {
        return limit(async () => {

          setUploads((prev) => ({
            ...prev,
            [fileData.fileId]: { progress: 0, status: 'uploading' },
          }));

          try {
            await axios.put('/local', fileData.fileRawInfo, {
              headers: { 
                'Content-Type': fileData.fileType,
              },
              onUploadProgress: (progressEvent) => {
                  const total = progressEvent.total || fileData.fileSize;
                  if (total) {
                  const percent = Math.round((progressEvent.loaded * 100) / total);

                  setUploads((prev) => {
                    if (prev[fileData.fileId]?.progress === percent && prev[fileData.fileId]?.status === 'uploading') return prev;
                    return {
                      ...prev,
                      [fileData.fileId]: { 
                          ...prev[fileData.fileId], 
                          progress: percent, 
                          status: 'uploading' 
                      },
                    };
                  });

                }
              },
            });
            setUploads((prev) => ({
              ...prev,
              [fileData.fileId]: { progress: 100, status: 'success' },
            }));

            successUploads.current.push(fileData.fileId)
            if(successUploads.current.length >= batchSize){
              const confirmFiles = [...successUploads.current]
              successUploads.current = []
              confirmFilesMutation(confirmFiles)
            }
            
            return { status: 'success', fileId: fileData.fileId };
          } catch (err) {
            setUploads((prev) => ({
              ...prev,
              [fileData.fileId]: { ...prev[fileData.fileId], status: 'error' },
            }));
            throw err; 
          }
        });
      });
      return Promise.all(uploadTasks);
    },
  });

  return { ...mutation, uploads };
}

