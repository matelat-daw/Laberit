import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUsers } from '../Service/Service';
import logo from '../assets/spinner.gif';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  users: any;
  isLoading = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchItems();
  }

  async fetchItems() {
    const users = await getUsers();
    console.log(users);
    this.isLoading = false;
    this.users = users;
  }

  navigateToCreate() {
    this.router.navigate(['/create']);
  }

  navigateToDetails(userId: number) {
    this.router.navigate([`/details/${userId}`]);
  }

  navigateToUpdate(userId: number) {
    this.router.navigate([`/create/${userId}`]);
  }

  navigateToDelete(userId: number) {
    this.router.navigate([`/delete/${userId}`]);
  }
}

<!-- read.component.html -->
<div *ngIf="isLoading">
  <h2>Cargando...</h2>
  <img [src]="logo" alt="Rueda Cargando">
</div>
<div *ngIf="!isLoading">
  <h2>Lista de users con Imágenes</h2>
  <br />
  <button (click)="navigateToCreate()" class="btn btn-success left">Añadir Usuario</button>
  <br /><br />
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>E-mail</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let user of users; let i = index">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.surname1 }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button (click)="navigateToDetails(user.id)" class="btn btn-primary">Detalles</button>
          &nbsp;&nbsp;
          <button (click)="navigateToUpdate(user.id)" class="btn btn-info">Actualizar</button>
          &nbsp;&nbsp;
          <button (click)="navigateToDelete(user.id)" class="btn btn-danger">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>