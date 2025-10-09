package com.bibliotech.api.reservas;

import java.time.LocalDate;

public record DadosAlteracaoReserva(Long id, LocalDate dataReserva, Long livroId, Long pessoaId) {
}
