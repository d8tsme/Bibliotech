package com.bibliotech.api.emprestimos;

import java.time.LocalDate;

public record DadosAlteracaoEmprestimo(Long id, LocalDate dataEmprestimo, LocalDate dataDevolucao, Long livroId, Long pessoaId){ // Permitir a alteração do autor
}
