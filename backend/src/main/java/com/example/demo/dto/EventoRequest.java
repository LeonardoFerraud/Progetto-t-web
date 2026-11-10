package com.example.demo.dto;

public record EventoRequest(
    String titolo,
    String giorno,
    Integer ora,
    String colore
) {
}