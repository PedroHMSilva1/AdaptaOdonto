import React, { useState } from 'react';
import './style.scss';

export default function LandingPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        tratamento: 'Sr.',
        name: '',
        rg: '',
        date: '',
        time: '',
        message: '',
    });
    const [error, setError] = useState('');

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Função para atualizar os valores dos campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função de validação de todos os campos
    const validateFields = () => {
        const { tratamento, name, rg, date, time, message } = formData;

        // Verificar se algum campo está vazio
        if (!tratamento || !name || !rg || !date || !time || !message) {
            setError('Por favor, preencha todos os campos.');
            return false;
        }

        // Verificar se a data é futura
        const selectedDateTime = new Date(`${date}T${time}:00`);
        const currentDate = new Date();
        if (selectedDateTime < currentDate) {
            setError('Por favor, selecione uma data futura.');
            return false;
        }

        // Verificar se o horário está dentro do intervalo permitido (07:00 às 18:00)
        const startHour = 7;
        const endHour = 18;
        if (selectedDateTime.getHours() < startHour || selectedDateTime.getHours() >= endHour) {
            setError(`Por favor, selecione um horário entre ${startHour}:00 e ${endHour}:00.`);
            return false;
        }

        // Se tudo estiver correto, limpa a mensagem de erro
        setError('');
        return true;
    };

    // Função para enviar a mensagem no WhatsApp
    const sendMessage = () => {
        if (!validateFields()) {
            return;
        }

        const { tratamento, name, rg, date, time, message } = formData;
        const dateTime = new Date(`${date}T${time}:00`);
        const options = {
            timeZone: 'America/Sao_Paulo',
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        const formattedDate = dateTime.toLocaleString('pt-BR', options);

        const text = `${encodeURIComponent(tratamento)}: ${encodeURIComponent(name)},
        RG: ${encodeURIComponent(rg)},
        Deseja o agendamento para o dia : ${encodeURIComponent(formattedDate)}.
        Tratamento a Realizar: ${encodeURIComponent(message)}`;

        const phoneNumber = '11934509980';
        const url = `https://wa.me/${phoneNumber}?text=${text}`;

        window.open(url, '_blank'); // Abrir WhatsApp
    };

    return (
        <div className="landing-page">
            <section className="topo">
                <div>
                    <div>
                        <h1>Referência em ortodontia na cidade de São Paulo</h1>
                        <p>Transforme seu sorriso com a tecnologia premium da Adapta Odonto</p>
                        <button onClick={openPopup} className="btn-agendamento">
                            <img src="/assets/images/zap.png" alt="Ícone WhatsApp" />
                            Agendamento
                        </button>
                    </div>
                    <img alt="logo de login" src="/assets/images/logo_fundo_cinza.png" />
                </div>

                {isPopupOpen && (
                    <>
                        <div className="popup">
                            <div className="popup-content">
                                <span className="close" onClick={closePopup}>x</span>

                                <h3>Envie sua mensagem</h3>

                                <label>Tratamento:</label>
                                <select name="tratamento" value={formData.tratamento} onChange={handleChange}>
                                    <option value="Sr.">Sr.</option>
                                    <option value="Sra.">Sra.</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Dra.">Dra.</option>
                                </select>

                                <label>Nome:</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome" required />

                                <label>RG:</label>
                                <input type="text" name="rg" value={formData.rg} onChange={handleChange} placeholder="Seu RG" required />

                                <label>Data:</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                                <label>Horário:</label>
                                <input type="time" name="time" value={formData.time} onChange={handleChange} required />

                                <label>Tratamento à Realizar:</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Sua mensagem" required />

                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                <button onClick={sendMessage} className="sendButton">Enviar no WhatsApp</button>
                            </div>
                        </div>
                    </>
                )}
            </section>

            <section className="servicos">
                <div className="textos-servicos">
                    <h1>Nossos Serviços</h1>
                    <p>
                        Descubra como nossa clínica odontológica oferece um cuidado abrangente e especializado
                        para a saúde e estética do seu sorriso. Conheça nossos serviços que vão além do convencional,
                        proporcionando o melhor atendimento em:
                    </p>
                </div>

                <div className="pai-servico">
                    <div className="servico">
                        <img alt="Ícone de aparelhos transparentes" src="/assets/images/aparelho_transparente.png" />
                        <h4>Aparelhos Transparentes</h4>
                    </div>
                    <div className="servico">
                        <img alt="ícone de ferramentas de dentista" src="/assets/images/tratamento.png" />
                        <h4>Tratamentos preventivos</h4>
                    </div>
                    <div className="servico">
                        <img alt="Ícone de cadeira de dentista" src="/assets/images/cadeira_dentista.png" />
                        <h4>Experience Dayclinic</h4>
                    </div>
                </div>
                <img className="image-dente" alt="" src="/assets/images/logo_round.png" />
            </section>

            <section className="clinica">
                <div>
                    <h1>Conheça nossa clínica</h1>
                    <p>Uma estrutura diferenciada, com 650m² dedicados à Odontologia Prime em todas as especialidades da odontologia</p>
                    <p>Com 8 consultórios, 4 salas de esperas, espaço Kids, elevador com acesso em toda clínica, plataforma para acessibilidade e estacionamento no subsolo.</p>
                    <div>Localizado na Faria Lima</div>
                </div>
                <div className="fundo-predio">
                    <div>4 Doutores especializados</div>
                </div>
            </section>

            <section className="agendamento">
                <h1>Agilidade em sua Consulta</h1>
                <p>Atendimento Prime com alta tecnologia para cuidar da saúde dos seus dentes com qualidade</p>
                <p>Nossos especialistas em odontologia estão comprometidos em proporcionar a você a melhor experiência de cuidado bucal, com serviços personalizados e avançada tecnologia.</p>
            </section>

            <section className="tratamentos">
                <div>
                    <img src="/assets/images/raiox.png" />
                    <p>Raio X panorâmico</p>
                </div>
                <div>
                    <img src="/assets/images/tratamento_tech1.png" />
                    <p>Tratamentos Tecnológicos</p>
                </div>
                <div>
                    <img src="/assets/images/tratamento_tech2.png" />
                    <p>Tratamentos personalizados</p>
                </div>
            </section>

            <section className="checkup">
                <div className="textocheckup">
                    <h1>Check-up Digital</h1>
                    <p>Você sabia que problemas bucais podem estar se desenvolvendo, sem que você perceba?</p>
                    <p>Confie em uma equipe com vasta experiência, nossos profissionais têm mais de 15 anos de experiência.</p>
                    <p>Com o nosso check-up digital, identificamos problemas bucais em estágio inicial, prevenindo problemas futuros.</p>
                    <button className="btn-agendamento"><img src="/assets/images/zap.png" />Agendamento</button>
                </div>
                <img className="fundocheckup" src="/assets/images/fundo_checkup.png" />
            </section>

            <section className="rodape">
                <div className="Tratamentos">
                    <h1>Tratamentos</h1>
                    <br />
                    <br />
                    <h2>Tratamentos preventivos</h2>
                    <br />
                    <br />
                    <h2>Aparelhos Transparentes</h2>
                    <br />
                    <br />
                    <h2>Tratamentos Odontopediátricos</h2>
                </div>
                <div className="Contato">
                    <h1>Contato</h1>
                    <br />
                    <br />
                    <h2>(11) 4004-1535</h2>
                    <br />
                    <br />
                    <h2>contato@adaptaodonto.com.br</h2>
                    <br />
                    <br />
                    <h2>(11) 97114-3318</h2>
                </div>
                <div className="rede">
                    <h1>Redes Sociais</h1>
                    <img src="/assets/images/instagram.png" />
                </div>
            </section>
        </div>
    );
}
