package com.bibliotech.api.reservas;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservaRepositorio extends JpaRepository<Reserva, Long> {
    List<Reserva> findByPessoaId(Long pessoaId);
}
