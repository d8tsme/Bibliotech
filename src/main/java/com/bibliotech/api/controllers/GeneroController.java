package com.bibliotech.api.controllers;

import com.bibliotech.api.generos.*;
import com.bibliotech.api.livros.LivroRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

//Annotations
@RestController
@RequestMapping("/generos")
public class GeneroController {
    @Autowired
    private GeneroRepositorio generoRepositorio;
    @Autowired
    private LivroRepositorio livroRepositorio;
    private static final Logger log = LoggerFactory.getLogger(GeneroController.class);

    @PostMapping("/cadastrar")
    @Transactional
    public ResponseEntity<?> cadastrar(@RequestBody DadosCadastroGenero dados) {
        Genero a = generoRepositorio.save(new Genero(dados));
        Long id = a.getId();
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listar(){
        var lista = generoRepositorio.findAll().stream().map(DadosListagemGenero::new)
                .toList();
        return ResponseEntity.ok(lista);
    }

    @PutMapping("/alterar")
    @Transactional
    public ResponseEntity<?> alterar(@RequestBody DadosAlteracaoGenero dados) {
        if (!generoRepositorio.existsById(dados.id())){
            return ResponseEntity.notFound().build();
        }
        Genero a = generoRepositorio.getReferenceById(dados.id());
        a.atualizaInformacoes(dados);
        return ResponseEntity.ok(dados);
    }

    @GetMapping("/pode-excluir/{id}")
    public ResponseEntity<?> podeExcluir(@PathVariable Long id) {
        if(!generoRepositorio.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        
        long countLivros = generoRepositorio.findById(id).map(genero -> 
            livroRepositorio.findAll().stream()
                .filter(l -> l.getGenero().getId().equals(id))
                .count()
        ).orElse(0L);
        
        Map<String, Object> response = new HashMap<>();
        response.put("podeExcluir", countLivros == 0);
        response.put("associacoes", countLivros);
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/excluir/{id}")
    @Transactional
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth != null && auth.isAuthenticated() ? auth.getName() : "anonymous";
        log.info("Genero.excluir called by user='{}' for id={}", user, id);
        
        if(!generoRepositorio.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        
        long countLivros = generoRepositorio.findById(id).map(genero -> 
            livroRepositorio.findAll().stream()
                .filter(l -> l.getGenero().getId().equals(id))
                .count()
        ).orElse(0L);
        
        if(countLivros > 0) {
            log.warn("Tentativa de excluir gênero com {} livros associados", countLivros);
            return ResponseEntity.badRequest().body("Este gênero possui " + countLivros + " livro(s) associado(s) e não pode ser excluído.");
        }
        
        generoRepositorio.deleteById(id);
        log.info("Genero.excluir succeeded for id={} by user='{}'", id, user);
        return ResponseEntity.noContent().build();
    }
}
