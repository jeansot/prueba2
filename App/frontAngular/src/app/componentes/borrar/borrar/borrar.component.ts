import { Component, Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-borrar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './borrar.component.html',
  styleUrl: './borrar.component.css'
})
export class BorrarComponent {
  @Input() libro: any = {};
  @Output() currentOption: EventEmitter<string>=new EventEmitter();
  

  constructor( private http: HttpClient) {

  }
  cancelar() {
    this.currentOption.emit("Listar");
    console.log("Regresando");
        
  }
  borrar() {
    const location = 'http://localhost:3900';
    this.http.delete(location + '/api/libros/' + this.libro._id)
      .subscribe({
        next: (data) => {
          if (data) {
            console.log("Libro eliminado correctamente:", data);
            alert("Libro eliminado correctamente:");
            console.log("Regresando");
            this.currentOption.emit("Listar");
   
          }
        },
        error: (error) => {
          console.error("Error eliminando el libro:", error.message);
        }
      });
  } 
}
