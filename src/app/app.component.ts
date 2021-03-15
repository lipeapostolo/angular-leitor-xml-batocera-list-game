import { Component, OnInit } from "@angular/core";
import * as converter from "xml-js";
import { GameService } from "./Services/Services-base";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  outputXml: any;
  inputXml: any;
  plataformaImportada: PlataForma;

  constructor(private gameService: GameService) {}

  selectFile(event) {
    console.log(event.target.files[0].name);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      let xml = e.target.result;
      this.inputXml = xml;
      let result1 = converter.xml2json(xml, { compact: true, spaces: 2 });

      const JSONData = JSON.parse(result1);
      let listaGames = JSONData.gameList.game;
      this.plataformaImportada = new PlataForma("PlayStaion", listaGames);
      //this.outputXml = JSON.stringify(this.outputXml);
      this.gameService.create(this.plataformaImportada.lista[0]).then();
    };
    reader.readAsText(event.target.files[0]);
  }

  ngOnInit() {}
  onSave() {
    // const str = JSON.stringify(this.formGroup.value);
    // this.outputXml = converter.json2xml(str, {compact: true,spaces: 4});
  }
}
export class PlataForma {
  id: string;
  lista: Game[] = [];
  nome: string;

  constructor(nome: string, listaGame: any[]) {
    this.nome = nome;
    this.montalista(listaGame);
  }

  private montalista(listaGame: any[]) {
    listaGame.forEach(g => {
      this.lista.push(
        new Game(
          this.verificaCampo(g.name),
          this.verificaCampo(g.path),
          this.verificaCampo(g.publisher),
          this.verificaCampo(g.genre),
          this.verificaCampo(g.players)
        )
      );
    });
  }

  private verificaCampo(campo: any): string {
    return campo && campo._text ? campo._text : "Não informado";
  }
}

export class Game {
  id: string;
  nome: string;
  caminho: string; //path
  publicadoPor: string; //publisher
  genero: string[] = []; //genre
  qtdJogadores: string; //players

  constructor(
    nome: string,
    caminho: string,
    publicadoPor: string,
    genero: string,
    qtdJogadores: string
  ) {
    this.nome = nome;
    this.caminho = caminho;
    this.publicadoPor = publicadoPor;
    this.genero = this.quebraString(genero);
    this.qtdJogadores = qtdJogadores;
  }

  private quebraString(texto: string, quebraTexto: string = ","): string[] {
    return texto.trim().split(quebraTexto);
  }
}
