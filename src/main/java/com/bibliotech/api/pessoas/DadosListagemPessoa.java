package com.bibliotech.api.pessoas;

public record DadosListagemPessoa(Long id, String nome, String email, int telefone) {
    public DadosListagemPessoa(Pessoa dados) {this(dados.getNome(), dados.getEmail(), dados.getTelefone());}
}
