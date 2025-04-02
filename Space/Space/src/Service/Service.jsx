import toast from './js/script.js';

let users = [];

// Obtener Todos los Usuarios.
export const getUsers = async () => {
    try {
        return await fetch("http://127.0.0.1:5148/api/Account/Users").then(respuesta => respuesta.json())
        .catch(respuesta => toast(2, "Error de Conexión", "Lo Siento No hay Conexión con el Servidor. Asegurate de que el Servidor está en Ejecución. Error: " + respuesta))
        // .then(jsonData => getImages(jsonData));
    } catch (error) {
      console.error('Error al Intentar Obtener los Usuarios:', error);
    }
  };

export function getImages(jsonData)
{
    jsonData.map(img => blobConverter(img.image));
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
  
  // Agregar/Modificar una Receta
  export const createUser = async (id, newUser) => {
    if (id)
    {
        try {
            users = users.map(user => 
                users.id == id ? { ...user, ...newUser } : user
            );
        return users;
        } catch (error) {
            console.error('Error al Modificar un Usuario: ', error);
        }
    }
    else
    {
        try {
        newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push(newUser);
        return users;
        } catch (error) {
        console.error('Error al Agregar un Usuario: ', error);
        }
    }
  };
  
  // Eliminar una Receta
  export const deleteUser = async (id) => {
    try {
        users = users.filter(user => user.id !== id);
    } catch (error) {
      console.error('Error al Eliminar un Usuario: ', error);
    }
  };

//   export const getRecipie = async (id) => {
//     try {
//       return recetas.find(receta => receta.id === parseInt(id)).filter(receta => receta.ingridients);
//     } catch (error) {
//       console.error('Error Obteniendo los Ingredientes: ', error);
//     }
//   }