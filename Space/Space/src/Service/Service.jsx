import toast from './js/script.js';

let users = [];

// Obtener Todos los Usuarios.
export const getUsers = async () => {
    try {
        return await fetch("https://88.24.25.50/api/Account/Users").then(respuesta => respuesta.json())
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
  export const createUser = async (id, newUser) => {
    if (id)
    {
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
    }
    else
    {
        try {
        // newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
              let datosCreate = {
                nombre: newUser.name,
                surname1: newUser.surname,
                email: newUser.email,
                image: newUser.image
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
  export const deleteUser = async (id) => {
    try {
        users = users.filter(user => user.id !== id);
    } catch (error) {
      console.error('Error al Eliminar un Usuario: ', error);
    }
  };

  export const getUser = async (id) => {
    try {
      return users.find(user => user.id === parseInt(id)).filter(user => user.name);
    } catch (error) {
      console.error('Error Obteniendo los Datos: ', error);
    }
  }