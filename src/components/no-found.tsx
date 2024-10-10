import NoFoundImg from "../assets/movies/no-found.svg"

export function NoFound (){
    return(
        <div className="conteiner-no-found">
            <img src={NoFoundImg} alt="" />
            <h3>Oops, No se encontro la pelicula!</h3>
        </div>
    )
}
