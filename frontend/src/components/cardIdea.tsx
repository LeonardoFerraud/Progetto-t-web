import React, { useState } from 'react';
import '../style/FormIdea.css';

export interface CardData{
    id: number,
    titolo: string,
    categoria: string,
    descrizione: string,
    budget: number,
    colore: string,
}

const cardInit: CardData = {
    id: 0,
    titolo: '',
    categoria: '',
    descrizione: '',
    budget: 0,
    colore: '#f26735',
}

interface CardFormProps {
    onSubmit: (data: CardData) => void;
    //funzione di callback, si assicura che eseguire l'azione su un 'data' con la strutture di 'CardData' senza restituire nulla.
}

export const CardForm: React.FC<CardFormProps> = ({ onSubmit }) => {

    const [cardData, setCardData] = useState<CardData>(cardInit);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name; //.name perchè sta per "titolo, categoria,.." in base al campo in cui avviene l'evento
        const value = name === 'budget' ? Number(e.target.value) : e.target.value;
        setCardData({
            ...cardData,    //permette di aggiornare tutti i dati della card e non solo l'ultimo modificato (spread operator)
            [name]: value
        });
    };

    return (
        <form
            className="idea-form"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(cardData);
                setCardData(cardInit);
            }}
        >
            <header className="idea-form__header">
                <span className="idea-form__eyebrow">Dai spazio alle idee</span>
                <h2>Nuova idea</h2>
                <p>Raccogli il tuo spunto e trasformalo in un progetto.</p>
            </header>

            <div className="idea-form__field">
                <label htmlFor="idea-titolo">Titolo</label>
                <input
                    id="idea-titolo"
                    type="text"
                    name="titolo"
                    value={cardData.titolo}
                    onChange={handleChange}
                    placeholder="Titolo"
                />
            </div>

            <div className="idea-form__row">
                <div className="idea-form__field">
                    <label htmlFor="idea-categoria">Categoria</label>
                    <input
                        id="idea-categoria"
                        type="text"
                        name="categoria"
                        value={cardData.categoria}
                        onChange={handleChange}
                        placeholder="Categoria"
                    />
                </div>

                <div className="idea-form__field">
                    <label htmlFor="idea-budget">Budget</label>
                    <input
                        id="idea-budget"
                        type="number"
                        name="budget"
                        min={0}
                        value={cardData.budget}
                        onChange={handleChange}
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="idea-form__field">
                <label htmlFor="idea-descrizione">Descrizione</label>
                <textarea
                    id="idea-descrizione"
                    name="descrizione"
                    value={cardData.descrizione}
                    onChange={handleChange}
                    placeholder="Aggiungi qualche dettaglio..."
                    rows={3}
                />
            </div>

            <div className="idea-form__color">
                <label htmlFor="idea-colore">Colore della scheda</label>
                <input
                    id="idea-colore"
                    type="color"
                    name="colore"
                    value={cardData.colore}
                    onChange={handleChange}
                />
            </div>

            <button className="idea-form__submit" type="submit">
                <span aria-hidden="true">+</span>
                Salva idea
            </button>
        </form>
    );
}

/*
    - props = proprietà con cui comunicano i componenti, quando definisco una props sto dicendo come mi aspetto la forma
              con cui il componente comunicherà.
    - handleChange:
                Quando l'utente compie un'azione sulla pagina web il browser genera un oggetto evento che contiene tutte le informazioni relative a quell'azione.
                L'evento si scatena ogni volta che l'attributo onChange di un input viene attivato (scrittura testo input).
    --COMPLETATA--
*/