package com.bibliotech.api.emprestimos;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmprestimoRepositorio extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByPessoaId(Long pessoaId);
}
