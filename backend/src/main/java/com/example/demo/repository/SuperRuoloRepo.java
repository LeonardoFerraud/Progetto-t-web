package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.SuperRuolo;

public interface SuperRuoloRepo extends JpaRepository<SuperRuolo, Long> {
    boolean existsByRuolo_Id(Long ruoloId);
}
