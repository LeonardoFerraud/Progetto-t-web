package com.example.demo.dto;

public record IdeaResponse(
        Long id,
        String titolo,
        String descrizione,
        Long categoriaId,
        String categoria,
        Integer budget,
        String colore
) {
}
