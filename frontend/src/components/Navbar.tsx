import { useState } from "react";
import Agenda from './Agenda';
import ZonaCreativa from './ZonaCreativa';
import '../style/Navbar.css';
import type { Utente } from '../auth';

type Pagina = 'agenda' | 'zonacreativa';

interface NavbarProps {
    utente: Utente;
    onLogout: () => void;
}

const Navbar = ({ utente, onLogout }: NavbarProps) =>{

    const [paginaAttiva, setPaginaAttiva] = useState<Pagina>('agenda');

    const zonaCreativaAttiva = paginaAttiva === 'zonacreativa';
    const agendaAttiva = paginaAttiva === 'agenda';

    return(
        <div className="app-shell">
            <nav className="navbar">
                <div className="navbar__brand">
                    <span className="navbar__mark">TY</span>
                    <span className="navbar__brand-copy">
                        <span className="navbar__brand-name">TYME</span>
                        <span className="navbar__brand-tagline">Metti ordine alle tue giornate e idee</span>
                    </span>
                </div>
                <div className="navbar__links">
                    <span className="navbar__button">{utente.username}</span>
                    <button
                        className={agendaAttiva ? 'navbar__button navbar__button--active' : 'navbar__button'}
                        onClick={() => setPaginaAttiva('agenda')}
                    >
                        Agenda
                    </button>
                    <button
                        className={zonaCreativaAttiva ? 'navbar__button navbar__button--active' : 'navbar__button'}
                        onClick={() => setPaginaAttiva('zonacreativa')}
                    >
                        Zona creativa
                    </button>
                    <button className="navbar__button" onClick={onLogout}>
                        Esci
                    </button>
                </div>
            </nav>
            <main className="navbar__content">
                {paginaAttiva === 'agenda' && <Agenda />}
                {paginaAttiva === 'zonacreativa' && <ZonaCreativa utente={utente} />}
            </main>
        </div>
    );
}

export default Navbar;

// --- COMPLETATA ---