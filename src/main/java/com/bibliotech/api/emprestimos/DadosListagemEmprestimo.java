package com.bibliotech.api.emprestimos;

public record DadosListagemEmprestimo(Long id, Integer data_emprestimo, Integer data_devolucao, Long livro_id, String livro_titulo, String livro_foto, Long pessoa_id, String pessoa_nome) {
    public DadosListagemEmprestimo(Emprestimo dados) {this(dados.getId(), dados.getData_emprestimo(), dados.getData_devolucao(), dados.getLivro().getTitulo(), dados.getLivro().getFoto(), dados.getPessoa().getNome());}
}
