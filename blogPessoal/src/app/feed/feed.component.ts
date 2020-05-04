import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit { // tudo que estiver dentro da class é a minha lógica

  key = 'data'
  reverse = true


  // Criamos uma variável listaPostagem que recebe o objeto Postagem, como eu quero varias postagens eu coloco um Array de objetos []
  listaPostagens: Postagem[]
  postagem: Postagem = new Postagem

  // Tudo que estiver dentro de construtor é uma injeção de dependência
  constructor(private postagemService: PostagemService) { }

  // tudo que estiver dentro do método ngOnInit é aquilo que vais ser carregado quando eu abrir a aplicação
  ngOnInit(){
    this.findallPostagens()

    window.scroll(0,0)// isso fará com que ao clicar em um botão que direcione ao outra página ele carregue e fique no começo dela
  }

  findallPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => { 
      this.listaPostagens = resp
    })  
  }

  publicar(){
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) =>{
      this.postagem = resp;
      location.assign('/feed') // com isso ele vaia tualizar automaticamente
    })
  }



}
