package com.rsb.agendaapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rsb.agendaapi.model.entity.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Integer>{

}
