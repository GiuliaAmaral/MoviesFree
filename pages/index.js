import Card from '../components/card'
import { useEffect } from 'react'
import YoutubeDataAPI from '../services/YoutubedataAPI'
import Navbar from '../components/navbar'
import Msg from '../components/msg';



// Função executada quando no servidor sempre que tem uma nova requisição
export async function getServerSideProps(context) {
  try {
    let resposta = await YoutubeDataAPI.ListarPlayList();

    return {
      props: {
        playlists: resposta
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





export default function Home(props) {

  useEffect(() => {
    (async () => {
      // console.log(props.playlists);
    })()
  }, [])


  return (<>
    {
      (props.erro) ? (
        <Msg icone={"fa-times"} titulo={`Erro`} btnTentarNovamente={true}>
          <p>{props.erro}</p>
        </Msg>
      ) : (<>

        <Navbar playlists={props?.playlists} />

        <Card />

      </>)
    }
  </>)
}
