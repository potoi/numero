import React from 'react';
import './Form.css';
function Form() {
    return (
        <div >
            <form id="chat" className='form'>
                <input type="text" name="username" placeholder="Digite seu usuário" />
                <div className="messages"></div>
                <input type="text" name="message" id="msg" placeholder="Digite sua mensagem" />
                <button onClick="mandaMsg()" type="submit">Enviar</button>
            </form>
        </div>
    )
} export default Form;
