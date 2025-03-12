document.addEventListener('DOMContentLoaded', () => {
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
});