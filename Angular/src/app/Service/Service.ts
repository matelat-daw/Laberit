import toast from './js/script.js';

interface User {
    id: number;
    name: string;
    surname1: string;
    email: string;
    profileImage: string;
}

let users: User[] = [];

// Obtener Todos los Usuarios.
export const getUsers = async (): Promise<User[] | undefined> => {
    try {
        return await fetch("https://88.24.25.50/api/Account/Users").then(respuesta => respuesta.json())
        // return await fetch("https://localhost:7227/api/Account/Users").then(respuesta => respuesta.json())
        .catch(respuesta => toast(2, "Error de Conexión", "Lo Siento No hay Conexión con el Servidor. Asegurate de que el Servidor está en Ejecución. Error: " + respuesta))
        // .then(jsonData => getImages(jsonData));
    } catch (error) {
      console.error('Error al Intentar Obtener los Usuarios:', error);
    }
};

export function getImages(jsonData: User[]): User[] {
    jsonData.map(img => blobConverter(img.profileImage));
    return jsonData;
}

async function blobConverter(urlImg: string): Promise<void> {
    let blobImg: Blob;
    await fetch(urlImg)
    .then(res => res.blob())
    .then(blob => blobImg = blob);
    createElements(blobImg);
}

let imageArray: HTMLImageElement[] = [];
let index = 0;

function createElements(blobImg: Blob): HTMLImageElement[] {
    let img = document.createElement("img");
    img.src = URL.createObjectURL(blobImg);
    img.alt = "Foto de Perfil";
    imageArray[index] = img;
    console.log("Imagen: " + index + " es: " + imageArray[index]);
    index++;
    return imageArray;
}
  
// Agregar/Modificar un Dato.
export const createUser = async (id: User | null, newUser: User): Promise<User[] | undefined> => {
    if (id.id) {
        try {
            users = users.map(user => 
                user.id === id.id ? { ...user, ...newUser } : user
            );
            console.log("Usuario Modificado: " + id.id);
            console.log("Usuario con Nombre: " + id.name);

            let datosUpdate = {
              id: id.id,
              nombre: id.name,
              surname1: id.surname1,
              email: id.email,
              profileImage: id.profileImage
          }
          fetch("https://88.24.25.50/api/Account/Update/" + id.id, {
              method: "PATCH",
              body: JSON.stringify(datosUpdate),
              headers: {
                  "Content-Type": "application/json"
              },
          }).then(res => res.json())
          .catch(error => toast(2, "Error al Actualizar:", "Parece que No Hay Conexión con el Servidor. " + error));
          toast(0, "Usuario Modificado:", "Usuario Modificado Correctamente.");

        return users;
        } catch (error) {
            console.error('Error al Modificar el Usuario: ', error);
        }
    } else {
        try {
            let datosCreate = {
                nombre: id.name,
                surname1: id.surname1,
                email: id.email,
                profileImage: id.profileImage
            }
            fetch("https://88.24.25.50/api/Account/Register", {
                method: "POST",
                body: JSON.stringify(datosCreate),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(res => res.json())
            .catch(error => toast(2, "", "Error al Crear: " + error));
            toast(0, "Usuario Creado:", "Usuario Creado Correctamente.");

            users.push(newUser);
            return users;
        } catch (error) {
            console.error('Error al Agregar el Usuario: ', error);
        }
    }
};
  
// Eliminar un Dato.
export const deleteUser = async (id: string): Promise<void> => {
    try {
        users = users.filter(user => user.id !== id);
        fetch("https://88.24.25.50/api/Account/Delete/" + id, {
          method: "DELETE",
          body: JSON.stringify(id),
          headers: {
              "Content-Type": "application/json"
          },
        }).then(res => res.json())
                    .catch(error => toast(2, "Error al Eliminar:", "Parece que No Hay Conexión con el Servidor. " + error));
                    toast(0, "Usuario Eliminado:", "Usuario Eliminado Correctamente.");
    } catch (error) {
      console.error('Error al Eliminar un Usuario: ', error);
    }
};

export const getUser = async (id: string): Promise<User | undefined> => {
    try {
      return users.find(user => user.id === id);
    } catch (error) {
      console.error('Error Obteniendo los Datos: ', error);
    }
};