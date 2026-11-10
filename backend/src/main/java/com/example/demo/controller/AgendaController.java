package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EventoRequest;
import com.example.demo.dto.EventoResponse;
import com.example.demo.entity.Evento;
import com.example.demo.service.AgendaService;

@RestController
@RequestMapping("/api/eventi")
public class AgendaController {

    private final AgendaService agendaService;

    public AgendaController(AgendaService agendaService) {
        this.agendaService = agendaService;
    }

    @GetMapping
    public List<EventoResponse> trovaEventi(
            @RequestParam Long utenteId,
            @RequestParam(required = false) String giorno,
            @RequestParam(required = false) Integer ora) {
        return agendaService.trovaEventiUtente(utenteId, giorno, ora)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/{eventoId}")
    public EventoResponse trovaEvento(
            @PathVariable Long eventoId,
            @RequestParam Long utenteId) {
        return toResponse(agendaService.trovaEventoPerId(eventoId, utenteId));
    }

    @PostMapping
    public ResponseEntity<EventoResponse> creaEvento(
            @RequestBody EventoRequest richiesta,
            @RequestParam Long utenteId) {
        Evento evento = agendaService.creaEvento(richiesta, utenteId);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(evento));
    }

    @PutMapping("/{eventoId}")
    public EventoResponse aggiornaEvento(
            @PathVariable Long eventoId,
            @RequestBody EventoRequest richiesta,
            @RequestParam Long utenteId) {
        return toResponse(agendaService.aggiornaEvento(eventoId, richiesta, utenteId));
    }

    @DeleteMapping("/{eventoId}")
    public ResponseEntity<Void> eliminaEvento(
            @PathVariable Long eventoId,
            @RequestParam Long utenteId) {
        agendaService.eliminaEvento(eventoId, utenteId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/cella")
    public ResponseEntity<Void> eliminaEventiCella(
            @RequestParam Long utenteId,
            @RequestParam String giorno,
            @RequestParam Integer ora) {
        agendaService.eliminaEventiCella(utenteId, giorno, ora);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> eliminaEventiUtente(@RequestParam Long utenteId) {
        agendaService.eliminaEventiUtente(utenteId);
        return ResponseEntity.noContent().build();
    }

    private EventoResponse toResponse(Evento evento) {
        return new EventoResponse(
                evento.getId(),
                evento.getTitolo(),
                evento.getGiorno(),
                evento.getOra(),
                evento.getColore()
        );
    }
}
