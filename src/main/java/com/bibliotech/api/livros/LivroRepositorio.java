package com.bibliotech.api.livros;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivroRepositorio extends JpaRepository<Livro, Long> {
    List<Livro> findByAutorId(Long autorId);
    List<Livro> findByStatus(String status);
}
