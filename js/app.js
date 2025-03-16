document.addEventListener('DOMContentLoaded', async () => {
    const studentsList = document.getElementById('studentsList');
    const template = document.getElementById('studentCardTemplate');

    async function renderStudents() {
        const students = await api.getStudents();
        studentsList.innerHTML = '';
        students.forEach(student => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.student-name').textContent = student.name;
            clone.querySelector('.student-id').textContent = `ID: ${student.code}`;
            clone.querySelector('.student-email').textContent = student.email;
            clone.querySelector('.student-image').src = student.photo;
            clone.querySelector('.student-image').alt = student.name;

            clone.querySelector('#github-link').onclick = () => {
                window.open(student.github_link, '_blank');
            };

            clone.querySelector('#actualizar-link').setAttribute('data-id', student.code);
            clone.querySelector('#actualizar-link').onclick = () => {
                window.location.href = `html/editar.html?student_code=${student.code}`;
            };

            clone.querySelector('#detalles-link').setAttribute('data-id', student.code);
            clone.querySelector('#detalles-link').onclick = () => {
                window.location.href = `html/detalles.html?student_code=${student.code}`;
            };

            studentsList.appendChild(clone);
        });
    }

    await renderStudents();
});

document.getElementById("guardar").addEventListener('click', async (event) => {
    event.preventDefault();

    const code = document.getElementById('studentID').value;
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const github_link = document.getElementById('github').value;
    const photo = document.getElementById('photo').value;
    const description = document.getElementById('description').value;

    const usuario = {
        code,
        name,
        email,
        github_link,
        photo,
        description
    };

    try {
        await api.createStudent(usuario);
        alert('Usuario creado existosamente');
        window.location.href = '../index.html';
    } catch (error) {
        alert('Falló la creación del Usuario');
    }
});