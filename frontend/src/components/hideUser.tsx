import { useState } from 'react';
import { eliminaUtente } from '../auth';

const HideUser = () => {
    const [nome, setNome] = useState('');
    const [errore, setErrore] = useState('');
    const [messaggio, setMessaggio] = useState('');

    const gestisciSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrore('');
        setMessaggio('');

        if (!window.confirm(`Eliminare definitivamente l'utente "${nome}" e i suoi eventi e idee?`)) {
            return;
        }

        try {
            await eliminaUtente(nome);
            setNome('');
            setMessaggio(`L'utente "${nome}" e i suoi dati sono stati eliminati.`);
        } catch {
            setErrore('Utente non eliminato. Verifica il nome e i permessi del tuo account.');
        }
    };

    return (
        <div className="card-form-container">
            <form className="idea-form" onSubmit={gestisciSubmit}>
                <header className="idea-form__header">
                    <span className="idea-form__eyebrow">Amministrazione</span>
                    <h2>Rimuovi un utente</h2>
                    <p>L'eliminazione è permanente e rimuove anche gli eventi e le idee dell'utente.</p>
                </header>

                <div className="idea-form__field">
                    <label htmlFor="utente-da-eliminare">Nome utente</label>
                    <input
                        id="utente-da-eliminare"
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        autoComplete="off"
                        required
                    />
                </div>

                {errore && <p role="alert">{errore}</p>}
                {messaggio && <p role="status">{messaggio}</p>}

                <button className="idea-form__submit" type="submit">
                    Elimina utente
                </button>
            </form>
        </div>
    );
};

export default HideUser;
