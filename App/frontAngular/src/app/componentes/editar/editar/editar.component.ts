import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  standalone: true,
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  imports: [FormsModule]
})

export class EditarComponent {
  @Input() libro: any = {};

  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.libro = navigation.extras.state['libro']; // Cargamos los datos del libro seleccionado
    }
  }
  editarLibro() {
    const location = 'http://localhost:3900/api/libros/' + this.libro._id;
    this.http.put(location, this.libro).subscribe({
      next: (response) => {
        alert('Libro editado correctamente');
      },
      error: (error) => {
        alert('Error al editar el libro: ' + error.message);
      }
    })
  }
}

      