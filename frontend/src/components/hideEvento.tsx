import React, { useState } from 'react';
import '../style/FormEvento.css';

// Contiene solo la posizione della cella da svuotare
interface posizione {
    colonna: string;
    riga: number;
}

const posizioneInit: posizione = {
    colonna: '',
    riga: 6,
}

interface EliminaProps {
    colonne: string[];
    onEliminaEvento: (colonna: string, riga: number) => void;
}

const FormElimina = (props: EliminaProps) => {

    const [formData, setFormData] = useState<posizione>(posizioneInit);

    // Aggiorna lo stato quando l'utente cambia giorno o ora
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const nome = e.target.name;
        const valore = e.target.value;

        if (nome === 'riga') {
            setFormData({ ...formData, riga: Number(valore) });
        } else {
            setFormData({ ...formData, [nome]: valore });
        }
    }

    // Consegna al genitore la cella scelta, che si occupa di eliminare l'evento
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //blocca il comportamento predefinito del browser per permettere la scelta della cella
        props.onEliminaEvento(formData.colonna, formData.riga);
        setFormData(posizioneInit);
    }

    return (
        <form className="evento-form" onSubmit={handleSubmit}>
            <header className="evento-form__header">
                <span className="evento-form__eyebrow">Gestisci la settimana</span>
                <h3>Elimina evento</h3>
                <p>Rimuovi l'impegno scelto dalla tua agenda.</p>
            </header>

            <div className="evento-form__row">
                <div className="evento-form__field">
                    <label htmlFor="elimina-giorno">Giorno</label>
                    <select
                        id="elimina-giorno"
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
                    <label htmlFor="elimina-ora">Ora</label>
                    <input
                        id="elimina-ora"
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

            <button className="evento-form__submit" type="submit">
                <span aria-hidden="true">−</span>
                Elimina evento
            </button>
        </form>
    );
}

export default FormElimina;

//controllare dove effettivamente si vede nel sito questo componente