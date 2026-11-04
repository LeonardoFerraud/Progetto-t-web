import React, { useState } from 'react';
import '../style/FormEvento.css';

export interface evento {
    id: number;
    titolo: string;
    colonna: string;
    riga: number;
    colore: string;
}

const eventoInit: evento = {
    id: 0,
    titolo: '',
    colonna: '',
    riga: 6,
    colore: '#f26735',
}

//props == SPECIFICHE dati in input
interface EventoProps {
    colonne: string[];
    onAddEvento: (nuovoEvento: evento) => void;
}

const Evento = (props: EventoProps) => {

    const [formData, setFormData] = useState<evento>(eventoInit);

    // Aggiorna lo stato ogni volta che l'utente modifica un campo
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const nome = e.target.name;
        const valore = e.target.value;

        if (nome === 'riga') {
            // "riga" è un numero, quindi converto il testo in numero
            setFormData({ ...formData, riga: Number(valore) });
        } else {
            setFormData({ ...formData, [nome]: valore });
        }
    }

    // Crea il nuovo evento e lo consegna al componente genitore
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuovoEvento: evento = {
            id: Date.now(),
            titolo: formData.titolo,
            colonna: formData.colonna,
            riga: formData.riga,
            colore: formData.colore,
        };

        props.onAddEvento(nuovoEvento);
        setFormData(eventoInit);
    }

    return (
        <form className="evento-form" onSubmit={handleSubmit}>
            <header className="evento-form__header">
                <span className="evento-form__eyebrow">Pianifica la settimana</span>
                <h3>Nuovo evento</h3>
                <p>Aggiungi un impegno alla tua agenda.</p>
            </header>

            <div className="evento-form__field">
                <label htmlFor="evento-titolo">Titolo</label>
                <input
                    id="evento-titolo"
                    type="text"
                    name="titolo"
                    value={formData.titolo}
                    onChange={handleChange}
                    placeholder="Es. Lavoro"
                    required
                />
            </div>

            <div className="evento-form__row">
                <div className="evento-form__field">
                    <label htmlFor="evento-giorno">Giorno</label>
                    <select
                        id="evento-giorno"
                        name="colonna"
                        value={formData.colonna}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Scegli un giorno</option>
                        {props.colonne.map((nome) => (
                            <option key={nome} value={nome}>{nome}</option>
                        ))}
                    </select>
                </div>

                <div className="evento-form__field">
                    <label htmlFor="evento-ora">Ora</label>
                    <div className="evento-form__time">
                        <input
                            id="evento-ora"
                            type="number"
                            name="riga"
                            min={6}
                            max={24}
                            value={formData.riga}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="evento-form__color">
                <label htmlFor="evento-colore">Colore dell'evento</label>
                <input
                    id="evento-colore"
                    type="color"
                    name="colore"
                    value={formData.colore}
                    onChange={handleChange}
                />
            </div>

            <button className="evento-form__submit" type="submit">
                <span aria-hidden="true">+</span>
                Crea evento
            </button>
        </form>
    );
}

export default Evento;

// --- COMPLETATA ---