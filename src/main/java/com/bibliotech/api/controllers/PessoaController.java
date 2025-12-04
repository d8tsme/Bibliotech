package com.bibliotech.api.controllers;

import com.bibliotech.api.pessoas.*;
import com.bibliotech.api.emprestimos.EmprestimoRepositorio;
import com.bibliotech.api.reservas.ReservaRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

//Annotations
@RestController
@RequestMapping("/pessoas")
public class PessoaController {
    @Autowired
    private PessoaRepositorio pessoaRepositorio;
    @Autowired
    private EmprestimoRepositorio emprestimoRepositorio;
    @Autowired
    private ReservaRepositorio reservaRepositorio;
    private static final Logger log = LoggerFactory.getLogger(PessoaController.class);

    @PostMapping("/cadastrar")
    @Transactional
    public ResponseEntity<?> cadastrar(@RequestBody DadosCadastroPessoa dados) {
        Pessoa a = pessoaRepositorio.save(new Pessoa(dados));
        Long id = a.getId();
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/{id}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listar(){
        var lista = pessoaRepositorio.findAll().stream().map(DadosListagemPessoa::new)
                .toList();
        return ResponseEntity.ok(lista);
    }

    @PutMapping("/alterar")
    @Transactional
    public ResponseEntity<?> alterar(@RequestBody DadosAlteracaoPessoa dados) {
        if (!pessoaRepositorio.existsById(dados.id())){
            return ResponseEntity.notFound().build();
        }
        Pessoa a = pessoaRepositorio.getReferenceById(dados.id());
        a.atualizaInformacoes(dados);
        return ResponseEntity.ok(dados);
    }

    @GetMapping("/pode-excluir/{id}")
    public ResponseEntity<?> podeExcluir(@PathVariable Long id) {
        if(!pessoaRepositorio.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        
        long countEmprestimos = emprestimoRepositorio.findByPessoaId(id).size();
        long countReservas = reservaRepositorio.findByPessoaId(id).size();
        long total = countEmprestimos + countReservas;
        
        Map<String, Object> response = new HashMap<>();
        response.put("podeExcluir", total == 0);
        response.put("associacoes", total);
        response.put("emprestimos", countEmprestimos);
        response.put("reservas", countReservas);
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/excluir/{id}")
    @Transactional
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = auth != null && auth.isAuthenticated() ? auth.getName() : "anonymous";
        log.info("Pessoa.excluir called by user='{}' for id={}", user, id);
        
        if(!pessoaRepositorio.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        
        long countEmprestimos = emprestimoRepositorio.findByPessoaId(id).size();
        long countReservas = reservaRepositorio.findByPessoaId(id).size();
        long total = countEmprestimos + countReservas;
        
        if(total > 0) {
            log.warn("Tentativa de excluir pessoa com {} empréstimos e {} reservas", countEmprestimos, countReservas);
            return ResponseEntity.badRequest().body("Esta pessoa possui " + countEmprestimos + " empréstimo(s) e " + countReservas + " reserva(s) associado(s) e não pode ser excluída.");
        }
        
        pessoaRepositorio.deleteById(id);
        log.info("Pessoa.excluir succeeded for id={} by user='{}'", id, user);
        return ResponseEntity.noContent().build();
    }
}
