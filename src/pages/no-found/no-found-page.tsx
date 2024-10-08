import NotFound from "../../assets/404.svg"

export function NotFoundPage(){ 
    return(
        <main className="container-main">
            <section className="conteiner-no-found">
                <img src={NotFound} alt="" className="image-notfound"/>
                <h2>Oops, No encontramos la pagina</h2>
                <button className=""> Regresar </button>
            </section>
        </main>
    )
}