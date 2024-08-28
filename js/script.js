//-------Selección de Elementos-------//
const btnEncriptar = document.querySelector(".botonEncriptar");
const txtEncriptar = document.querySelector(".encriptar");
const aviso = document.querySelector(".textoAviso");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".contenedorTarjeta");
const btnCopiar = document.querySelector(".botonCopiar");
const btnDesencriptar = document.querySelector(".botonDesencriptar");

// Función para mostrar avisos
function mostrarAviso(mensaje) {
    aviso.style.color = "#c40000";
    aviso.textContent = mensaje;
    
    setTimeout(() => {
        aviso.removeAttribute("style");
    }, 1500);
}

// Función para validar texto
function validarTexto(texto) {
    const textoNormalizado = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");
    if (texto === "") {
        mostrarAviso("El campo de texto no debe estar vacío");
        return false;
    }
    if (texto !== textoNormalizado) {
        mostrarAviso("Asegúrate de que no haya acentos ni caracteres especiales");
        return false;
    }
    if (texto !== texto.toLowerCase()) {
        mostrarAviso("Asegúrate de que el texto esté únicamente en minúsculas");
        return false;
    }
    return true;
}

// Función para encriptar o desencriptar texto
function procesarTexto(encriptar) {
    const texto = txtEncriptar.value;
    if (!validarTexto(texto)) return;

    let resultado;
    if (encriptar) {
        resultado = texto
            .replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");
    } else {
        resultado = texto
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");
    }

    respuesta.innerHTML = resultado;
    btnCopiar.style.visibility = "inherit";
    contenido.remove();
}

//-------Botón de Encriptar-------//
btnEncriptar.addEventListener("click", e => {
    e.preventDefault();
    procesarTexto(true);
});

//-------Botón de Desencriptar-------//
btnDesencriptar.addEventListener("click", e => {
    e.preventDefault();
    procesarTexto(false);
});

//-------Botón de Copiar-------//
btnCopiar.addEventListener("click", e => {
    e.preventDefault();
    const range = document.createRange();
    range.selectNode(respuesta);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
});
