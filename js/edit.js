document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentCode = urlParams.get('student_code');
    const referrer = document.referrer;

    async function loadStudentDetails() {
        const student = await api.getStudentByCode(studentCode);
        if (student) {
            document.getElementById('studentID').value = student.code;
            document.getElementById('fullName').value = student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('github').value = student.github_link;
            document.getElementById('photo').value = student.photo;
            document.getElementById('description').value = student.description;
        }
    }

    loadStudentDetails();

    document.getElementById("actualizar").addEventListener('click', async (event) => {
        event.preventDefault();

        const name = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const github_link = document.getElementById('github').value;
        const photo = document.getElementById('photo').value;
        const description = document.getElementById('description').value;

        const usuario = {
            code: studentCode,
            name,
            email,
            github_link,
            photo,
            description
        };

        try {
            await api.updateStudent(studentCode, usuario);
            alert('Usuario actualizado existosamente');
            if (referrer.includes('detalles.html')) {
                window.location.href = `detalles.html?student_code=${studentCode}`;
            } else {
                window.location.href = `../index.html`;
            }
        } catch (error) {
            alert('Falló la actualización de datos');
        }
    });
});