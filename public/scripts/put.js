const searchId = document.getElementById('search-btn');
const buttonPut = document.getElementById('put-btn');

document.getElementById('container-intern').classList.add('hide');

function reset(){
    document.getElementById('id').value = '';
    document.getElementById('company').value = '';
    document.getElementById('role').value = '';
    document.getElementById('location').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('date').value = '';
    document.getElementById('link').value = '';
    document.getElementById('search').value = '';
}

searchId.addEventListener('click', async () => {
    const id = document.getElementById('search').value;
    try {
        const response = await fetch(`/putInternships.html/${id}`);
        if (response.status === 404) {
            document.getElementById('container-intern').classList.add('hide');
            reset();
            alert('Internship no encontrada, verifique el ID');
            return;
        }else if(response.status === 500){
            document.getElementById('container-intern').classList.add('hide');
            reset();
            alert('Error en el servidor');
            return;
        }else{
            const internship = await response.json();
            document.getElementById('container-intern').classList.remove('hide');
            document.getElementById('id').value = id;
            document.getElementById('company').value = internship.company;
            document.getElementById('role').value = internship.role;
            document.getElementById('location').value = internship.location;
            document.getElementById('salary').value = internship.salary;
            document.getElementById('duration').value = internship.duration;
            document.getElementById('date').value = internship.date;
            document.getElementById('link').value = internship.link;
        }
    } catch (error) {
        reset();
        console.error(error);
        alert('Error en el servidor');
    }
});

buttonPut.addEventListener('click', async () => {
    const id = document.getElementById('id').value;
    const company = document.getElementById('company').value;
    const role = document.getElementById('role').value;
    const location = document.getElementById('location').value;
    const salary = document.getElementById('salary').value;
    const duration = document.getElementById('duration').value;
    const date = document.getElementById('date').value;
    const link = document.getElementById('link').value;

    const newInternship = {
        company,
        role,
        location,
        salary,
        duration,
        date,
        link
    };
    try {
        const response = await fetch(`/putInternships.html/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' //this is used to tell the server that the content of the body is in JSON format
            },
            body: JSON.stringify(newInternship) // json stringify is used to convert the object into a JSON string
        });
        if (response.status === 204) {
            alert('Internship actualizada');
        }else if(response.status === 500){
            document.getElementById('container-intern').classList.add('hide');
            reset();
            alert('Error en el servidor');
        }else{
            document.getElementById('container-intern').classList.add('hide');
            reset();
            alert('Error en el servidor');
        }
    } catch (error) {
        document.getElementById('container-intern').classList.add('hide');
        reset();
        console.error(error);
        alert('Error en el servidor');
    }
});