package com.rsb.agendaapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.rsb.agendaapi.model.entity.Contato;
import com.rsb.agendaapi.model.repository.ContatoRepository;

@SpringBootApplication
public class AgendaApiApplication {
	
	/*//para testar a inserção dos contatos no banco de dados
	@Bean
	public CommandLineRunner commandLineRunner(
			@Autowired ContatoRepository repository) {
		return args -> {
			Contato contato = new Contato();
			contato.setNome("Fulano");
			contato.setEmail("fulano@gmail.com");
			contato.setFavorito(false);
			repository.save(contato);
		};
	}
	*/

	public static void main(String[] args) {
		SpringApplication.run(AgendaApiApplication.class, args);
	}

}
