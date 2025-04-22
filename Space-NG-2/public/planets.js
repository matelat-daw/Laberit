let textura_fondo_estrellas;
let texture_earth;

function preload() {
    textura_fondo_estrellas = loadImage("../imgs/space.jpg");
    texture_earth = loadImage('../imgs/earth.jpg');
}

function setup() {
    createCanvas(800, 450, WEBGL);
}

function draw() {
    background("black");

    noStroke(); // No dibujar la malla de las esferas

    texture(textura_fondo_estrellas);
    sphere(800);

    for (let i = 0; i < 3; i++) {
        directionalLight(
            255, 255, 255 - i * 25, // Color
            -1, 1, -1 // Dirección
        );
    }

    orbitControl(); // Controlar con el mouse la cámara

    rotateZ(-0.3); // Inclinación de la tierra

    push();
    rotateY(frameCount * 0.01); // Rotación de la tierra sobre su propio eje
    texture(texture_earth);
    sphere(100);
    pop();
}