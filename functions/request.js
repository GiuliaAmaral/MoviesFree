export default async function request(metodo, url, params = {}, body = null, headers = {}) {
    return new Promise(async (sucesso, erro) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        for (var key in headers) {
            myHeaders.append(key, headers[key]);
        }
        for (var key in params) {
            url += (url.indexOf("?") === -1 ? "?" : "&") + key + "=" + params[key];
        }
        
        var requestOptions = {
            method: metodo,
            headers: myHeaders,
            body: body && JSON.stringify(body),
            redirect: 'follow'
        };

        try {
            let respostaApi = await fetch(url, requestOptions);
            if (respostaApi.ok) {
                let resposta = await respostaApi.json();
                sucesso(resposta);
            }else{
                erro(respostaApi.statusText);
            }
        } catch (error) {
            console.error(error);
            erro(String(error));
        }
    })
}