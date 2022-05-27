import { useEffect, useState } from 'react'
import YoutubeDataAPI from '../../services/YoutubedataAPI';
import Navbar from '../../components/navbar';
import Card from '../../components/card';
import Msg from '../../components/msg';





// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {
    try {
        let resPlaylist = await YoutubeDataAPI.ListarPlayList();
        let resVideos = await YoutubeDataAPI.ListarVideoPlaylist(context.query.id);

        return {
            props: {
                playlists: resPlaylist,
                videos: resVideos
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





export default function Categoria(props) {

    const [forCardsCarregando, setForCardsCarregando] = useState([...Array(8).keys()]);

    useEffect(() => {
        (async () => {
            console.log(props.loading);
        })()
    }, [])


    return (<>
        {
            (props.loading) ? (<>
                <Navbar carregando={props?.loading} />
                <div className="container">
                    <div className="row">
                        {
                            forCardsCarregando?.map((item, index) => (
                                <Card carregando={props?.loading} key={`linkC${index}`}/>
                            ))
                        }
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

                        {
                            (props.videos) ? (<>
                                <div className="container">
                                    <div className="row">
                                        {
                                            props.videos.map((item, index) => (
                                                <Card opcoes={item} key={`linkC${index}`} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </>) : (<>
                                <Msg icone={"fa-times"} titulo={`Oh! Não =(`} btnInicio={true}>
                                    <p>Nenhum filme encontrado!</p>
                                </Msg>
                            </>)
                        }

                    </>)
                }
            </>)
        }
    </>)
}
