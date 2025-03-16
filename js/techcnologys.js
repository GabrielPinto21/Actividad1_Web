document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentCode = urlParams.get('student_code');

    const allTechs = await api.getTechnologies();
    const stdTechs = await api.getStudentTechnologies(studentCode);
    const studentTechCodes = stdTechs.map(tech => tech.technology.code);
    const availableTechs = allTechs.filter(tech => !studentTechCodes.includes(tech.code));

    const selectTech = document.getElementById('techSelect');
    availableTechs.forEach(tech => {
        const option = document.createElement('option');
        option.value = tech.code;
        option.textContent = tech.name;
        selectTech.appendChild(option);
    });

    document.getElementById('addTechnology').addEventListener('click', async (event) => {
        event.preventDefault();
        if (selectTech.value === '') {
            alert('Seleccione una tecnología');
            return;
        } else {
            const techLevel = document.querySelector('input[name="level"]:checked').value;
            const studentTech = {
                level: techLevel,
                student_code: studentCode,
                technology_code: selectTech.value
            };
            await api.addStudentTechnology(studentTech);
            window.location.href = `detalles.html?student_code=${studentCode}`;
        }
    });

    document.querySelector('.cancel').addEventListener('click', () => {
        window.location.href = `detalles.html?student_code=${studentCode}`;
    });
});