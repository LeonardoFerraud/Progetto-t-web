import type { CardData } from './cardIdea';
import { useState } from "react";
import { useEffect } from "react";
import { CardForm } from './cardIdea';
import { Card } from './Card';

const ZonaCreativa = () => {

    const [listaIdee, setListaIdee] = useState<CardData[]>(() => {
        const ideeSalvate = localStorage.getItem('CardData');
        if(ideeSalvate !== null){
            return JSON.parse(ideeSalvate);
        }
        return[];
    });

    useEffect(() => {
        localStorage.setItem('CardData', JSON.stringify(listaIdee));
    }, [listaIdee]);
    //Ogni volta che la lista delle idee viene modificata aggiorna automaticamente il salvataggio nel browser.

    const addIdea = (nuovaIdea: CardData) => {
        setListaIdee(prev => [...prev, { ...nuovaIdea, id: Date.now() }]); //cicla la lista aggiungendo al fondo l'idea
    };

    const deleteIdea = (id: number) => {
        setListaIdee(prev => prev.filter(idea => idea.id !== id));
    };

    return(
        <section className="creative-page" aria-labelledby="creative-title">
            <header className="page-heading">
                <div>
                    <span className="page-heading__eyebrow">Idee senza fretta</span>
                    <h1 id="creative-title">Zona creativa</h1>
                    <p className="creative-intro">
                        Uno spazio tutto tuo per raccogliere pensieri, dare forma ai progetti
                        e immaginare quello che verrà.
                    </p>
                </div>
            </header>

            <div className="creative-board" aria-label="Lavagna delle idee">
                {listaIdee.length === 0 && (
                    <div className="creative-board__notes" aria-hidden="true">
                        <article className="creative-note creative-note--orange">
                            <strong>Una nuova idea</strong>
                            <span>Annota qui il primo spunto.</span>
                        </article>
                        <article className="creative-note creative-note--yellow">
                            <strong>Da esplorare</strong>
                            <span>Le possibilità sono tante.</span>
                        </article>
                        <article className="creative-note creative-note--pink">
                            <strong>Un passo alla volta</strong>
                            <span>Ogni progetto inizia da qui.</span>
                        </article>
                    </div>
                )}

                {listaIdee.length > 0 && (
                    <div className="idea-grid">
                        {listaIdee.map(idea => (
                            <Card key={idea.id} data={idea} onDelete={deleteIdea} />
                        ))}
                    </div>
                )}
            </div>

            <div className="card-form-container" id="idea-form-panel">
                <CardForm onSubmit={addIdea} />
            </div>

        </section>
    );
}

export default ZonaCreativa;

// --- COMPLETATA ---