package com.example.demo.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpSession;

@Component
public class SessioneUtente {

    public Long richiediIdUtente(HttpSession sessione) {
        Object utenteId = sessione.getAttribute("utenteId");
        if (utenteId instanceof Long id) {
            return id;
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Effettuare il login");
    }
}
