import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number,
    title: string,
    userId: number,
    body: string
}
const usePost = ()=> useQuery<Post[], Error>({
        queryKey:['posts'],
        queryFn: ()=>
            axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((res)=> res.data)
        
        
        
    })


export default usePost