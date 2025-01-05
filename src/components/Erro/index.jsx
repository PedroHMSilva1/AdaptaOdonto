import './style.scss'

export default function Erro(props){
    return(
        <div className="erro-container">
            <div className="erro">
                <h2>{props.mensagem}</h2>
                <button onClick={() => props.close()} className='btn-erro'>OK</button>
            </div>
        </div>
    )
}