document.addEventListener('DOMContentLoaded', getInternships);

async function getInternships(){
    const response = await fetch('/getInternships.html/all');
    const internships = await response.json();

    const container = document.getElementById('container-internships');
    container.innerHTML = "";

    internships.forEach(internship => {
        const div = `
            <div class="internship">
                <div class="company-title">${internship.id}, ${internship.company}</div>
                <div class="info-intern">
                    <div class="info">
                        <img src="./imgs/role.png" class="img-info"> 
                        <p>Puesto: ${internship.role}</p>
                    </div>
                    <div class="info">
                        <img src="./imgs/location.png" class="img-info"> 
                        <p>Lugar: ${internship.location}</p>
                    </div>
                    <div class="info">
                        <img src="./imgs/salary.png" class="img-info"> 
                        <p>Salario: ${internship.salary} USD</p>
                    </div>
                    <div class="info">
                        <img src="./imgs/duration.png" class="img-info"> 
                        <p>Duración: ${internship.duration}</p>
                    </div>
                    <div class="info">
                        <img src="./imgs/calendar.png" class="img-info"> 
                        <p>Publicado: ${internship.date}</p>
                    </div>
                    <div class="info">
                        <img src="./imgs/link.png" class="img-info">
                        <p>Link: <a href="${internship.link}">${internship.link}</a></p>
                    </div>
                </div>
        `;
        container.innerHTML += div;
    });
}

