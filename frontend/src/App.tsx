import { useEffect, useState } from 'react';
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import { logout, verificaSessione } from './auth';
import type { Utente } from './auth';

function App() {
  const [utente, setUtente] = useState<Utente | null>(null);
  const [verificaInCorso, setVerificaInCorso] = useState(true);
  const [errore, setErrore] = useState('');

  useEffect(() => {
    verificaSessione()
      .then(setUtente)
      .catch(() => setErrore('Backend non raggiungibile. Avvia il server e ricarica la pagina.'))
      .finally(() => setVerificaInCorso(false));
  }, []);

  const gestisciLogout = async () => {
    try {
      await logout();
      setUtente(null);
      setErrore('');
    } catch {
      setErrore('Non è stato possibile terminare la sessione.');
    }
  };

  const gestisciLoginSuccess = (utenteAutenticato: Utente) => {
    setUtente(utenteAutenticato);
    setErrore('');
  };

  if (verificaInCorso) {
    return <main className="welcome"><p>Verifica sessione...</p></main>;
  }

  if (!utente) {
    return (
      <div className="welcome">
        {errore && <p role="alert">{errore}</p>}
        <LoginForm onLoginSuccess={gestisciLoginSuccess} />
      </div>
    );
  }

  return (
    <main className="welcome">
      {errore && <p role="alert">{errore}</p>}
      <Navbar utente={utente} onLogout={gestisciLogout} />
    </main>
  );
}

export default App;

/*

---Navbar---FATTO
La navbar deve contenere i link per navigare tra le due sezioni del sito:
  - TO DO LIST
  - ZONA CREATIVA

---PARTE 1---FATTO

---TO DO LIST---FATTO
Il progetto deve avere come home page una tabella che permetta di organizzare la giornata con i vari impegni:
  - appuntamenti
  - orari lavorativi o dedicati allo studio
  - attività fisica
  - e così via
Questa prima pare deve essere a tutti gli effetti una sorta di calendario settimanale nel quale inserire gli impegni

---PARTE 2---

---ZONA CREAIVA---
Questa sezione del sito deve invece contenere una lavagna vuota sulla quale mettere post it virtuali delle cose che vorresti fare, progetti, idee e così via
lo scopo è quello di creare un posto dove raccogliere i pensieri creare collegamenti tra di essi per far nascere nuovi progetti o realizzare sogni nel cassetto
rimandati già troppe volte.
Ogni "post it" deve contenere delle informazioni ben specifiche, affinchè le idee non restino vaghe e irrealizzabili ad esempio dove posso fare una cosa o quanti
soldi mi servono per farla.
*/