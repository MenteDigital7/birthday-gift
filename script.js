//musica

// configuracion de la fecha de cumpleaños
const fechaCumple = new Date().getTime() - 1000;

function actualizarReloj() {
    const ahora = new Date().getTime();
    const distancia = fechaCumple - ahora;

    if (distancia <= 0) {
        clearInterval(intervalo);
        document.getElementById("seccion-reloj").style.display = "none";
        document.getElementById("contenido-regalo").style.display = "block";
        lanzarConfeti();
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("reloj").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

const intervalo = setInterval(actualizarReloj, 1000);
actualizarReloj();
// iniciar y ejecutar el reloj cada segundo


// funcion para lanzar confeti
function lanzarConfeti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// control del boton de reproducir musica
function controlarMusica() {
    const audioHTML = document.getElementById("musica-fondo");
    const boton = document.getElementById("boton-musica");

    if (!audioHTML) return;

    if (audioHTML.paused) {
        audioHTML.play()
            .then(() => boton.innerHTML = "⏸️")
            .catch(err => console.error("Error al reproducir:", err));
    } else {
        audioHTML.pause();
        boton.innerHTML = "🎵";
    }
}


// efectp de apertura y maquina de escribri 
function abrirCarta(elemento) {
    const parrafo = elemento.querySelector('.contenido-carta');

    if (!parrafo) return;
    
    // Si ya esta abierta, la cierra al tocarla de nuevo
    if (parrafo.classList.contains('abierta')) {
        parrafo.classList.remove("abierta");
        return;
    }
    parrafo.classList.add('abierta');

    // ejecuta el efecto maquina de escribir
    
        const textoCompleto = parrafo.getAttribute('data-texto');
        let i = Number(parrafo.getAttribute("data-indice"));
        if (!textoCompleto) return;

        parrafo.textContent = textoCompleto.slice(0,i);


        let ultimoTiempo = 0;
        const velocidadMs = 30;

            function bucleEscritura(tiempoActual) {
                if (!parrafo.classList.contains("abierta")) {
                    return;
                }
                if (!ultimoTiempo) ultimoTiempo = tiempoActual;
                const delta = tiempoActual - ultimoTiempo;

                // Solo escribe cuando pasa el tiempo configurado, sincronizado con la pantalla
                if (delta >= velocidadMs) {
                    if (i < textoCompleto.length) { 
                        parrafo.textContent += textoCompleto[i]; 
                        i++;
                        parrafo.setAttribute("data-indice",i);
                        ultimoTiempo = tiempoActual;

                    } else {
                        parrafo.style.color = "#4a5568";
                        capaVisible.innerHTML = textoCompleto;// eliminamos la capa visible
                        parrafo.setAttribute("data-indice", 0);
                        return; // termina la animacion cuando se escriben todas las letras
                    }
                    
                
                }
                requestAnimationFrame(bucleEscritura);
                
            }
            requestAnimationFrame(bucleEscritura); 
        }
         
    

// fondo animado
const fondo = document.querySelector(".fondo-animado");
    for (let i = 0;i < 35;i++){

        const particula = document.createElement("span");
        const tamaño = Math.random() * 8 + 4;
        const duracion = Math.random() * 4 + 4;
        const retraso = Math.random() * 5;
        const opacidad = Math.random();

        particula.style.width = tamaño + "px";
        particula.style.height = tamaño + "px";
        particula.style.left = Math.random() * 100 + "%";
        particula.style.animationDuration = duracion + "s";
        particula.style.animationDelay = retraso + "s";
        particula.style.opacity = opacidad;

        fondo.appendChild(particula);

    }
console.log("El script cargó correctamente");
const boton = document.getElementById("boton-musica");

console.log(boton);

boton.addEventListener("click", () => {
    console.log("Se hizo click en el botón");
});