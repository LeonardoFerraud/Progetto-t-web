package com.example.demo.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.dto.IdeaRequest;
import com.example.demo.entity.Categoria;
import com.example.demo.entity.Idea;
import com.example.demo.entity.Utente;
import com.example.demo.repository.CategoriaRepo;
import com.example.demo.repository.IdeaRepo;
import com.example.demo.repository.UtenteRepo;

@Service
public class ZonaCreativaService {

    private final IdeaRepo ideaRepo;
    private final CategoriaRepo categoriaRepo;
    private final UtenteRepo utenteRepo;

    public ZonaCreativaService(IdeaRepo ideaRepo, CategoriaRepo categoriaRepo, UtenteRepo utenteRepo) {
        this.ideaRepo = ideaRepo;
        this.categoriaRepo = categoriaRepo;
        this.utenteRepo = utenteRepo;
    }

    public List<Idea> trovaIdeeUtente(Long utenteId) {
        verificaUtente(utenteId);
        return ideaRepo.findByUtente_Id(utenteId);
    }

    public Idea trovaIdeaUtente(Long ideaId, Long utenteId) {
        verificaUtente(utenteId);
        return ideaRepo.findByIdAndUtente_Id(ideaId, utenteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Idea non trovata"));
    }

    public Idea creaIdea(IdeaRequest richiesta, Long utenteId) {
        valida(richiesta);
        Utente utente = verificaUtente(utenteId);
        Categoria categoria = trovaCategoria(richiesta.categoriaId());
        Idea idea = new Idea(
                richiesta.titolo(),
                richiesta.descrizione(),
                categoria,
                richiesta.budget(),
                richiesta.colore(),
                utente
        );
        return ideaRepo.save(idea);
    }

    public Idea aggiornaIdea(Long ideaId, IdeaRequest richiesta, Long utenteId) {
        valida(richiesta);
        Idea idea = trovaIdeaUtente(ideaId, utenteId);
        idea.setTitolo(richiesta.titolo());
        idea.setDescrizione(richiesta.descrizione());
        idea.setCategoria(trovaCategoria(richiesta.categoriaId()));
        idea.setBudget(richiesta.budget());
        idea.setColore(richiesta.colore());
        return ideaRepo.save(idea);
    }

    @Transactional
    public void eliminaIdea(Long ideaId, Long utenteId) {
        ideaRepo.delete(trovaIdeaUtente(ideaId, utenteId));
    }

    public List<Categoria> trovaCategorie() {
        return categoriaRepo.findAll();
    }

    private Utente verificaUtente(Long utenteId) {
        return utenteRepo.findById(utenteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utente non trovato"));
    }

    private Categoria trovaCategoria(Long categoriaId) {
        if (categoriaId == null) {
            return null;
        }
        return categoriaRepo.findById(categoriaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria non trovata"));
    }

    private void valida(IdeaRequest richiesta) {
        if (richiesta == null || richiesta.titolo() == null || richiesta.titolo().isBlank()
                || richiesta.colore() == null || richiesta.colore().isBlank()
                || (richiesta.budget() != null && richiesta.budget() < 0)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Dati idea non validi");
        }
    }
}