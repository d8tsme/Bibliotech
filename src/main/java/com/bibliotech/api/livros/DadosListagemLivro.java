package com.bibliotech.api.livros;

import com.bibliotech.api.autores.Autor;

public record DadosListagemLivro(Long id, String titulo, String foto, String isbn, int ano_publicacao, Long genero_id, String genero_nome, Long autor_id, String autor_nome) {
    public DadosListagemLivro(Livro livro) {
        this(livro.getId(), livro.getTitulo(), livro.getFoto(), livro.getIsbn(), livro.getAno_publicacao(), livro.getGenero().getId(), livro.getGenero().getNome(), livro.getAutor().getId(), livro.getAutor().getNome());}
}
