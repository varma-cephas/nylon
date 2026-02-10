import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "@/api/axios";

export default function useDeleteFile(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (fileId: string)=>{
            try{
                await api.delete(`/files/${fileId}`)
            }catch(error){
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: ['files']})
        }
    })
}