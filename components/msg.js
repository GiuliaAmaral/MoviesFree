export default function Msg(props) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <i className={`fas fa-3x ${props.icone}`}></i>
            <h1 className="text-black">{props.titulo}</h1>
            {props.children}

            {(props.btnTentarNovamente) && (
                <button className="btn btn-dark" onClick={() => { window.location.reload(); }}>Tentar novamente!</button>
            )}

            {(props.btnInicio) && (
                <button className="btn btn-dark" onClick={() => { window.location.href = "/" }}>Voltar ao Inicio</button>
            )}

        </div>
    )
}