package com.bibliotech.api.emprestimos;

public record DadosAlteracaoEmprestimo(Long id, Integer data_emprestimo, Integer data_devolucao, Long livro_id, Long pessoa_id){ // Permitir a alteração do autor
}
