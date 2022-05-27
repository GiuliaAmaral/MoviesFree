import Link from 'next/link'

export default function Card(props) {
    return (
        <>
            <div className="col-md-3 pe-3 ps-3">
                <div className="card mt-5 text-center w-100">
                    {
                        (props.carregando) ? (<>

                            <img src={`/placeholder.gif`} className="card-img-top w-100" height={"166px"} alt="..." />
                            <div className="card-body">
                                <h5 className="card-title placeholder-glow">
                                    <span className="placeholder col-6"></span>
                                </h5>
                                <p className="card-text placeholder-glow">
                                    <span className="placeholder col-7"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-4"></span>
                                    <span className="placeholder col-6"></span>
                                    <span className="placeholder col-8"></span>
                                </p>
                                <a href="#" tabindex="-1" className="btn btn-primary disabled placeholder col-6"></a>
                            </div>

                        </>) : (<>
                            <Link href={`/filme/${props?.opcoes?.id}`}>
                                <a className='limitar-titulo'>
                                    <img src={props?.opcoes?.thumbnail} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title limitar-titulo">{props?.opcoes?.titulo}</h5>
                                        <a className="btn btn-primary">Ver mais</a>
                                    </div>
                                </a>
                            </Link>


                        </>)
                    }
                </div>
            </div>
        </>
    )
}