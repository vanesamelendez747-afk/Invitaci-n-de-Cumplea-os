
const boton = document.getElementById("abrirInvitacion");
const detalles = document.getElementById("detalles");

boton.addEventListener("click", function() {

    detalles.classList.remove("oculto");

    boton.textContent = "¡Qué alegría que vengas! 🎉";

    boton.disabled = true;

    detalles.scrollIntoView({
        behavior: "smooth"
    });

});
