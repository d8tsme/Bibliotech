package com.bibliotech.api.controllers;

import com.bibliotech.api.livros.Livro;
import com.bibliotech.api.reservas.*;
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
@RequestMapping("/reservas")
public class ReservaController {
    @Autowired
    private ReservaRepositorio reservaRepositorio;
    @Autowired
    private LivroRepositorio livroRepositorio;
    @Autowired
    private PessoaRepositorio pessoaRepositorio;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroReserva dados) {
        Livro livro = livroRepositorio.getReferenceById(dados.livroId());
        Pessoa pessoa = pessoaRepositorio.getReferenceById(dados.pessoaId());
        Reserva reserva = new Reserva(dados, livro, pessoa);
        reservaRepositorio.save(reserva);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemReserva>> listar(Pageable paginacao) {
        Page<DadosListagemReserva> page = reservaRepositorio.findAll(paginacao).map(DadosListagemReserva::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizar(@PathVariable Long id, @RequestBody @Valid DadosAlteracaoReserva dados) {
        Reserva reserva = reservaRepositorio.getReferenceById(id);

        Optional<Livro> novoLivro = Optional.empty();
        if (dados.livroId() != null) {
            novoLivro = livroRepositorio.findById(dados.livroId());
        }

        Optional<Pessoa> novoPessoa = Optional.empty();
        if (dados.pessoaId() != null) {
            novoPessoa = pessoaRepositorio.findById(dados.pessoaId());
        }

        reserva.atualizaInformacoes(dados, novoLivro.orElse(null), novoPessoa.orElse(null));
        return ResponseEntity.ok(new DadosListagemReserva(reserva));
    }
}
