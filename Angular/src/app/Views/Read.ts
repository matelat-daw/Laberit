import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUsers } from '../Service/Service';
import logo from './../assets/spinner.gif';

@Component({
  selector: 'app-read',
  templateUrl: './Read.html',
  styleUrls: ['./Read.css']
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