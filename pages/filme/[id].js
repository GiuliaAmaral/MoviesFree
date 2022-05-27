import { useEffect, useState } from 'react'
import YoutubeDataAPI from '../../services/YoutubedataAPI';
import Navbar from '../../components/navbar';
import Card from '../../components/card';
import Msg from '../../components/msg';





// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {
    try {
        let resPlaylist = await YoutubeDataAPI.ListarPlayList();
        let resVideo = await YoutubeDataAPI.pegarVideo(context.query.id);

        return {
            props: {
                playlists: resPlaylist,
                video: resVideo
            }
        }

    } catch (error) {

        return {
            props: {
                erro: String(error)
            }
        }

    }
}





export default function Filme(props) {

    useEffect(() => {
        (async () => {
            console.log(props.loading);
            console.log(props.video);
        })()
    }, [])


    return (<>
        {
            (props.loading) ? (<>
                <Navbar carregando={props?.loading} />
                <div className="container mt-5">
                    <div className="row">
                        <div className='col-md-6'>
                            <div className="ratio ratio-16x9">
                                <img src={`/placeholder.gif`} className="card-img-top w-100" height={"300px"} alt="..." />
                            </div>
                        </div>

                        <div className='col-md-6 placeholder-wave'>
                            <h1 className='placeholder col-7'></h1>
                            <p className='placeholder col-7'></p>
                        </div>
                    </div>
                </div>
            </>) : (<>
                {
                    (props.erro) ? (
                        <Msg icone={"fa-times"} titulo={`Erro`} btnTentarNovamente={true}>
                            <p>{props.erro}</p>
                        </Msg>
                    ) : (<>

                        <Navbar playlists={props?.playlists} />

                        <div className="container mt-5">
                            <div className="row">
                                <div className='col-md-6'>
                                    <div className="ratio ratio-16x9">
                                        <iframe src={`https://www.youtube.com/embed/${props?.video?.id}`} title="  YouTube video" allowFullScreen></iframe>
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <h1>Descrição</h1>
                                    {
                                        (String(props?.video?.descricao).split("\n")).map((item, index) => (<>
                                                <p key={`linkC${index}`}>{item}</p>
                                        </>))
                                    }
                                </div>
                            </div>
                        </div>



                    </>)
                }
            </>)
        }
    </>)
}
