package com.bibliotech.api.livros;

public record DadosAlteracaoLivro(Long id, String titulo, String isbn, String foto, Integer ano_publicacao, Long autor_id, Long genero_id){ // Permitir a alteração do autor
}
