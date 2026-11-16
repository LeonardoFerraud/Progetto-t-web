export interface IdeaDto {
    id: number;
    titolo: string;
    descrizione: string | null;
    categoriaId: number | null;
    categoria: string | null;
    budget: number | null;
    colore: string;
}

export interface CategoriaDto {
    id: number;
    nome: string;
}

export interface IdeaRequest {
    titolo: string;
    descrizione: string;
    categoriaId: number | null;
    budget: number;
    colore: string;
}

async function richiestaJson<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        const dettaglio = await response.text();
        throw new Error(`Richiesta fallita (${response.status}): ${dettaglio}`);
    }

    return response.json() as Promise<T>;
}

export function caricaIdee(): Promise<IdeaDto[]> {
    return richiestaJson<IdeaDto[]>('/api/idee');
}

export function caricaCategorie(): Promise<CategoriaDto[]> {
    return richiestaJson<CategoriaDto[]>('/api/categorie');
}

export async function creaIdea(
    idea: IdeaRequest
): Promise<IdeaDto> {
    const response = await fetch('/api/idee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idea),
    });

    if (!response.ok) {
        const dettaglio = await response.text();
        throw new Error(`Creazione fallita (${response.status}): ${dettaglio}`);
    }

    return response.json() as Promise<IdeaDto>;
}

export async function eliminaIdeaDalServer(
    ideaId: number
): Promise<void> {
    const response = await fetch(`/api/idee/${ideaId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const dettaglio = await response.text();
        throw new Error(`Eliminazione fallita (${response.status}): ${dettaglio}`);
    }
}