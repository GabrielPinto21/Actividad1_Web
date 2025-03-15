document.addEventListener('DOMContentLoaded', async () => {

    const student = JSON.parse(localStorage.getItem('studentToView'));

    const allTechs = await api.getTechnologies();
    const stdTechs = await api.getStudentTechnologies(student.code);
    const studentTechCodes = stdTechs.map(tech => tech.technology.code);
    const availableTechs = allTechs.filter(tech => !studentTechCodes.includes(tech.code));

    const selectTech = document.getElementById('techSelect');
    availableTechs.forEach(tech => {
        const option = document.createElement('option');
        option.value = tech.code;
        option.textContent = tech.name;
        selectTech.appendChild(option);
    });

    document.getElementById('addTechnology').addEventListener('click', async () => {
        event.preventDefault();
        if (selectTech.value === '') {
            alert('Seleccione una tecnología');
            return;
        } else {
            const techLevel = document.querySelector('input[name="level"]:checked').value;
            const studentTech = {
                level: techLevel,
                student_code: student.code,
                technology_code: selectTech.value
            };
            await api.addStudentTechnology(studentTech);
            window.location.href = './detalles.html';
        }
    });
});