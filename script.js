const armazena = document.getElementById('button');
const tarefaInput = document.getElementById('tarefaInput');
const tarefasMostra = document.getElementById('tarefas');
const tarefas = [];
function adicionarTarefa() {
    const tarefaT = tarefaInput.value.trim(); 
    if (tarefaT) {
        const newTarefa = {
            text: tarefaT,
            status: 'Incompleto'
        };
        tarefas.push(newTarefa);
        renderizaTarefa(); 
        tarefaInput.value = '';
    } else {
        window.alert("Escreva uma tarefa");
    }
}

armazena.addEventListener('click', adicionarTarefa);

tarefaInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

function renderizaTarefa() {
    tarefasMostra.innerHTML = ''; 
    tarefas.forEach((tarefa, index) => {
        const item = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.status === 'Concluido';

        checkbox.addEventListener('change', function () {
            tarefa.status = checkbox.checked ? 'Concluido' : 'Incompleto';
            renderizaTarefa();
        });

        const tarefaTexto = document.createElement('span');
        tarefaTexto.textContent = tarefa.text;
        if (tarefa.status === 'Concluido') {
            tarefaTexto.classList.add("complete"); 
        }

        const icon = document.createElement('span');
        icon.innerHTML  = '<i class="fas fa-trash"></i>'; 
        icon.style.cursor = 'pointer';

        icon.addEventListener('click', function() {
            const confirmDelete = window.confirm('Deseja deletar essa tarefa?');
            if (confirmDelete) {
                tarefas.splice(index, 1);
                renderizaTarefa(); 
            }
        });icon.classList.add('icon');

        item.appendChild(checkbox);
        item.appendChild(tarefaTexto);
        item.appendChild(icon);
        tarefasMostra.appendChild(item);
    });
}