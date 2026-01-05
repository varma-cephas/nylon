import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import plimit from 'p-limit'
import type { FilesType } from '@/types/Files'
import { useState } from 'react'

export function useFilesUpload() {
  const [uploads, setUploads] = useState<{[key: string]: { progress: number, status: string }}>({})
  const limit = plimit(3)
  const mutation = useMutation({
    mutationFn: async (files:  Array<FilesType>) => {
      const uploadTasks = files.map((fileData) => {
        return limit(async () => {

          setUploads((prev) => ({
            ...prev,
            [fileData.fileId]: { progress: 0, status: 'uploading' },
          }));

          try {
            await axios.put(fileData.presignedUrl, fileData.fileRawInfo, {
              headers: { 
                'Content-Type': fileData.fileType,
              },
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  
                  setUploads((prev) => ({
                    ...prev,
                    [fileData.fileId]: { ...prev[fileData.fileId], progress: percent },
                  }));
                }
              },
            });
            setUploads((prev) => ({
              ...prev,
              [fileData.fileId]: { progress: 100, status: 'success' },
            }));

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
