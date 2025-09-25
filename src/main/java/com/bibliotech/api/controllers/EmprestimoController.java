package com.bibliotech.api.controllers;

import com.bibliotech.api.livroes.Livro;
import com.bibliotech.api.emprestimos.*;
import com.bibliotech.api.livroes.LivroRepositorio;
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
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroEmprestimo dados, Livro livro, Pessoa pessoa) {
        Livro a = livroRepositorio.getReferenceById(dados.livro_id());
        Pessoa g = pessoaRepositorio.getReferenceById(dados.pessoa_id());
        Emprestimo emprestimo = new Emprestimo(dados.titulo(), dados.isbn(), dados.ano_publicacao(), livro, pessoa);
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
        if (dados.livro_id() != null) {
            novoLivro = livroRepositorio.findById(dados.livro_id());
        }

        Optional<Pessoa> novoPessoa = Optional.empty();
        if (dados.pessoa_id() != null) {
            novoPessoa = pessoaRepositorio.findById(dados.pessoa_id());
        }

        emprestimo.atualizaInformacoes(dados, novoLivro.orElse(null), novoPessoa.orElse(null));
        return ResponseEntity.ok(new DadosListagemEmprestimo(emprestimo));
    }
}
