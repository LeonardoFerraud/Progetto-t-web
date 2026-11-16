import type { CardData } from './cardIdea';
import { useState } from "react";
import { useEffect } from "react";
import { CardForm } from './cardIdea';
import { Card } from './Card';
import { caricaCategorie, caricaIdee, creaIdea, eliminaIdeaDalServer } from '../creativa';
import type { CategoriaDto } from '../creativa';

const ZonaCreativa = () => {

    const [listaIdee, setListaIdee] = useState<CardData[]>([]);
    const [errore, setErrore] = useState('');
    const [categorie, setCategorie] = useState<CategoriaDto[]>([]);

    useEffect(() => {
        caricaIdee()
            .then(idee => {
                setListaIdee(idee.map(idea => ({
                    id: idea.id,
                    titolo: idea.titolo,
                    categoria: idea.categoria ?? '',
                    descrizione: idea.descrizione ?? '',
                    budget: idea.budget ?? 0,
                    colore: idea.colore,
                })));
            })
            .catch(() => {
                setErrore('Non è stato possibile caricare le idee.');
            });
    }, []);

    useEffect(() => {
        caricaCategorie()
            .then(dati => {
                setCategorie(dati);
            })
            .catch(() => {
                setErrore('Non è stato possibile caricare le categorie.');
            });
    }, []);

    const addIdea = async (nuovaIdea: CardData) => {
        const categoriaId =
            categorie.find(categoria => categoria.nome === nuovaIdea.categoria)?.id ?? null;

        try {
            const ideaSalvata = await creaIdea({
                titolo: nuovaIdea.titolo,
                descrizione: nuovaIdea.descrizione,
                categoriaId,
                budget: nuovaIdea.budget,
                colore: nuovaIdea.colore,
            });

            setListaIdee(prev => [...prev, {
                id: ideaSalvata.id,
                titolo: ideaSalvata.titolo,
                categoria: ideaSalvata.categoria ?? '',
                descrizione: ideaSalvata.descrizione ?? '',
                budget: ideaSalvata.budget ?? 0,
                colore: ideaSalvata.colore,
            }]);

            setErrore('');
        } catch {
            setErrore('Non è stato possibile salvare l’idea.');
        }
    };

    const deleteIdea = async (id: number) => {
        try {
            await eliminaIdeaDalServer(id);
            setListaIdee(prev => prev.filter(idea => idea.id !== id));
            setErrore('');
        } catch {
            setErrore('Non è stato possibile eliminare l’idea.');
        }
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

            {errore && <p role="alert">{errore}</p>}

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
                <CardForm categorie={categorie} onSubmit={addIdea} />
            </div>

        </section>
    );
}

export default ZonaCreativa;

// --- COMPLETATA ---