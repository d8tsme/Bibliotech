package com.bibliotech.api.livros;

import com.bibliotech.api.autores.Autor;

public record DadosListagemLivro(Long id, String titulo, String foto, String isbn, int anoPublicacao, Long generoId, String generoNome, Long autorId, String autorNome) {
    public DadosListagemLivro(Livro livro) {
        this(livro.getId(), livro.getTitulo(), livro.getFoto(), livro.getIsbn(), livro.getAnoPublicacao(), livro.getGenero().getId(), livro.getGenero().getNome(), livro.getAutor().getId(), livro.getAutor().getNome());}
}
