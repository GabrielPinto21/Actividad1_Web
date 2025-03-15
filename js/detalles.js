document.addEventListener('DOMContentLoaded', async () => {
    const student = JSON.parse(localStorage.getItem('studentToView'));
    if (student) {
        document.getElementById('photo').src = student.photo;
        document.getElementById('photo').alt = student.name;
        document.getElementById('fullName').textContent = student.name;
        document.getElementById('studentID').textContent = `ID: ${student.code}`;
        document.getElementById('email').textContent = student.email;
        document.getElementById('description').textContent = student.description;
    } else {
        console.error('No student data found in localStorage');
    }

    document.getElementById('edit').addEventListener('click', () => {
        localStorage.setItem('studentToEdit', JSON.stringify(student));
        window.location.href = 'editar.html';
    });

    document.getElementById('back').addEventListener('click', () => {
        localStorage.setItem('studentToEdit', JSON.stringify(student));
        window.location.href = '../index.html';
    });

    document.getElementById('addTecnology').addEventListener('click', async () => {
        window.location.href = '../html/anadirTecnologia.html';
    });

    
    const techContent = document.getElementById('tech-content');
    const techCard = document.getElementById('tech-template');

    async function renderTechnologies() {
        techContent.innerHTML = '';
        const technologies = await api.getStudentTechnologies(student.code);
        technologies.forEach(tech => {
            console.log(tech);
            const newCard = techCard.content.cloneNode(true);
            console.log(newCard.querySelector('#tech-name'));
            newCard.querySelector('#tech-name').textContent = tech.technology.name;
            newCard.querySelector('#tech-img').src = tech.technology.image;
            const ratingContainer = newCard.querySelector('#tech-rating');
            ratingContainer.innerHTML = '';
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('i');
                star.className = i <= tech.level ? 'ri-star-s-fill' : 'ri-star-s-line';
                ratingContainer.appendChild(star);
            }

            newCard.querySelector('#tech-card-edit').addEventListener('click', () => {
                localStorage.setItem('studentTechToEdit', JSON.stringify(tech));
                window.location.href = 'editarTecnologia.html';
            });

            newCard.querySelector('#tech-card-delete').addEventListener('click', async () => {
                try {
                    await api.deleteStudentTechnology(student.code, tech.technology_code);
                    await renderTechnologies();
                    newCard.remove();
                } catch (error) {
                    console.error('Failed to delete student technology:', error);
                }
            });

            techContent.appendChild(newCard);
        });
    }

    await renderTechnologies();
});