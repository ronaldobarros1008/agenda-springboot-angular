import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../contato.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto','id', 'nome', 'email', 'favorito'];

  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions : number[] = [10];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
    this.listarContatos(this.pagina, this.tamanho);   
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

  listarContatos( pagina = 0, tamanho = 10 ){
    this.service.list(pagina, tamanho).subscribe(response => {
      this.contatos = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    })
  }

  submit() {
    const formValues = this.formulario.value;
    const contato : Contato = new Contato(formValues.nome, formValues.email)
    this.service.save(contato).subscribe( resposta => {
      //console.log(this.contatos)
      let lista : Contato[] = [...this.contatos, resposta]
      this.listarContatos();
      this.snackBar.open('O contato foi adicionado!','Sucesso!', {
        duration: 2000
      })
      this.formulario.reset()
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

  visualizarContato(contato: Contato){
    this.dialog.open( ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    } )
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex
    this.listarContatos(this.pagina, this.tamanho)
  }
}
