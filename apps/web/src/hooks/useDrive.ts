import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";

export function useDrive(){
    return useQuery({
        queryKey: ['files'],
        queryFn: async () => {
            const { data } = await api.get('/files')
            return data
        } 
    })
}