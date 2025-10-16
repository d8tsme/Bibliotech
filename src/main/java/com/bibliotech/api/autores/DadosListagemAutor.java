package com.bibliotech.api.autores;

public record DadosListagemAutor(Long id, String nome, String foto) {
    public DadosListagemAutor(Autor dados) {this(dados.getId(), dados.getNome(), dados.getFoto());}
}
