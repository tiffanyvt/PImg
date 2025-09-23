async function cargarTrivia() {
  try {
    const response = await fetch("Trivia.json");
    const data = await response.json();
    const preguntas = data.triviaGeneral;

    const seleccionadas = preguntas
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    mostrarTrivia(seleccionadas);
  } catch (error) {
    console.error("Error cargando trivia:", error);
  }
}

function mostrarTrivia(preguntas) {
  const contenedor = document.getElementById("trivia-container");
  const retakeBtn = document.getElementById("retake-btn");
  contenedor.innerHTML = "";
  retakeBtn.style.display = "none"; 

  preguntas.forEach((p, index) => {
    const preguntaDiv = document.createElement("div");
    preguntaDiv.classList.add("pregunta");

    preguntaDiv.innerHTML = `
      <p><b>${index + 1}. ${p.pregunta}</b></p>
      ${p.opciones
        .map(
          (opcion) => `
          <button class="opcion" onclick="verificarRespuesta(this, '${p.respuesta}')">
            ${opcion}
          </button>
        `
        )
        .join("")}
    `;

    contenedor.appendChild(preguntaDiv);
  });
   retakeBtn.style.display = "block";
}

function verificarRespuesta(boton, respuestaCorrecta) {
  if (boton.innerText === respuestaCorrecta) {
    boton.style.backgroundColor = "green";
  } else {
    boton.style.backgroundColor = "red";
  }

  const botones = boton.parentNode.querySelectorAll("button");
  botones.forEach((b) => (b.disabled = true));
}
document.getElementById("retake-btn").addEventListener("click", cargarTrivia);

cargarTrivia();
