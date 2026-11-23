package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "super_ruolo")
public class SuperRuolo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "ruolo_id", nullable = false, unique = true)
    private Ruolo ruolo;

    protected SuperRuolo() {
    }

    public SuperRuolo(Ruolo ruolo) {
        this.ruolo = ruolo;
    }

    public Long getId() {
        return id;
    }

    public Ruolo getRuolo() {
        return ruolo;
    }
}
