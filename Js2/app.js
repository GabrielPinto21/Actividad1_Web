document.addEventListener('DOMContentLoaded', async () => {

    const studentsList = document.getElementById('studentsList');
    const template = document.getElementById('studentCardTemplate');
    const templateEditar = document.getElementById('templateDetalles');

    // Render students
    async function renderStudents() {
        const students = await api.getStudents();

        studentsList.innerHTML = '';
        students.forEach(student => {
            console.log(student.name);
            console.log(student);

            const clone = template.content.cloneNode(true);

            clone.querySelector('.student-name').textContent = student.name;
            clone.querySelector('.student-id').textContent = `ID: ${student.code}`;
            clone.querySelector('.student-email').textContent = student.email;
            clone.querySelector('.student-image').src = student.photo;
            clone.querySelector('.student-image').alt = student.name;
            clone.querySelector('#github-link').onclick = () => {
                window.open(student.github_link, '_blank')
            };
            clone.querySelector('#actualizar-link').setAttribute('data-id', student.code);
            clone.querySelector('#actualizar-link').onclick = () => {
                localStorage.setItem('studentToEdit', JSON.stringify(student));
                window.location.href = 'html/editar.html';
            };

            clone.querySelector('#detalles-link').setAttribute('data-id', student.code);
            clone.querySelector('#detalles-link').onclick = () =>{
                localStorage.setItem('studentToView', JSON.stringify(student));
                window.location.href = 'html/detalles.html';
            }
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

    console.log(usuario);

    try {
        await api.createStudent(usuario);
        alert('Usuario creado existosamente');
        window.location.href = '../index.html';
    } catch (error) {
        alert('Falló la creación del Usuario')
    }
});