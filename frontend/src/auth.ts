export interface Utente {
    id: number;
    username: string;
    ruolo: string;
}

export async function login(username: string, password: string): Promise<Utente> {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Credenziali non valide o utente inesistente.');
    }

    return response.json() as Promise<Utente>;
}

export async function verificaSessione(): Promise<Utente | null> {
    const response = await fetch('/api/login');

    if (response.status === 401) {
        return null;
    }
    if (!response.ok) {
        throw new Error('Non è stato possibile verificare la sessione.');
    }

    return response.json() as Promise<Utente>;
}

export async function logout(): Promise<void> {
    const response = await fetch('/api/login', {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Non è stato possibile terminare la sessione.');
    }
}
