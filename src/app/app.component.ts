import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'interceptorApp';

  constructor(
    private usuariosService: UsuariosService
  ) {
    this.usuariosService.getUsers().subscribe(
      (data) => {
        console.log(data);
      },
      () => {
        console.log('Error en app component');
      }
    );
  }

}
