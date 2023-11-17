export class Search {
  numero: string;
  initialDate: Date;
  finalDate: Date;
  nProposta: string;
  categoria: string;
  gestorRemetente: string;
  gestorDestinatario: string;
  done: boolean;

  constructor() {
    this.numero = '';
    this.initialDate = new Date();
    this.finalDate = new Date();
    this.nProposta = '';
    this.categoria = '';
    this.gestorRemetente = '';
    this.gestorDestinatario = '';
    this.done = false;
  }
}
