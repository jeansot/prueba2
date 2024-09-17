import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  libro:any;
  idLibro:any;
  constructor(private http: HttpClient) {}
  traerUnLibro() {
    const location = 'http://localhost:3900';
    this.http.get(location + '/api/libros/'+this.idLibro)
      .subscribe({
        next: (data) => {
          if (data) {
            this.libro = data; 
          }
        },
        error: (error) => {
          console.error("Error trayendo libros:", error);
        }
      });
  }
}
