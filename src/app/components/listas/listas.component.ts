import { Component, Input, OnInit } from '@angular/core';
import { DeseosService } from './../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from './../../models/lista.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {

    if ( this.terminada ) {
      this.router.navigateByUrl(`tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`tabs/tab1/agregar/${ lista.id }`);
    }

  }

  borrarLista( lista: Lista ) {
    this.deseosService.borrarLista( lista );
  }


  async editarTitulo( lista: Lista) {
    // console.log(lista);
    
    const alert = await this.alertCtrl.create({
      header: 'Editar titulo',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Reenombrar lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar')
          }
        },
        {
          text: 'Actualizar titulo',
          handler: ( data ) => {
            console.log('El cambio es:',data);
            
            if ( data.titulo.length === 0 ) {
              return;
            } 

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();

          }
        }
      ]
    });

    await alert.present();


  }

}
