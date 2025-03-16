document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentCode = urlParams.get('student_code');
    const technologyCode = urlParams.get('technology_code');

    async function loadStudentTech() {
        const studentTech = await api.getStudentTechnology(studentCode, technologyCode);
        if (studentTech) {
            document.querySelector('h2').textContent = `Editar ${studentTech.technology.name}`;
            const levelRadios = document.querySelectorAll('input[name="level"]');
            levelRadios.forEach(radio => {
                if (radio.value == studentTech.level) {
                    radio.checked = true;
                }
            });
        }
    }

    loadStudentTech();

    document.getElementById('editTechForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const techLevel = document.querySelector('input[name="level"]:checked').value;

        try {
            await api.updateStudentTechnology(studentCode, technologyCode, techLevel);
            alert('Tecnología actualizada exitosamente');
            window.location.href = `detalles.html?student_code=${studentCode}`;
        } catch (error) {
            alert('Falló la actualización de la tecnología');
        }
    });

    document.querySelector('.cancel').addEventListener('click', () => {
        window.location.href = `detalles.html?student_code=${studentCode}`;
    });
});
