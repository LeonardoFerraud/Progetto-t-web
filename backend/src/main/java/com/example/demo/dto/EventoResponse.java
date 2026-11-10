package com.example.demo.dto;

public record EventoResponse(
    Long id,
    String titolo,
    String giorno,
    Integer ora,
    String colore
) {
}

// Un record Java raccoglie i dati della risposta e genera automaticamente i metodi di accesso.