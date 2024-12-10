import React from 'react';
import './About.css';

const members = [
    {
        name: 'Artur Krauspenhar',
        role: 'Função',
        github: 'https://github.com/Arturhk05',
        photo: '/src/assets/members/artur.png',
    },
    {
        name: 'Diassis Nascimento',
        role: 'Função',
        github: 'https://github.com/Diaxiz',
        photo: '/src/assets/members/diassis.png',
    },
    {
        name: 'Eduardo Morais',
        role: 'Função',
        github: 'https://github.com/Edumorais08',
        photo: '/src/assets/members/eduardo.png',
    },
    {
        name: 'Filipe Bressanelli',
        role: 'Função',
        github: 'https://github.com/fbressa',
        photo: '/src/assets/members/filipe.png',
    },
    {
        name: 'Gustavo Gontijo',
        role: 'Função',
        github: 'https://github.com/Guga301104',
        photo: '/src/assets/members/gustavo.png',
    },
    {
        name: 'Leonardo Sauma',
        role: 'Função',
        github: 'https://github.com/leohssjr',
        photo: '/src/assets/members/leonardo.png',
    },
];

const About = () => {
    return (
        <div className="about-page">
            {/* Fundo com fotos */}
            <div className="background">
                {members.map((member, index) => (
                    <img
                        key={index}
                        src={member.photo}
                        alt={member.name}
                        className="background-photo"
                    />
                ))}
            </div>

            {/* Navbar */}
            <header className="about-header">
                <img src="/src/assets/logo-png.png" alt="ChamaControl" className="logo-image" />
                <nav className="navigation">
                    <a href="/home">Início</a>
                    <a href="/maps">Consultar Mapa</a>
                    <a href="/about" className="active">Equipe</a>
                </nav>
                <button className="alert-button">Receber Alertas</button>
                <div className="user-icon"></div>
            </header>

            {/* Conteúdo */}
            <main className="about-content">
                <section className="about-intro">
                    <h1>Quem somos nós?</h1>
                    <p>
                        Somos alunos de Engenharia de Software. Este projeto foi confeccionado para a disciplina
                        de Métodos de Desenvolvimento de Software, lecionada pela professora Carla Rocha. Nosso
                        objetivo é oferecer uma solução tecnológica para o monitoramento e combate às queimadas no Brasil.
                    </p>
                </section>

                {/* Membros */}
                <section className="members-section">
                    {members.map((member, index) => (
                        <div key={index} className="member-card">
                            <div className="member-photo">
                                <img src={member.photo} alt={member.name} />
                            </div>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <a href={member.github} target="_blank" rel="noopener noreferrer">
                                    <img src="/src/assets/logo-github.png" alt="GitHub" className="github-icon" />
                                    GitHub
                                </a>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default About;
