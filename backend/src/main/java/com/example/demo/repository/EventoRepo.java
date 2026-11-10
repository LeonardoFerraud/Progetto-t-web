package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Evento;

public interface EventoRepo extends JpaRepository<Evento, Long> {
    List<Evento> findByUtente_Id(Long utenteId);

    void deleteByUtente_IdAndGiornoAndOra(Long utenteId, String giorno, Integer ora);

    void deleteByUtente_Id(Long utenteId);
}