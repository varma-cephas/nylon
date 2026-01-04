import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { FilesType } from '@/types/Files'

export function useFilesUpload() {
  return useMutation({
    mutationFn: async (files: Array<FilesType>) => {
      for (const file of files) {
        try {
          const res = await axios.put(file.presignedUrl, file.fileRawInfo, {
            headers: { 'Content-Type': file.fileType, Accept: '*/*' },
          })
          console.info(res.status)
        } catch (err) {
          throw new Error('There was an error uploading file')
        }
      }

      return new Promise(res => res('a'))
    },
  })
}
