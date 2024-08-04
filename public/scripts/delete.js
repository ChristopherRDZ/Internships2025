const searchBtn = document.getElementById('search-btn');
const deleteBtn = document.getElementById('delete-btn');
const searchId = document.getElementById('search');

const idEl = document.getElementById('id');
const companyEl = document.getElementById('company');
const roleEl = document.getElementById('role');
const locationEl = document.getElementById('location');
const salaryEl = document.getElementById('salary');
const durationEl = document.getElementById('duration');
const dateEl = document.getElementById('date');
const linkEl = document.getElementById('link');

const containerIntern = document.getElementById('container-intern');

containerIntern.classList.add('hide');

searchBtn.addEventListener('click', async () => {
    const id = searchId.value;
    try{
        const response = await fetch(`/deleteInternships.html/${id}`);
        if(response.status === 200){
            const data = await response.json();
            containerIntern.classList.remove('hide');
            idEl.value = data.id;
            companyEl.value = data.company;
            roleEl.value = data.role;
            locationEl.value = data.location;
            salaryEl.value = data.salary;
            durationEl.value = data.duration;
            dateEl.value = data.date;
            linkEl.value = data.link;
        }else{
            searchId.value = '';
            containerIntern.classList.add('hide');
            alert("Internship no encontrada, verifique el ID");
        }
    }catch(error){
        containerIntern.classList.add('hide');
        searchId.value = '';
        alert("Error al buscar la internship, intente de nuevo");
        console.error(error);
    }
});

deleteBtn.addEventListener('click', async () => {
    const id = idEl.value;
    try{
        const response = await fetch(`/deleteInternships.html/${id}`, {
            method: 'DELETE'
        });
        if(response.status === 204){
            alert("Internship eliminada exitosamente");
            containerIntern.classList.add('hide');
            idEl.value = '';
            companyEl.value = '';
            roleEl.value = '';
            locationEl.value = '';
            salaryEl.value = '';
            durationEl.value = '';
            dateEl.value = '';
            linkEl.value = '';
            searchId.value = '';
        }else{
            containerIntern.classList.add('hide');
            alert("Error al eliminar la internship, intente de nuevo");
        }
    }catch(error){
        containerIntern.classList.add('hide');
        alert("Error al eliminar la internship, intente de nuevo");
        console.error(error);
    }
});

