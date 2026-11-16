export interface EventoDto {
    id: number;
    titolo: string;
    giorno: string;
    ora: number;
    colore: string;
}

export interface EventoRequest {
    titolo: string;
    giorno: string;
    ora: number;
    colore: string;
}

export async function caricaEventi(): Promise<EventoDto[]> {
    const response = await fetch('/api/eventi');

    if (!response.ok) {
        throw new Error('Non è stato possibile caricare gli eventi.');
    }

    return response.json() as Promise<EventoDto[]>;
}

export async function creaEvento(
    evento: EventoRequest
): Promise<EventoDto> {
    const response = await fetch('/api/eventi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(evento),
    });

    if (!response.ok) {
        throw new Error('Non è stato possibile salvare l’evento.');
    }

    return response.json() as Promise<EventoDto>;
}

export async function eliminaEventiCella(
    giorno: string,
    ora: number
): Promise<void> {
    const parametri = new URLSearchParams({
        giorno,
        ora: String(ora),
    });
    const response = await fetch(`/api/eventi/cella?${parametri}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Non è stato possibile eliminare gli eventi della cella.');
    }
}

export async function eliminaTuttiEventi(): Promise<void> {
    const response = await fetch('/api/eventi', {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Non è stato possibile eliminare gli eventi.');
    }
}