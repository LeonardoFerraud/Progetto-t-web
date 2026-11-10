package com.example.demo.service;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.dto.EventoRequest;
import com.example.demo.entity.Evento;
import com.example.demo.entity.Utente;
import com.example.demo.repository.EventoRepo;
import com.example.demo.repository.UtenteRepo;

@Service
public class AgendaService {

    private final EventoRepo eventoRepo;
    private final UtenteRepo utenteRepo;

    public AgendaService(EventoRepo eventoRepo, UtenteRepo utenteRepo) {
        this.eventoRepo = eventoRepo;
        this.utenteRepo = utenteRepo;
    }

    public List<Evento> trovaEventiUtente(Long utenteId, String giorno, Integer ora) {
        verificaUtente(utenteId);

        Stream<Evento> eventi = eventoRepo.findByUtente_Id(utenteId).stream();
        if (giorno != null) {
            eventi = eventi.filter(evento -> evento.getGiorno().equalsIgnoreCase(giorno));
        }
        if (ora != null) {
            eventi = eventi.filter(evento -> evento.getOra().equals(ora));
        }
        return eventi.toList();
    }

    public Evento trovaEventoPerId(Long eventoId, Long utenteId) {
        return trovaEventoProprietario(eventoId, utenteId);
    }

    public Evento creaEvento(EventoRequest richiesta, Long utenteId) {
        valida(richiesta);
        Utente utente = verificaUtente(utenteId);

        Evento evento = new Evento(
                richiesta.titolo(),
                richiesta.giorno(),
                richiesta.ora(),
                richiesta.colore(),
                utente
        );

        return eventoRepo.save(evento);
    }

    public Evento aggiornaEvento(Long eventoId, EventoRequest richiesta, Long utenteId) {
        valida(richiesta);
        Evento evento = trovaEventoProprietario(eventoId, utenteId);
        evento.setTitolo(richiesta.titolo());
        evento.setGiorno(richiesta.giorno());
        evento.setOra(richiesta.ora());
        evento.setColore(richiesta.colore());
        return eventoRepo.save(evento);
    }

    @Transactional
    public void eliminaEvento(Long eventoId, Long utenteId) {
        Evento evento = trovaEventoProprietario(eventoId, utenteId);
        eventoRepo.delete(evento);
    }

    @Transactional
    public void eliminaEventiCella(Long utenteId, String giorno, Integer ora) {
        verificaUtente(utenteId);
        if (giorno == null || giorno.isBlank() || ora == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Giorno e ora sono obbligatori");
        }
        eventoRepo.deleteByUtente_IdAndGiornoAndOra(utenteId, giorno, ora);
    }

    @Transactional
    public void eliminaEventiUtente(Long utenteId) {
        verificaUtente(utenteId);
        eventoRepo.deleteByUtente_Id(utenteId);
    }

    private Utente verificaUtente(Long utenteId) {
        return utenteRepo.findById(utenteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato"));
    }

    private Evento trovaEventoProprietario(Long eventoId, Long utenteId) {
        verificaUtente(utenteId);
        return eventoRepo.findById(eventoId)
                .filter(evento -> evento.getUtente().getId().equals(utenteId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento non trovato"));
    }

    private void valida(EventoRequest richiesta) {
        if (richiesta == null || richiesta.titolo() == null || richiesta.titolo().isBlank()
                || richiesta.giorno() == null || richiesta.giorno().isBlank()
                || richiesta.colore() == null || richiesta.colore().isBlank()
                || richiesta.ora() == null || richiesta.ora() < 6 || richiesta.ora() > 24) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Dati evento non validi");
        }
    }
}