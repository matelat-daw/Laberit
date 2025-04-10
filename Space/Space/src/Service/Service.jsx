import toast from './js/script.js';

let users = [];
const url = "https://192.168.83.41/";

// Obtener Todos los Usuarios.
export const getUsers = async () => {
    try {
        return await fetch(url + "api/Account/Users").then(respuesta => respuesta.json())
        // return await fetch("https://localhost:7227/api/Account/Users").then(respuesta => respuesta.json())
        .catch(respuesta => toast(2, "Error de Conexión", "Lo Siento No hay Conexión con el Servidor. Asegurate de que el Servidor está en Ejecución. Error: " + respuesta))
        // .then(jsonData => getImages(jsonData));
    } catch (error) {
      console.error('Error al Intentar Obtener los Usuarios:', error);
    }
  };

export function getImages(jsonData)
{
    jsonData.map(img => blobConverter(img.profileImage));
    return jsonData;
}

async function blobConverter(urlImg){
    let blobImg;
    await fetch(urlImg)
    .then(res => res.blob())
    .then(blob => blobImg=blob);
    createElements(blobImg);
}

let imageArray = [];
let index = 0;
function createElements(blobImg)
{
    let img = document.createElement("img");
    img.src = URL.createObjectURL(blobImg);
    img.alt = "Foto de Perfil";
    imageArray[index] = img;
    console.log("Imagen: " + index + " es: " + imageArray[index]);
    index++;
    return imageArray;
}
  
  // Agregar/Modificar un Dato.
  export const createUser = async (newUser) => {
    if (newUser.id !== undefined)
    {
        try {
            users = users.map(user => 
                user.id === newUser.id ? { ...user, ...newUser } : user
            );

            let datosUpdate = {
              nombre: newUser.name,
              surname1: newUser.surname1,
              email: newUser.email,
              profileImage: newUser.profileImage
          }
          fetch(url + "api/Account/Update/" + newUser.id, {
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
    }
    else
    {
        try {
              let datosCreate = {
                nombre: newUser.name,
                surname1: newUser.surname1,
                email: newUser.email,
                image: newUser.image
            }
            fetch(url + "api/Account/Register", {
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
  export const deleteUser = async (id) => {
    try {
          users = users.filter(user => user.id !== id);
          fetch(url + "api/Account/Delete/" + id, {
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

  export const getUser = async (id) => {
    try {
      return users.find(user => user.id === id).filter(user => user.name);
    } catch (error) {
      console.error('Error Obteniendo los Datos: ', error);
    }
  }