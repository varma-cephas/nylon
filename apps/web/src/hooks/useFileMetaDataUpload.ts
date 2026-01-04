import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  FileMetaDataWithPresignUrlDTO,
  ReceiveFileMetadataDto,
  ReceiveFileMetadataWithPresignUrlDto,
} from '@repo/api'
import { api } from '@/api/axios'

export function useFileMetaDataUpload() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (files: Array<FileMetaDataWithPresignUrlDTO>) => {
      if (!files.length) throw new Error('No files were provided.')
      const filesMetaData: ReceiveFileMetadataDto = {
        files: files.map(file => ({
          fileName: file.fileName,
          fileType: file.fileType,
          fileSize: file.fileSize,
        })),
      }
      const { data }: { data: ReceiveFileMetadataWithPresignUrlDto } =
        await api.post('/file-upload/metadata', filesMetaData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}
