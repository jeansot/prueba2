import { Component,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent {
  nuevoLibro = {
    title: '',
    author: '',
    genre: '',
    publishedYear: null
  };
  @Input() generos: any[] = []; // Recibe los géneros desde el componente padre
  selectedGenero:string="";

  constructor(private http: HttpClient) {}
  agregarUnLibro() {
    const location = 'http://localhost:3900';
   
    this.http.post(location + '/api/crear', this.nuevoLibro)
    .subscribe({
      next: (data) => {
        if (data) {
          console.log("Libro agregado correctamente:", data);
          alert("Libro agregado correctamente:");
         
        }
      },
      error: (error) => {
        console.error("Error agregando el libro:", error.message);
      }
    });
  }

}
