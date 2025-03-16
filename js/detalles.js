document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentCode = urlParams.get('student_code');

    async function loadStudentDetails() {
        const student = await api.getStudentByCode(studentCode);
        if (student) {
            document.getElementById('photo').src = student.photo;
            document.getElementById('photo').alt = student.name;
            document.getElementById('fullName').textContent = student.name;
            document.getElementById('studentID').textContent = `ID: ${student.code}`;
            document.getElementById('email').textContent = student.email;
            document.getElementById('description').textContent = student.description;
        } else {
            console.error('No student data found');
        }
    }

    loadStudentDetails();

    document.getElementById('edit').addEventListener('click', () => {
        window.location.href = `editar.html?student_code=${studentCode}`;
    });

    document.getElementById('back').addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    document.getElementById('addTecnology').addEventListener('click', () => {
        window.location.href = `anadirTecnologia.html?student_code=${studentCode}`;
    });

    const techContent = document.getElementById('tech-content');
    const techCard = document.getElementById('tech-template');

    async function renderTechnologies() {
        techContent.innerHTML = '';
        const technologies = await api.getStudentTechnologies(studentCode);
        technologies.forEach(tech => {
            const newCard = techCard.content.cloneNode(true);
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
                window.location.href = `editarTecnologia.html?student_code=${studentCode}&technology_code=${tech.technology_code}`;
            });

            newCard.querySelector('#tech-card-delete').addEventListener('click', async () => {
                try {
                    await api.deleteStudentTechnology(studentCode, tech.technology_code);
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