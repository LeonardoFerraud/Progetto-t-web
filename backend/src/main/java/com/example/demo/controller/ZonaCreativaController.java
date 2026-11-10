package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CategoriaResponse;
import com.example.demo.dto.IdeaRequest;
import com.example.demo.dto.IdeaResponse;
import com.example.demo.entity.Categoria;
import com.example.demo.entity.Idea;
import com.example.demo.service.ZonaCreativaService;

@RestController
@RequestMapping("/api")
public class ZonaCreativaController {

    private final ZonaCreativaService zonaCreativaService;

    public ZonaCreativaController(ZonaCreativaService zonaCreativaService) {
        this.zonaCreativaService = zonaCreativaService;
    }

    @GetMapping("/idee")
    public List<IdeaResponse> trovaIdee(@RequestParam Long utenteId) {
        return zonaCreativaService.trovaIdeeUtente(utenteId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/idee/{ideaId}")
    public IdeaResponse trovaIdea(
            @PathVariable Long ideaId,
            @RequestParam Long utenteId) {
        return toResponse(zonaCreativaService.trovaIdeaUtente(ideaId, utenteId));
    }

    @PostMapping("/idee")
    public ResponseEntity<IdeaResponse> creaIdea(
            @RequestBody IdeaRequest richiesta,
            @RequestParam Long utenteId) {
        Idea idea = zonaCreativaService.creaIdea(richiesta, utenteId);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(idea));
    }

    @PutMapping("/idee/{ideaId}")
    public IdeaResponse aggiornaIdea(
            @PathVariable Long ideaId,
            @RequestBody IdeaRequest richiesta,
            @RequestParam Long utenteId) {
        return toResponse(zonaCreativaService.aggiornaIdea(ideaId, richiesta, utenteId));
    }

    @DeleteMapping("/idee/{ideaId}")
    public ResponseEntity<Void> eliminaIdea(
            @PathVariable Long ideaId,
            @RequestParam Long utenteId) {
        zonaCreativaService.eliminaIdea(ideaId, utenteId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categorie")
    public List<CategoriaResponse> trovaCategorie() {
        return zonaCreativaService.trovaCategorie()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private IdeaResponse toResponse(Idea idea) {
        Categoria categoria = idea.getCategoria();
        return new IdeaResponse(
                idea.getId(),
                idea.getTitolo(),
                idea.getDescrizione(),
                categoria == null ? null : categoria.getId(),
                categoria == null ? null : categoria.getNome(),
                idea.getBudget(),
                idea.getColore()
        );
    }

    private CategoriaResponse toResponse(Categoria categoria) {
        return new CategoriaResponse(categoria.getId(), categoria.getNome());
    }
}
