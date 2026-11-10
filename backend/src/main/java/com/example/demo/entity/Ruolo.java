package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity //crea o cerca una tabella 'Ruolo' nel database
public class Ruolo {

    @Id //crea un identificativo univoco 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true) //il ruolo deve avere per forza un nome (nullable)
    private String nome; //può avere valore ADMIN o USER

    protected Ruolo() {
    }

    public Ruolo(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}