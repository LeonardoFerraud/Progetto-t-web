package com.example.demo.dto;

public record IdeaRequest(
        String titolo,
        String descrizione,
        Long categoriaId,
        Integer budget,
        String colore
) {
}
