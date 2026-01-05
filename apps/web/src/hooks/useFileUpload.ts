import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { FilesType } from '@/types/Files'

export function useFilesUpload() {
  return useMutation({
    mutationFn: async (files: Array<FilesType>) => {
      for (const file of files) {
        try {
          await axios.put(file.presignedUrl, file.fileRawInfo, {
            headers: { 'Content-Type': file.fileType, Accept: '*/*' },
          })
        } catch (err: unknown) {
          if (err) throw new Error('There was an error uploading file', err)
        }
      }

      return new Promise(res => res('a'))
    },
  })
}
