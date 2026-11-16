import { useEffect, useState } from 'react';
import Evento from './formEvento';
import type { evento } from './formEvento';
import HideEvents from './hideEvento';
import {
    caricaEventi,
    creaEvento,
    eliminaEventiCella,
    eliminaTuttiEventi,
} from '../agenda';

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

    const [listaEventi, setListaEventi] = useState<evento[]>([]);
    const [errore, setErrore] = useState('');

    useEffect(() => {
        caricaEventi()
            .then(eventiBackend => {
                setListaEventi(eventiBackend.map(eventoBackend => ({
                    id: eventoBackend.id,
                    titolo: eventoBackend.titolo,
                    colonna: eventoBackend.giorno,
                    riga: eventoBackend.ora,
                    colore: eventoBackend.colore,
                })));
            })
            .catch(() => {
                setErrore('Non è stato possibile caricare gli eventi.');
            });
    }, []);

    const addEvento = async (nuovoEvento: evento) => {
        try {
            const eventoSalvato = await creaEvento({
                titolo: nuovoEvento.titolo,
                giorno: nuovoEvento.colonna,
                ora: nuovoEvento.riga,
                colore: nuovoEvento.colore,
            });

            setListaEventi(prev => [...prev, {
                id: eventoSalvato.id,
                titolo: eventoSalvato.titolo,
                colonna: eventoSalvato.giorno,
                riga: eventoSalvato.ora,
                colore: eventoSalvato.colore,
            }]);
            setErrore('');
        } catch {
            setErrore('Non è stato possibile salvare l’evento.');
        }
    };

    // elimina gli eventi della cella scelta (giorno + ora)
    const eliminaEvento = async (giorno: string, ora: number) => {
        try {
            await eliminaEventiCella(giorno, ora);
            setListaEventi(prev => prev.filter(
                evento => !(evento.colonna === giorno && evento.riga === ora)
            ));
            setErrore('');
        } catch {
            setErrore('Non è stato possibile eliminare gli eventi della cella.');
        }
    };

    // elimina definitivamente tutti gli eventi
    const ripulisci = async () => {
        try {
            await eliminaTuttiEventi();
            setListaEventi([]);
            setErrore('');
        } catch {
            setErrore('Non è stato possibile eliminare gli eventi.');
        }
    };

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

            {errore && <p role="alert">{errore}</p>}

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
                                {colonne.map((giorno, index) => (
                                    <th key={index} scope="col">{giorno}</th>
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
                                    {colonne.map((nomeGiorno, index) => {

                                        // eventi che appartengono a questa cella
                                        const eventiCella = listaEventi.filter(
                                            (e) => e.colonna === nomeGiorno && e.riga === ora
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