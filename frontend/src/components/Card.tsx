import React from 'react';
import type { CardData } from './cardIdea';
import '../style/Card.css';

interface CardProps {
    data: CardData;
    onDelete: (id: number) => void;
}

// Sceglie testo scuro o chiaro in base alla luminosità del colore di sfondo
const getTextColor = (hex: string): string => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    const luminanza = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminanza > 0.6 ? '#2b2b2b' : '#ffffff';
};

export const Card: React.FC<CardProps> = ({ data, onDelete }) => {
    const { id, titolo, categoria, descrizione, budget, colore } = data;

    return (
        <article
            className="idea-card"
            style={{ backgroundColor: colore, color: getTextColor(colore) }}
        >
            <button
                type="button"
                className="idea-card__delete"
                onClick={() => onDelete(id)}
                aria-label={`Elimina l'idea ${titolo}`}
                title="Elimina"
            >
                ×
            </button>

            {categoria && <span className="idea-card__category">{categoria}</span>}

            <h3 className="idea-card__title">{titolo || 'Senza titolo'}</h3>

            {descrizione && <p className="idea-card__description">{descrizione}</p>}

            <footer className="idea-card__footer">
                <span>Budget</span>
                <strong>{budget.toLocaleString('it-IT')} €</strong>
            </footer>
        </article>
    );
};

export default Card;

//--COMPLETATA--