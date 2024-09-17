import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-listar-generos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './listar-generos.component.html',
  styleUrls: ['./listar-generos.component.css']
})
export class ListarGenerosComponent {
  @Input() generos: any[] = []; 
  selectedGenero: string = ''; 
}


