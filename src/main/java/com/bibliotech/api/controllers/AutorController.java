package com.bibliotech.api.controllers;

import com.bibliotech.api.autores.*;
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
@RequestMapping("/autores")
public class AutorController {
    @Autowired
    private AutorRepositorio autorRepositorio;
    @Autowired
    private LivroRepositorio livroRepositorio;
    private static final Logger log = LoggerFactory.getLogger(AutorController.class);

    @PostMapping("/cadastrar")
    @Transactional
    public ResponseEntity<?> cadastrar(@RequestBody DadosCadastroAutor dados) {
        Autor a = autorRepositorio.save(new Autor(dados));
        Long id = a.getId();
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listar(){
        var lista = autorRepositorio.findAll().stream().map(DadosListagemAutor::new)
                .toList();
        return ResponseEntity.ok(lista);
    }

    @PutMapping("/alterar")
    @Transactional
    public ResponseEntity<?> alterar(@RequestBody DadosAlteracaoAutor dados) {
        if (!autorRepositorio.existsById(dados.id())){
            return ResponseEntity.notFound().build();
        }
        Autor a = autorRepositorio.getReferenceById(dados.id());
        a.atualizaInformacoes(dados);
        return ResponseEntity.ok(dados);
    }

    @GetMapping("/pode-excluir/{id}")
    public ResponseEntity<?> podeExcluir(@PathVariable Long id) {
        if(!autorRepositorio.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        
        long countLivros = livroRepositorio.findByAutorId(id).size();
        
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
        log.info("Autor.excluir called by user='{}' for id={} ", user, id);
        if(!autorRepositorio.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        
        long countLivros = livroRepositorio.findByAutorId(id).size();
        if(countLivros > 0) {
            log.warn("Tentativa de excluir autor com {} livros associados", countLivros);
            return ResponseEntity.badRequest().body("Este autor possui " + countLivros + " livro(s) associado(s) e não pode ser excluído.");
        }
        
        autorRepositorio.deleteById(id);
        log.info("Autor.excluir succeeded for id={} by user='{}'", id, user);
        return ResponseEntity.noContent().build();
    }
}
