function preload() {
    textura_fondo_estrellas = loadImage("./imgs/space3.jpg");
    texture_mercury = loadImage('./imgs/mercury.jpg');
    texture_venus = loadImage('./imgs/venus.webp');
    texture_sun = loadImage('./imgs/sun.jpg');
    texture_earth = loadImage('./imgs/earth.jpg');
    texture_moon = loadImage('./imgs/moon.jpg');
    texture_mars = loadImage('./imgs/mars.jpg');
    texture_fobos = loadImage('./imgs/fobos.jpg');
    texture_deimos = loadImage('./imgs/deimos.jpg');
    texture_jupiter = loadImage('./imgs/jupiter.webp');
    // texture_saturn = loadImage('./imgs/saturn.jpg');
    // texture_uranus = loadImage('./imgs/uranus.jpg');
    // texture_neptune = loadImage('./imgs/neptune.jpg');
}

function setup() {
   createCanvas(1024, 768, WEBGL);
}

function draw() {
   background("black")
   
   noStroke() //No dibujar la malla de las esferas
   
   texture(textura_fondo_estrellas)
   sphere(3120); //Fondo de estrellas

   for (let i = 0; i < 3; i++) {
        directionalLight(
             255, 255, 255 - i * 25,//Color
             -1, 1, -1 //Dirección
        );
   }

   orbitControl(); //Controlar con el mouse la camara

   push();
   rotateY(frameCount * 0.01 / 36); //rotación del sol sobre su propio eje
   texture(texture_sun); 
   sphere(110);
   pop();

   push();
   // Órbita de Mercurio
   rotateY(frameCount * 0.01137); // Velocidad de traslación de Mercurio
   translate(120, 0, 0); // Distancia de Mercurio al Sol
   rotateY(frameCount * 0.03); // Rotación de Mercurio sobre su propio eje
   texture(texture_mercury);
   sphere(3.8); // Tamaño de Mercurio ajustado
   pop();

   push();
   // Órbita de Venus
   rotateY(frameCount * 0.00445); // Velocidad de traslación de Venus
   translate(200, 0, 0); // Distancia de Venus al Sol
   rotateY(frameCount * 0.02); // Rotación de Venus sobre su propio eje
   texture(texture_venus);
   sphere(9.5); // Tamaño de Venus ajustado
   pop();

   rotateZ(-0.3); //Inclinación de la tierra

   push();
   rotateY(frameCount * 0.00274); //rotación de la tierra sobre su propio eje
   translate(300, 0, 0);
   texture(texture_earth); 
   sphere(10);

   push();
   rotateY(frameCount * 0.02);//Traslación de la luna al rededor de la tierra
   translate(30, 0, 0); //Distancia del centro de la luna al centro de la tierra
   rotateY(-frameCount * 0.05);//Rotación del la luna sobre su propio eje
   texture(texture_moon);
   sphere(2.5);
   pop();

   pop();

   push();
   rotateY(frameCount * 0.00146); //rotación de la tierra sobre su propio eje
   translate(450, 0, 0);
   rotateY(frameCount * 0.01); //rotación de marte sobre su propio eje
   texture(texture_mars); 
   sphere(5.3);

   push();
   rotateY(frameCount * 0.03);//Traslación de la luna al rededor de la tierra
   translate(12, 0, 0); //Distancia del centro de la luna al centro de la tierra
   rotateY(-frameCount * 0.1);//Rotación del la luna sobre su propio eje
   texture(texture_fobos);
   sphere(1.5);
   pop();

   push();
   rotateY(frameCount * 0.015);//Traslación de la luna al rededor de la tierra
   translate(20, 0, 0); //Distancia del centro de la luna al centro de la tierra
   rotateY(-frameCount * 0.05);//Rotación del la luna sobre su propio eje
   texture(texture_deimos);
   sphere(1.8);
   pop();

   pop();

   push();
   // Órbita de Júpiter
   rotateY(frameCount * 0.000231); // Velocidad de traslación de Júpiter
   translate(1560, 0, 0); // Distancia de Júpiter al Sol
   rotateY(frameCount * 0.01); // Rotación de Júpiter sobre su propio eje
   texture(texture_jupiter);
   sphere(112); // Tamaño de Júpiter ajustado
   pop();
}