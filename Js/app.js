document.addEventListener('DOMContentLoaded', async () => {
    // Sample student data

    const studentsList = document.getElementById('studentsList');
    const template = document.getElementById('studentCardTemplate');

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
            clone.querySelector('.github-link').href = `https://github.com/${student.github_link}`;

            studentsList.appendChild(clone);


        });
    }
    // Initial render
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