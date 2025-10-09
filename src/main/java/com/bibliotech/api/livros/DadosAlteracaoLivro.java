package com.bibliotech.api.livros;

public record DadosAlteracaoLivro(Long id, String titulo, String isbn, String foto, Integer anoPublicacao, Long autorId, Long generoId){ // Permitir a alteração do autor
}
