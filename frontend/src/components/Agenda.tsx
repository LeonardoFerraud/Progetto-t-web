import { useState } from "react";
import Evento from './formEvento';
import type { evento } from './formEvento';
import HideEvents from './hideEvento';

const Agenda = () => {

    //creazione delle colonne
    const colonne = [
        'Lunedì',
        'Martedì',
        'Mercoledì',
        'Giovedì',
        'Venerdì',
        'Sabato',
        'Domenica'
    ];

    //creazione delle righe (dalle 6 alle 24)
    const righe = Array.from({ length: 19 }, (_, i) => i + 6);

    // all'avvio leggo gli eventi già salvati nel local storage
    const [listaEventi, setListaEventi] = useState<evento[]>(() => {
        const eventiSalvati = localStorage.getItem('eventi');
        if (eventiSalvati !== null){
            return JSON.parse(eventiSalvati);
        }
        return [];
    });

    // chiamata dal form quando l'utente crea un evento
    const addEvento = (nuovoEvento: evento) => {
        const nuovaLista = [...listaEventi, nuovoEvento];
        setListaEventi(nuovaLista);
        localStorage.setItem('eventi', JSON.stringify(nuovaLista));
    }

    // elimina gli eventi della cella scelta (giorno + ora)
    const eliminaEvento = (colonna: string, riga: number) => {
        const nuovaLista = listaEventi.filter(
            (e) => !(e.colonna === colonna && e.riga === riga)
        );
        setListaEventi(nuovaLista);
        localStorage.setItem('eventi', JSON.stringify(nuovaLista));
    }

    // elimina definitivamente tutti gli eventi
    const ripulisci = () => {
        setListaEventi([]);
        localStorage.removeItem('eventi');
    }

    return (
        <section className="agenda-page" aria-labelledby="agenda-title">
            <header className="page-heading">
                <div>
                    <span className="page-heading__eyebrow">Organizza il tuo tempo</span>
                    <h1 id="agenda-title">La tua settimana</h1>
                    <p>Metti a fuoco gli impegni, un giorno alla volta.</p>
                </div>
                <div className="agenda-summary" aria-live="polite">
                    <span className="agenda-summary__number">{listaEventi.length}</span>
                    <span>{listaEventi.length === 1 ? 'impegno pianificato' : 'impegni pianificati'}</span>
                </div>
            </header>

            <div className="weekly-agenda-layout">
                <div className="agenda-form-panel">
                    <div className="agenda-form-actions">
                        <button
                            className="agenda-button agenda-button--clear"
                            type="button"
                            onClick={ripulisci}
                        >
                            Ripulisci
                        </button>
                    </div>
                    <Evento colonne={colonne} onAddEvento={addEvento} />
                </div>

                <div className="weekly-schedule-container">
                    <table className="weekly-schedule">
                        {/* INTESTAZIONE: Giorni della settimana */}
                        <thead>
                            <tr>
                                <th scope="col">Ora</th>
                                {colonne.map((colonna, index) => (
                                    <th key={index} scope="col">{colonna}</th>
                                ))}
                            </tr>
                        </thead>

                        {/* CORPO DELLA TABELLA: Righe orarie */}
                        <tbody>
                            {righe.map((ora) => (
                                <tr key={ora}>
                                    {/* Colonna per l'ora corrente */}
                                    <th className="schedule-time" scope="row">
                                        {ora}:00
                                    </th>

                                    {/* Celle dei giorni: mostrano gli eventi di quel giorno e quell'ora */}
                                    {colonne.map((nomeColonna, index) => {

                                        // eventi che appartengono a questa cella
                                        const eventiCella = listaEventi.filter(
                                            (e) => e.colonna === nomeColonna && e.riga === ora
                                        );

                                        // se c'è almeno un evento uso il colore del primo, altrimenti nessun colore
                                        let coloreCella = '';
                                        if (eventiCella.length > 0) {
                                            coloreCella = eventiCella[0].colore;
                                        }

                                        return (
                                            <td
                                                key={index}
                                                className="schedule-cell"
                                            >
                                                {eventiCella.map((e) => (
                                                    <span
                                                        className="schedule-event"
                                                        key={e.id}
                                                        style={{ backgroundColor: coloreCella }}
                                                    >
                                                        {e.titolo}
                                                    </span>
                                                ))}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="agenda-form-panel">
                    <HideEvents colonne={colonne} onEliminaEvento={eliminaEvento} />
                </div>
            </div>

        </section>
    );
}

export default Agenda;

// farsi spiegare la parte html