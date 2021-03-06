import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import url from '../../apiURL';

import './Contact.css';
import '../General.css';



toast.configure()

function Contact() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [dados, setDados] = useState('');
    const [link, setLink] = useState('');
    const [subject, setSubject] = React.useState(0);

    const list = [
        {name: ''},
        {name: 'Dúvidas'},
        {name: 'Parceria'},
        {name: 'Estrutura'},
        {name: 'Outros'},
      ];

    const nameChange = (event) => {
        setName(event.target.value);
    };

    const phoneChange = (event) => {
        setPhone(event.target.value);
    };  

    const messageChange = (event) => {
        setMessage(event.target.value);
    };

    const subjectChange = (event) => {
        setSubject(event.target.value);
    };

    const sendMaile = async () => {
        try{
                const db = await axios.post(`${url.url}/api/contato`, {
                "name": name,
                "phone": phone,
                "subject": subject,
                "message": message
            });
         if(db.status === 200) { toast('Mensagem enviada!'); limpaCampos() }
        } catch(err) {
            toast.warn('Erro ao enviar, tente novamente!');
        }
        };

        const notify = (event) => {
            sendMaile();
            event.preventDefault();
        }

      const handleSubmit = (event) => {
        event.preventDefault();
        sendMaile();
      };

      const loadInfo = async () => {
        const res = await axios.get(`${url.url}/api/social`);
        setDados(res.data);
        const link = await axios.get(`${url.url}/api/ticket`);
        setLink(link.data);
      };

      function limpaCampos() {
        var elements = document.getElementsByName("form_txt");
        elements.forEach(element => {
          element.value = '';
        })
      }

      useEffect(() => {
        loadInfo();
      }, []);
    
    return(
<div class="all">
        <section className="contact-box" alt="seção de contato" id="contact">
            <div className="contact">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
                <section className="info-contact">
                    <div className="logo-contact"></div>
                    {dados && (  
                    <div className="social-media">
                            <a href={dados[0]?.instagram} target="_blank" rel="noopener noreferrer"><button className="logo-insta" alt="ir para instagram"></button></a>
                            <a href={dados[0]?.facebook} target="_blank" rel="noopener noreferrer"><button className="logo-face" alt="ir para facebook"></button></a>
                    </div>
                    )}
                    {link && (
                    <div>
                        <a href={link[0]?.IngressoURL} target="_blank" rel="noopener noreferrer"><button className="link-ingresso" type="button" alt="comprar ingresso">Inscreva-se</button></a>
                    </div>
                    )}
                </section>

                <section className="submit-message" alt="enviar mensagem">
                    <h2>Nos mande uma mensagem</h2>
                    <div className="box">
                        <form onSubmit={(event) => handleSubmit(event)} required={true}>
                            <div>
                                <input name="form_txt" type="text" required={true} value={name} onChange={(event) => nameChange(event)}></input>
                                <label alt="nome">Nome</label>
                            </div>
                            <div>
                                <input name="form_txt" type="text" required={true} value={phone} onChange={(event) => phoneChange(event)}></input>
                                <label alt="telefone">Telefone</label>
                            </div>
                            <div>
                                <select name="form_txt" required={true} value={subject} onChange={(event) => subjectChange(event)}>
                                    {list.map((item, index) => (
                                        <option key={index} value={item.name} alt={item.name}>{item.name}</option>
                                    ))}
                                </select>
                                <label alt="assunto">Assunto</label>
                            </div>
                            <div>
                                <textarea name="form_txt" required={true} value={message} onChange={(event) => messageChange(event)}></textarea>
                                <label alt="Mensagem">Messagem</label>
                            </div>
                            <button type="submit" value="submit" alt="enviar" onSubmit={notify}>Enviar</button>
                        </form>
                    </div>
                </section>
            </div>
        </section>
</div>
    );
}

export default Contact;