import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "../services/movie-service";


export function useFetchMovie (){
    return useQuery({
        queryKey: ['movie'], 
        queryFn: getAllMovies,
    });
}