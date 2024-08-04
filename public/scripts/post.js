const formEl = document.getElementById('form-intern');

formEl.addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        if (response.status === 204) {
            alert("Datos enviados correctamente.");
        } else if (response.status === 409) {
            alert("El id ya existe.");
        }else{
            alert("Error en el servidor.");
        }
    } catch (error) {
        alert("Error en el cliente." + error);
    }
});
