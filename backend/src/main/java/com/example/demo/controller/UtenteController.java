package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.GestioneUtentiService;
import com.example.demo.service.SessioneUtente;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/utenti")
public class UtenteController {

    private final GestioneUtentiService gestioneUtentiService;
    private final SessioneUtente sessioneUtente;

    public UtenteController(
            GestioneUtentiService gestioneUtentiService,
            SessioneUtente sessioneUtente) {
        this.gestioneUtentiService = gestioneUtentiService;
        this.sessioneUtente = sessioneUtente;
    }

    @DeleteMapping
    public ResponseEntity<Void> eliminaUtente(
            @RequestParam String nome,
            HttpSession sessione) {
        Long amministratoreId = sessioneUtente.richiediIdUtente(sessione);
        gestioneUtentiService.eliminaUtente(amministratoreId, nome);
        return ResponseEntity.noContent().build();
    }
}
