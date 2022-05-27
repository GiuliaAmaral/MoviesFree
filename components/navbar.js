import Link from 'next/link'
import { useState } from 'react';



export default function Navbar(props) {

    const [forLinksCarregando, setForLinksCarregando] = useState([...Array(10).keys()]);


    return (<>
        {
            (props.carregando) ? (<>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">

                        <Link href="/">
                            <a className="navbar-brand text-light fs-2">
                                <img src={`/tv.svg`} width="35" className="d-inline-block align-text-top" />
                                FreeMovies
                            </a>
                        </Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                {
                                    forLinksCarregando?.map((item, index) => (
                                        <li className="nav-item placeholder-wave me-3" key={`linkC${index}`}>
                                            <a className="nav-link placeholder bg-light" style={{width: "100px"}}></a>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>
                </nav>
            </>) : (<>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">

                        <Link href="/">
                            <a className="navbar-brand text-light fs-2">
                                <img src={`/tv.svg`} width="35" className="d-inline-block align-text-top" />
                                FreeMovies
                            </a>
                        </Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                {
                                    props?.playlists.map((playlist, index) => (
                                        <li className="nav-item" key={`linkC${index}`}>
                                            <Link href={`/categoria/${playlist?.id}`}>
                                                <a className="nav-link">{playlist?.titulo}</a>
                                            </Link>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>
                </nav>
            </>)
        }
    </>
    )
}