import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [];

  constructor(private http: HttpClient) {}

  // Obtener Todos los Usuarios.
  getUsers() {
    return this.http.get("https://192.168.83.41/api/Account/Users").pipe(
      catchError(error => {
        toast(2, "Error de Conexión", "Lo Siento No hay Conexión con el Servidor. Asegurate de que el Servidor está en Ejecución. Error: " + error);
        return of([]);
      })
    );
  }

  getImages(jsonData) {
    jsonData.forEach(img => this.blobConverter(img.profileImage));
    return jsonData;
  }

  async blobConverter(urlImg) {
    const response = await fetch(urlImg);
    const blobImg = await response.blob();
    this.createElements(blobImg);
  }

  imageArray = [];
  index = 0;
  createElements(blobImg) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(blobImg);
    img.alt = "Foto de Perfil";
    this.imageArray[this.index] = img;
    console.log("Imagen: " + this.index + " es: " + this.imageArray[this.index]);
    this.index++;
    return this.imageArray;
  }

  // Agregar/Modificar un Dato.
  createUser(id, newUser) {
    if (id) {
      const userIndex = this.users.findIndex(user => user.id == id);
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...newUser };
      }
      return this.users;
    } else {
      newUser.id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
      this.users.push(newUser);
      return this.users;
    }
  }

  // Eliminar un Dato.
  deleteUser(id) {
    this.users = this.users.filter(user => user.id !== id);
  }

  getUser(id) {
    return this.users.find(user => user.id === parseInt(id));
  }
}