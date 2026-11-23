package com.example.demo.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.entity.Utente;
import com.example.demo.repository.EventoRepo;
import com.example.demo.repository.IdeaRepo;
import com.example.demo.repository.SuperRuoloRepo;
import com.example.demo.repository.UtenteRepo;

@Service
public class GestioneUtentiService {

    private final UtenteRepo utenteRepo;
    private final EventoRepo eventoRepo;
    private final IdeaRepo ideaRepo;
    private final SuperRuoloRepo superRuoloRepo;

    public GestioneUtentiService(
            UtenteRepo utenteRepo,
            EventoRepo eventoRepo,
            IdeaRepo ideaRepo,
            SuperRuoloRepo superRuoloRepo) {
        this.utenteRepo = utenteRepo;
        this.eventoRepo = eventoRepo;
        this.ideaRepo = ideaRepo;
        this.superRuoloRepo = superRuoloRepo;
    }

    @Transactional
    public void eliminaUtente(Long amministratoreId, String nomeUtente) {
        Utente amministratore = utenteRepo.findById(amministratoreId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Sessione non valida"));

        if (!superRuoloRepo.existsByRuolo_Id(amministratore.getRuolo().getId())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Solo un amministratore può eliminare utenti");
        }

        if (nomeUtente == null || nomeUtente.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Inserire il nome dell'utente da eliminare");
        }

        Utente utenteDaEliminare = utenteRepo.findByNome(nomeUtente.trim())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Utente non trovato"));

        if (utenteDaEliminare.getId().equals(amministratoreId)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Non puoi eliminare il tuo account attivo");
        }

        if (!"USER".equalsIgnoreCase(utenteDaEliminare.getRuolo().getNome())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "È possibile eliminare soltanto account USER");
        }

        eventoRepo.deleteByUtente_Id(utenteDaEliminare.getId());
        ideaRepo.deleteByUtente_Id(utenteDaEliminare.getId());
        utenteRepo.delete(utenteDaEliminare);
    }
}
