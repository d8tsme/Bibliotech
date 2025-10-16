package com.bibliotech.api.emprestimos;

import java.time.LocalDate;

public record DadosListagemEmprestimo(Long id, LocalDate dataEmprestimo, LocalDate dataDevolucao, Long livroId, String livro_titulo, String livro_foto, Long pessoaId, String pessoa_nome, String status) {
    public DadosListagemEmprestimo(Emprestimo dados) {
        this(
                dados.getId(),
                dados.getDataEmprestimo(),              // LocalDate
                dados.getDataDevolucao(),               // LocalDate
                dados.getLivro().getId(),               // Long livroId
                dados.getLivro().getTitulo(),           // String livro_titulo
                dados.getLivro().getFoto(),             // String livro_foto
                dados.getPessoa().getId(),              // Long pessoaId
                dados.getPessoa().getNome(),            // String pessoa_nome
                dados.getStatus()
        );
    }
}
