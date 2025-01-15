import { Home } from "../pages/home/home";
import { NotFoundPage } from "../pages/no-found/no-found-page";
import { MovieView } from "../pages/movie/movie-page";
import { createBrowserRouter } from "react-router-dom";
import { AllMovies } from "../pages/home/pages/page-all-movies";
import { LessValued } from "../pages/home/pages/page-less-valued";
import { MostValued } from "../pages/home/pages/page-most-valued";
import { SearchMovie } from "../pages/home/pages";
import { Pelicula } from "../pages/peliculas"
import { Cartelera } from "../pages/cartelera/cartelera";
 
const router = createBrowserRouter([
{
    path: "/",
    element: <Home />,
    children: [
        {
            path: "",
            element: <AllMovies />,
        },
        {
            path: "most-valued",
            element: <MostValued/>,
        },
        {
            path: "less-valued",
            element: <LessValued />,
        },
        {
            path: "search-movie",
            element: <SearchMovie />,
        },
      ],
      
},
{
    path: "/movie/:id",
    element: <MovieView />,
},
{
    path: "/pelicula",
    element: <Pelicula />,
},
{
    path: "/cartelera",
    element: <Cartelera />,
},
{
    path: "/cartelera/:id",
    element: <Cartelera/>,
},
{
    path: "*",
    element: <NotFoundPage />,
},
]);


export default router;