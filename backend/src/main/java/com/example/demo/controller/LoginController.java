package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UtenteLoginResponse;
import com.example.demo.service.LoginService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public UtenteLoginResponse login(@RequestBody LoginRequest richiesta, HttpServletRequest request) {
        UtenteLoginResponse utente = loginService.autentica(richiesta);
        HttpSession sessioneEsistente = request.getSession(false);
        if (sessioneEsistente != null) {
            sessioneEsistente.invalidate();
        }
        HttpSession sessione = request.getSession(true);
        sessione.setAttribute("utenteId", utente.id());
        return utente;
    }

    @GetMapping
    public UtenteLoginResponse sessioneAttiva(HttpSession sessione) {
        Object utenteId = sessione.getAttribute("utenteId");
        if (!(utenteId instanceof Long id)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sessione non attiva");
        }
        return loginService.trovaUtente(id);
    }

    @DeleteMapping
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        HttpSession sessione = request.getSession(false);
        if (sessione != null) {
            sessione.invalidate();
        }
        return ResponseEntity.noContent().build();
    }
}
