package com.example.demo.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Ruolo;
import com.example.demo.entity.SuperRuolo;
import com.example.demo.repository.RuoloRepo;
import com.example.demo.repository.SuperRuoloRepo;

@Component
public class SuperRuoloInitializer implements ApplicationRunner {

    private final RuoloRepo ruoloRepo;
    private final SuperRuoloRepo superRuoloRepo;

    public SuperRuoloInitializer(RuoloRepo ruoloRepo, SuperRuoloRepo superRuoloRepo) {
        this.ruoloRepo = ruoloRepo;
        this.superRuoloRepo = superRuoloRepo;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        Ruolo ruoloAdmin = ruoloRepo.findByNomeIgnoreCase("ADMIN")
                .orElseGet(() -> ruoloRepo.save(new Ruolo("ADMIN")));

        if (!superRuoloRepo.existsByRuolo_Id(ruoloAdmin.getId())) {
            superRuoloRepo.save(new SuperRuolo(ruoloAdmin));
        }
    }
}
