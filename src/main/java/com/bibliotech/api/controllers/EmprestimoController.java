package com.bibliotech.api.controllers;

import com.bibliotech.api.livros.Livro;
import com.bibliotech.api.emprestimos.*;
import com.bibliotech.api.livros.LivroRepositorio;
import com.bibliotech.api.pessoas.Pessoa;
import com.bibliotech.api.pessoas.PessoaRepositorio;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {
    @Autowired
    private EmprestimoRepositorio emprestimoRepositorio;
    @Autowired
    private LivroRepositorio livroRepositorio;
    @Autowired
    private PessoaRepositorio pessoaRepositorio;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroEmprestimo dados) {
        Livro livro = livroRepositorio.getReferenceById(dados.livroId());
        Pessoa pessoa = pessoaRepositorio.getReferenceById(dados.pessoaId());
        Emprestimo emprestimo = new Emprestimo(dados, livro, pessoa);
        emprestimoRepositorio.save(emprestimo);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemEmprestimo>> listar(Pageable paginacao) {
        Page<DadosListagemEmprestimo> page = emprestimoRepositorio.findAll(paginacao).map(DadosListagemEmprestimo::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody @Valid DadosAlteracaoEmprestimo dados) {
        Emprestimo emprestimo = emprestimoRepositorio.getReferenceById(id);

        Optional<Livro> novoLivro = Optional.empty();
        if (dados.livroId() != null) {
            novoLivro = livroRepositorio.findById(dados.livroId());
        }

        Optional<Pessoa> novoPessoa = Optional.empty();
        if (dados.pessoaId() != null) {
            novoPessoa = pessoaRepositorio.findById(dados.pessoaId());
        }

        emprestimo.atualizaInformacoes(dados, novoLivro.orElse(null), novoPessoa.orElse(null));
        return ResponseEntity.ok(new DadosListagemEmprestimo(emprestimo));
    }
}
