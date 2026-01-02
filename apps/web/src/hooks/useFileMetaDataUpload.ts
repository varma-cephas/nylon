import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReceiveFileMetadataDto } from '@repo/api'
import { api } from '@/api/axios'

export function useFileMetaDataUpload() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (files: Array<File>) => {
      if (!files.length) throw new Error('No files were provided.')
      const filesMetaData: ReceiveFileMetadataDto = {
        files: files.map(file => ({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        })),
      }
      const { data } = await api.post('/file-upload/metadata', filesMetaData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}
