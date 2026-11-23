package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Ruolo;

public interface RuoloRepo extends JpaRepository<Ruolo, Long> {
    Optional<Ruolo> findByNomeIgnoreCase(String nome);
}