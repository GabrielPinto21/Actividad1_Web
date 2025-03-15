document.addEventListener('DOMContentLoaded', () => {
    const student = JSON.parse(localStorage.getItem('studentToEdit'));
    if (student) {
        document.getElementById('studentID').value = student.code;
        document.getElementById('fullName').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('github').value = student.github_link;
        document.getElementById('photo').value = student.photo;
        document.getElementById('description').value = student.description;
    }

    document.getElementById("actualizar").addEventListener('click', async (event) => {

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
            await api.updateStudent(code, usuario);
            alert('Usuario actualizado existosamente');
            window.location.href = '../index.html';
        } catch (error) {
            alert('Falló la actualización de datos')
        }
    });
});