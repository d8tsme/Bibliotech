package com.bibliotech.api.emprestimos;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprestimoRepositorio extends JpaRepository<Emprestimo, Long> {
}
