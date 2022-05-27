import request from "../functions/request";
import titleize from "../functions/titleize";

export default class YoutubeDataAPI {

    static async ListarPlayList() {
        let params = {
            maxResults: 50,
            part: "snippet,contentDetails",
            channelId: process.env.ID_CANAL_YOUTUBE,
            key: process.env.CHAVE_API_YOUTUBE
        };
        let resYT = await request("GET", `${process.env.BASE_URL_API_YOUTUBE}/playlists`, params);


        let itemsRemove = [
            "as maiores cenas de filmes",
            "melhores",
            "hulk"
        ];
        let palavrasRemove = [
            "filmes de ",
            "filmes "
        ];

        let items = [];
        if (resYT.items) {
            await Promise.all(resYT.items.map(async (itemYT) => {
                let titulo = String(itemYT?.snippet?.title).toLowerCase();
                if (!itemsRemove.some(item => titulo.includes(item.toLowerCase()))) {
                    await Promise.all(palavrasRemove.map(async (palavra) => {
                        titulo = titulo.replace(palavra, "");
                    }));

                    items.push({
                        id: itemYT?.id,
                        titulo: titleize(titulo)
                    });
                }
            }));
        }


        return items;
    }


    static async ListarVideoPlaylist(playlistId) {
        let params = {
            maxResults: 50,
            part: "snippet,contentDetails",
            playlistId,
            key: process.env.CHAVE_API_YOUTUBE
        };
        let resYT = await request("GET", `${process.env.BASE_URL_API_YOUTUBE}/playlistItems`, params);

        let items = [];
        if (resYT.items) {
            await Promise.all(resYT.items.map(async (itemYT) => {
                    items.push({
                        id: itemYT?.snippet?.resourceId?.videoId,
                        titulo: titleize(itemYT?.snippet?.title),
                        descricao: itemYT?.snippet?.description,
                        thumbnail: itemYT?.snippet?.thumbnails?.medium?.url
                    });
            }));
        }
        return items
    }

    static async pegarVideo(videoId) {
        let params = {
            part: "snippet,contentDetails",
            id: videoId,
            key: process.env.CHAVE_API_YOUTUBE
        };
        let resYT = await request("GET", `${process.env.BASE_URL_API_YOUTUBE}/videos`, params);

        let items = [];
        if (resYT.items) {
            await Promise.all(resYT.items.map(async (itemYT) => {
                    items.push({
                        id: itemYT?.id,
                        titulo: titleize(itemYT?.snippet?.title),
                        descricao: itemYT?.snippet?.description,
                        thumbnail: itemYT?.snippet?.thumbnails?.medium?.url
                    });
            }));
        }
        return items?.[0]
    }



}