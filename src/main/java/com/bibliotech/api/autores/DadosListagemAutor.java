package com.bibliotech.api.autores;

public record DadosListagemAutor(Long id, String nome) {
    public DadosListagemAutor(Autor dados) {this(dados.nome());}
}
