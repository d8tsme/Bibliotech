package com.bibliotech.api.controllers;

import com.bibliotech.api.autores.Autor;
import com.bibliotech.api.livros.*;
import com.bibliotech.api.autores.AutorRepositorio;
import com.bibliotech.api.generos.Genero;
import com.bibliotech.api.generos.GeneroRepositorio;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/livros")
public class LivroController {
    @Autowired
    private LivroRepositorio livroRepositorio;
    @Autowired
    private AutorRepositorio autorRepositorio;
    @Autowired
    private GeneroRepositorio generoRepositorio;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroLivro dados, Autor autor, Genero genero) {
        Autor a = autorRepositorio.getReferenceById(dados.autor_id());
        Genero g = generoRepositorio.getReferenceById(dados.genero_id());
        Livro livro = new Livro(dados.titulo(), dados.isbn(), dados.ano_publicacao(), autor, genero);
        livroRepositorio.save(livro);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemLivro>> listar(Pageable paginacao) {
        Page<DadosListagemLivro> page = livroRepositorio.findAll(paginacao).map(DadosListagemLivro::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody @Valid DadosAlteracaoLivro dados) {
        Livro livro = livroRepositorio.getReferenceById(id);

        Optional<Autor> novoAutor = Optional.empty();
        if (dados.autor_id() != null) {
            novoAutor = autorRepositorio.findById(dados.autor_id());
        }

        Optional<Genero> novoGenero = Optional.empty();
        if (dados.genero_id() != null) {
            novoGenero = generoRepositorio.findById(dados.genero_id());
        }

        livro.atualizaInformacoes(dados, novoAutor.orElse(null), novoGenero.orElse(null));
        return ResponseEntity.ok(new DadosListagemLivro(livro));
    }
}
