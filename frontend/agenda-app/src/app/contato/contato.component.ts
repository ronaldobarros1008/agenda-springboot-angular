import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../contato.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto','id', 'nome', 'email', 'favorito']

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    /* //Teste conexão com API
    const c : Contato =  new Contato();
    c.nome = "Cicrano";
    c.email = "cicrano@gmail.com";
    c.favorito = true

    this.service.save(c).subscribe( resposta => {
      console.log(resposta);
    })
    */
    this.montarFormulario();
    this.listarContatos();    
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]]
    })
  }

  favoritar(contato: Contato){
    this.service.favourite(contato).subscribe(resposta => {
      contato.favorito = !contato.favorito;
    })
  }

  listarContatos(){
    this.service.list().subscribe(response => {
      this.contatos = response;
    })
  }

  submit() {
    const formValues = this.formulario.value;
    const contato : Contato = new Contato(formValues.nome, formValues.email)
    this.service.save(contato).subscribe( resposta => {
      //console.log(this.contatos)
      let lista : Contato[] = [...this.contatos, resposta]
      this.contatos = lista;
    })
  }
  
  uploadFoto(event, contato){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
        .upload(contato, formData)
        .subscribe( resposta => this.listarContatos());
    }
  }
}
