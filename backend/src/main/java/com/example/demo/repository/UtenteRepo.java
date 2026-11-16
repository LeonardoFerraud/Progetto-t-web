package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Utente;

public interface UtenteRepo extends JpaRepository<Utente, Long> {

    Optional<Utente> findByNome(String nome);
}