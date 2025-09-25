package com.bibliotech.api.controllers;

import com.bibliotech.api.autores.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

//Annotations
@RestController
@RequestMapping("/autores")
public class AutorController {
    @Autowired
    private AutorRepositorio autorRepositorio;

    @PostMapping("/inserir")
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

    @DeleteMapping("/excluir/{id}")
    @Transactional
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        if(!autorRepositorio.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        autorRepositorio.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
