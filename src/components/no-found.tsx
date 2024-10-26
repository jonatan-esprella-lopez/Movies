import NoFoundImg from "../assets/movies/no-found.svg"

export function NoFound (): JSX.Element {
    return(
        <section className="conteiner-no-found">
            <img src={NoFoundImg} alt="" />
            <h3>Oops, No se encontro la pelicula!</h3>
        </section>
    )
}
