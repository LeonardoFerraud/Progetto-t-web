import { useState } from 'react';
import type { FormEvent } from 'react';
import { login } from '../auth';
import type { Utente } from '../auth';
import '../style/LoginForm.css';

interface LoginFormProps {
    onLoginSuccess: (utente: Utente) => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errore, setErrore] = useState('');

    const gestisciSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrore('');

        try {
            const utente = await login(username, password);
            onLoginSuccess(utente);
        } catch (erroreRicevuto: unknown) {
            setErrore(
                erroreRicevuto instanceof Error
                    ? erroreRicevuto.message
                    : 'Credenziali non valide o utente inesistente.'
            );
        }
    };

    return (
        <main className="login-page">
            <section className="login-card" aria-labelledby="login-title">
                <span className="page-heading__eyebrow">Bentornato</span>
                <h1 id="login-title">Accedi a TYME</h1>
                <p>Inserisci il tuo nome utente e la password.</p>

                <form onSubmit={gestisciSubmit}>
                    <div className="login-field">
                        <label htmlFor="login-username">Nome utente</label>
                        <input
                            id="login-username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {errore && <p className="login-error" role="alert">{errore}</p>}

                    <button className="login-submit" type="submit">Entra</button>
                </form>
            </section>
        </main>
    );
}
