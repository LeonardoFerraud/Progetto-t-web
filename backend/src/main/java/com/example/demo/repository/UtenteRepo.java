package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Utente;

public interface UtenteRepo extends JpaRepository<Utente, Long> {

}