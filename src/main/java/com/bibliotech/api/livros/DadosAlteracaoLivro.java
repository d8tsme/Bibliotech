package com.bibliotech.api.livros;

public record DadosAlteracaoLivro(Long id, String titulo, String isbn, String foto, Integer anoPublicacao, Long autorId, Long generoId, int paginas, String status){ // Permitir a alteração do autor
}
