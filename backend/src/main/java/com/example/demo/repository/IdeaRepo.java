package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Idea;

public interface IdeaRepo extends JpaRepository<Idea, Long> {
    List<Idea> findByUtente_Id(Long utenteId);

    Optional<Idea> findByIdAndUtente_Id(Long ideaId, Long utenteId);
}