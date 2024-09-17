import { Component, Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  standalone: true,
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
  imports: [CommonModule]
})
export class ListarComponent {
  @Input() libros: any = [];
  @Output() currentOption: EventEmitter<string>=new EventEmitter();
  @Output() libro:  EventEmitter<any>=new EventEmitter();
  constructor(private router: Router, private http: HttpClient) { }

  eliminarUnLibro(libro:any) {
    this.currentOption.emit("Borrar");
    this.libro.emit(libro);
    
  }
  editarUnLibro(libro: any) {
    this.currentOption.emit("Editar");
    this.libro.emit(libro);
  }
}
