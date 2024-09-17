import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListarComponent } from '../../componentes/listar/listar/listar.component';
import { BuscarComponent } from '../../componentes/buscar/buscar/buscar.component';
import { NuevoComponent } from '../../componentes/nuevo/nuevo/nuevo.component';
import { ListarGenerosComponent } from '../../componentes/listarGeneros/listar-generos/listar-generos.component';
import { EditarComponent } from '../../componentes/editar/editar/editar.component';
import { BorrarComponent } from '../../componentes/borrar/borrar/borrar.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule, ListarComponent, BuscarComponent, NuevoComponent, ListarGenerosComponent, EditarComponent, BorrarComponent]
})

export class DashboardComponent implements OnChanges {
  libros: any = [];
  generos: any[] = [];
  title = 'frontAngular';
  currentOption = 'Listar';
  selectedLibro: any;

  constructor(private http: HttpClient) { }

  traerLibros() {
    const location = 'http://localhost:3900';
    this.http.get(location + '/api/listar')
      .subscribe({
        next: (data: any) => {
          console.log("Libros recibidos:", data);
          if (data && Array.isArray(data.libros)) {
            this.libros = data.libros; // Asegúrate de asignar solo el array de libros
            console.log("Libros asignados a this.libros:", this.libros);
          } else {
            console.error("La API no devolvió un array de libros.");
          }
        },
        error: (error) => {
          console.error("Error trayendo libros:", error);
        }
      });
  }

  traerGeneros() {
    const location = 'http://localhost:3900';
    this.http.get(location + '/api/generosLiterarios/listar')
      .subscribe({
        next: (data: any) => {
          console.log("Generos recibidos:", data); // Verifica qué devuelve la API
          if (data && Array.isArray(data)) {
            this.generos = data; // Asigna los géneros directamente si es un array
            console.log("Generos asignados a this.generos:", this.generos);
          } else if (data && data.generos && Array.isArray(data.generos)) {
            // Si la API devuelve un objeto que contiene un array en una clave "generos"
            this.generos = data.generos;
            console.log("Generos asignados a this.generos desde data.generos:", this.generos);
          } else {
            console.error("La API no devolvió un array de géneros.");
          }
        },
        error: (error) => {
          console.error("Error trayendo Generos:", error.message);
        }
      });
  }



  ngOnChanges(changes: SimpleChanges) {
    // Check if 'CurrentOption' has changed
    if (changes['CurrentOption']) {
      const previousValue = changes['CurrentOption'].previousValue;
      const currentValue = changes['CurrentOption'].currentValue;

      console.log('CurrentOption changed from', previousValue, 'to', currentValue);

      // You can now add custom logic based on the change
      if (currentValue === 'Listar') {
        console.log("trayendo libros");
    this.traerLibros();
    
      }
    }
  }

  ngOnInit() {

    console.log("trayendo libros");
    this.traerLibros();
    console.log("trayendo generos");
    this.traerGeneros();
    /*
    console.log("trayendo libro");
    this.traerUnLibro('66e7577b53cafbcab3ccae65');
    console.log("eliminando un libro");
    this.traerUnLibro('66e7577b53cafbcab3ccae65'); 
    console.log("creando un nuevo libro");
    this.agregarUnLibro("titulofront", "autorfront", "generofront"); 
    console.log("eliminando un nuevo libro");
    this.eliminarUnLibro("66e8b725cd0a056853e276fd");
    console.log("editando un nuevo libro");
    this.editarUnLibro("66e8b9b3cd0a056853e27721","editado", "editado2", "generoed", 22 );
    */


  }
  showBuscar() {
    this.currentOption = "Buscar";
  }
  showListar() {
    this.traerLibros();
    this.currentOption = "Listar";
  }
  showListarGenero() {
    this.currentOption = "ListarGenero";
  }
  showAgregar() {
    this.currentOption = "Agregar";

  }
  showListarGeneros() {
    this.currentOption = "listarGeneros";
  }
  handleSelectedLibro($event: any) {
    this.selectedLibro = $event;
    console.log($event);
  }
  handleSelectedOption($event: string) {
    this.currentOption = $event;
    console.log($event);

  }
}
