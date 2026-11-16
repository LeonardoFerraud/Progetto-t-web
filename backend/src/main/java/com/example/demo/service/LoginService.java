package com.example.demo.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UtenteLoginResponse;
import com.example.demo.entity.Utente;
import com.example.demo.repository.UtenteRepo;

@Service
public class LoginService {

    private final UtenteRepo utenteRepo;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UtenteRepo utenteRepo, PasswordEncoder passwordEncoder) {
        this.utenteRepo = utenteRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public UtenteLoginResponse autentica(LoginRequest richiesta) {
        if (richiesta == null || richiesta.username() == null || richiesta.username().isBlank()
                || richiesta.password() == null || richiesta.password().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username e password sono obbligatori");
        }

        Utente utente = utenteRepo.findByNome(richiesta.username())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenziali non valide"));

        if (!passwordEncoder.matches(richiesta.password(), utente.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenziali non valide");
        }

        return toResponse(utente);
    }

    public UtenteLoginResponse trovaUtente(Long utenteId) {
        Utente utente = utenteRepo.findById(utenteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sessione non valida"));
        return toResponse(utente);
    }

    private UtenteLoginResponse toResponse(Utente utente) {
        return new UtenteLoginResponse(
                utente.getId(),
                utente.getNome(),
                utente.getRuolo().getNome()
        );
    }
}
