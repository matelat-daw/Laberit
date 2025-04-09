import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-details',
  template: `
    <div>
      <h1>Usuario de: {{ user }}</h1>
      <ul class="none">
        <li *ngFor="let user of users">
          {{ user.name }} {{ user.surname1 }} {{ user.email }}
        </li>
      </ul>
    </div>
  `
})
export class DetailsComponent implements OnInit {
  users: any[] = [];
  user: string = '';
  id: string | null = '';

  constructor(private route: ActivatedRoute, private usersService: UsersService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fetchUsers();
    }
  }

  async fetchUsers() {
    const users = await this.usersService.getUsers();
    const userId = users.find((user) => user.id === this.id);
    if (userId) {
      this.user = userId.name;
      this.users = [userId]; // Para poder usar *ngFor hay que meter el JSON en un array.
    } else {
      console.error('Usuario no Encontrado.');
    }
  }
}