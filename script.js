/*
ATIVIDADE: LISTA DE TAREFAS INTERATIVA - JAVASCRIPT

NOME DO ALUNO: ________________________________
TURMA: ________________________________________
DATA: _________________________________________

INSTRUÇÕES GERAIS:
- Implemente todas as funcionalidades marcadas com TODO
- Mantenha o código organizado e comentado
- Use boas práticas de programação JavaScript
- Teste todas as funcionalidades antes de entregar
- Valide todas as entradas do usuário

FUNCIONALIDADES OBRIGATÓRIAS (40 pontos):
1. Adicionar tarefas (8 pontos)
2. Marcar como concluída/pendente (6 pontos)
3. Editar tarefas (8 pontos)
4. Excluir tarefas (6 pontos)
5. Filtrar tarefas (6 pontos)
6. Buscar tarefas (3 pontos)
7. Persistência localStorage (3 pontos)

QUALIDADE DO CÓDIGO (25 pontos):
- Organização e estrutura (10 pontos)
- Comentários e documentação (5 pontos)
- Tratamento de erros (5 pontos)
- Validações (5 pontos)

DICAS:
- Use addEventListener para eventos
- Implemente validações de entrada
- Use localStorage para persistir dados
- Mantenha funções pequenas e específicas
- Teste cada funcionalidade isoladamente
*/

// ===== VARIÁVEIS GLOBAIS =====
// TODO: Declare as variáveis globais necessárias
let tasks = []; // Array para armazenar as tarefas
let currentFilter = 'todas'; // Filtro atual
let searchTerm = ''; // Termo de busca atual
let editingTaskId = null; // ID da tarefa sendo editada

// ===== INICIALIZAÇÃO =====
// TODO: Implemente a função de inicialização
document.addEventListener('DOMContentLoaded', function() {
    // TODO: Carregue as tarefas do localStorage
    loadTasks();
    
    // TODO: Configure todos os event listeners
    setupEventListeners();
    
    // TODO: Renderize a lista inicial
    renderTasks();
    
    // TODO: Adicione tarefas de exemplo se não houver nenhuma
    if (tasks.length === 0) {
        addExampleTasks();
    }
});

// ===== CONFIGURAÇÃO DE EVENT LISTENERS =====
// TODO: Implemente a função para configurar todos os event listeners
function setupEventListeners() {
    // TODO: Event listener para adicionar tarefa
    const addBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    
    // addBtn.addEventListener('click', addTask);
    // taskInput.addEventListener('keypress', function(e) {
    //     if (e.key === 'Enter') addTask();
    // });
    
    // TODO: Event listener para filtros
    const filterSelect = document.getElementById('filterSelect');
    // filterSelect.addEventListener('change', function(e) {
    //     currentFilter = e.target.value;
    //     renderTasks();
    // });
    
    // TODO: Event listener para busca
    const searchInput = document.getElementById('searchInput');
    // searchInput.addEventListener('input', function(e) {
    //     searchTerm = e.target.value.toLowerCase();
    //     renderTasks();
    // });
    
    // TODO: Event listeners para ações em lote
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    // clearCompletedBtn.addEventListener('click', clearCompleted);
    // clearAllBtn.addEventListener('click', clearAll);
    
    // TODO: Event listeners para modal
    const saveEditBtn = document.getElementById('saveEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const closeBtn = document.querySelector('.close');
    const modal = document.getElementById('editModal');
    
    // saveEditBtn.addEventListener('click', saveEdit);
    // cancelEditBtn.addEventListener('click', closeModal);
    // closeBtn.addEventListener('click', closeModal);
    
    // TODO: Fechar modal clicando fora
    // modal.addEventListener('click', function(e) {
    //     if (e.target === modal) closeModal();
    // });
    
    // TODO: Tecla ESC para fechar modal
    // document.addEventListener('keydown', function(e) {
    //     if (e.key === 'Escape') closeModal();
    // });
}

// ===== FUNÇÕES PRINCIPAIS =====

// TODO: Implemente a função para adicionar uma nova tarefa
function addTask() {
    // TODO: Obtenha os valores dos inputs
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const text = taskInput.value.trim();
    
    // TODO: Valide a entrada
    if (text === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }
    
    if (text.length > 100) {
        alert('A tarefa deve ter no máximo 100 caracteres!');
        return;
    }
    
    // TODO: Crie o objeto da tarefa
    const task = {
        id: Date.now(), // ID único baseado no timestamp
        text: text,
        completed: false,
        priority: prioritySelect.value,
        createdAt: new Date().toISOString(),
        completedAt: null
    };
    
    // TODO: Adicione a tarefa ao array
    tasks.unshift(task); // Adiciona no início do array
    
    // TODO: Salve no localStorage
    saveTasks();
    
    // TODO: Renderize a lista
    renderTasks();
    
    // TODO: Limpe os campos
    taskInput.value = '';
    prioritySelect.value = 'media';
    taskInput.focus();
    
    // TODO: Mostre notificação de sucesso
    showNotification('Tarefa adicionada com sucesso!', 'success');
}

// TODO: Implemente a função para alternar o status de uma tarefa
function toggleTask(id) {
    // TODO: Encontre a tarefa pelo ID
    const task = tasks.find(t => t.id === id);
    
    if (task) {
        // TODO: Alterne o status
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        
        // TODO: Salve e renderize
        saveTasks();
        renderTasks();
        
        // TODO: Mostre notificação
        const message = task.completed ? 'Tarefa concluída!' : 'Tarefa marcada como pendente!';
        showNotification(message, 'success');
    }
}

// TODO: Implemente a função para excluir uma tarefa
function deleteTask(id) {
    // TODO: Confirme a exclusão
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        // TODO: Remova a tarefa do array
        tasks = tasks.filter(t => t.id !== id);
        
        // TODO: Salve e renderize
        saveTasks();
        renderTasks();
        
        // TODO: Mostre notificação
        showNotification('Tarefa excluída!', 'success');
    }
}

// TODO: Implemente a função para editar uma tarefa
function editTask(id) {
    // TODO: Encontre a tarefa
    const task = tasks.find(t => t.id === id);
    
    if (task) {
        // TODO: Configure o modal de edição
        editingTaskId = id;
        document.getElementById('editTaskInput').value = task.text;
        document.getElementById('editPrioritySelect').value = task.priority;
        
        // TODO: Mostre o modal
        document.getElementById('editModal').style.display = 'block';
        document.getElementById('editTaskInput').focus();
    }
}

// TODO: Implemente a função para salvar a edição
function saveEdit() {
    // TODO: Obtenha os novos valores
    const newText = document.getElementById('editTaskInput').value.trim();
    const newPriority = document.getElementById('editPrioritySelect').value;
    
    // TODO: Valide a entrada
    if (newText === '') {
        alert('Por favor, digite um texto para a tarefa!');
        return;
    }
    
    if (newText.length > 100) {
        alert('A tarefa deve ter no máximo 100 caracteres!');
        return;
    }
    
    // TODO: Encontre e atualize a tarefa
    const task = tasks.find(t => t.id === editingTaskId);
    if (task) {
        task.text = newText;
        task.priority = newPriority;
        
        // TODO: Salve e renderize
        saveTasks();
        renderTasks();
        
        // TODO: Feche o modal
        closeModal();
        
        // TODO: Mostre notificação
        showNotification('Tarefa editada com sucesso!', 'success');
    }
}

// TODO: Implemente a função para fechar o modal
function closeModal() {
    // TODO: Esconda o modal
    document.getElementById('editModal').style.display = 'none';
    editingTaskId = null;
}

// TODO: Implemente a função para limpar tarefas concluídas
function clearCompleted() {
    // TODO: Conte as tarefas concluídas
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('Não há tarefas concluídas para remover!');
        return;
    }
    
    // TODO: Confirme a ação
    if (confirm(`Excluir ${completedCount} tarefa(s) concluída(s)?`)) {
        // TODO: Remova as tarefas concluídas
        tasks = tasks.filter(t => !t.completed);
        
        // TODO: Salve e renderize
        saveTasks();
        renderTasks();
        
        // TODO: Mostre notificação
        showNotification(`${completedCount} tarefa(s) removida(s)!`, 'success');
    }
}

// TODO: Implemente a função para limpar todas as tarefas
function clearAll() {
    if (tasks.length === 0) {
        alert('Não há tarefas para remover!');
        return;
    }
    
    // TODO: Confirme a ação
    if (confirm(`Excluir todas as ${tasks.length} tarefa(s)?`)) {
        // TODO: Limpe o array
        tasks = [];
        
        // TODO: Salve e renderize
        saveTasks();
        renderTasks();
        
        // TODO: Mostre notificação
        showNotification('Todas as tarefas foram removidas!', 'success');
    }
}

// ===== FUNÇÕES DE RENDERIZAÇÃO =====

// TODO: Implemente a função principal de renderização
function renderTasks() {
    // TODO: Obtenha as tarefas filtradas
    const filteredTasks = getFilteredTasks();
    
    // TODO: Obtenha os elementos do DOM
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    
    // TODO: Limpe a lista
    taskList.innerHTML = '';
    
    // TODO: Verifique se há tarefas para mostrar
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'block';
        taskList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        taskList.style.display = 'block';
        
        // TODO: Renderize cada tarefa
        filteredTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }
    
    // TODO: Atualize as estatísticas
    updateStats();
}

// TODO: Implemente a função para criar o elemento HTML de uma tarefa
function createTaskElement(task) {
    // TODO: Crie o elemento li
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-task-id', task.id);
    
    // TODO: Formate as datas
    const createdDate = new Date(task.createdAt).toLocaleDateString('pt-BR');
    const completedDate = task.completedAt ? new Date(task.completedAt).toLocaleDateString('pt-BR') : '';
    
    // TODO: Crie o HTML interno
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
               onchange="toggleTask(${task.id})">
        <span class="task-text">${escapeHtml(task.text)}</span>
        <span class="task-priority priority-${task.priority}">${task.priority}</span>
        <span class="task-date">
            Criada: ${createdDate}
            ${task.completed ? `<br>Concluída: ${completedDate}` : ''}
        </span>
        <div class="task-actions">
            <button class="edit-btn" onclick="editTask(${task.id})" 
                    ${task.completed ? 'disabled' : ''}>
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i> Excluir
            </button>
        </div>
    `;
    
    return li;
}

// TODO: Implemente a função para filtrar tarefas
function getFilteredTasks() {
    let filtered = [...tasks];
    
    // TODO: Aplique o filtro selecionado
    switch (currentFilter) {
        case 'pendentes':
            filtered = filtered.filter(t => !t.completed);
            break;
        case 'concluidas':
            filtered = filtered.filter(t => t.completed);
            break;
        case 'alta':
        case 'media':
        case 'baixa':
            filtered = filtered.filter(t => t.priority === currentFilter);
            break;
        // 'todas' não precisa de filtro
    }
    
    // TODO: Aplique a busca por texto
    if (searchTerm) {
        filtered = filtered.filter(t => 
            t.text.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

// TODO: Implemente a função para atualizar estatísticas
function updateStats() {
    // TODO: Calcule as estatísticas
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    // TODO: Atualize os elementos do DOM
    document.getElementById('totalTasks').textContent = `Total: ${total}`;
    document.getElementById('completedTasks').textContent = `Concluídas: ${completed}`;
    document.getElementById('pendingTasks').textContent = `Pendentes: ${pending}`;
}

// ===== FUNÇÕES DE PERSISTÊNCIA =====

// TODO: Implemente a função para salvar no localStorage
function saveTasks() {
    try {
        // TODO: Salve o array de tarefas como JSON
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
        alert('Erro ao salvar tarefas!');
    }
}

// TODO: Implemente a função para carregar do localStorage
function loadTasks() {
    try {
        // TODO: Carregue e parse o JSON
        const saved = localStorage.getItem('tasks');
        tasks = saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        tasks = [];
    }
}

// ===== FUNÇÕES AUXILIARES =====

// TODO: Implemente a função para escapar HTML (segurança)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// TODO: Implemente a função para mostrar notificações
function showNotification(message, type = 'info') {
    // TODO: Crie o elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // TODO: Adicione estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1001;
        max-width: 300px;
    `;
    
    // TODO: Defina a cor baseada no tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // TODO: Adicione ao DOM
    document.body.appendChild(notification);
    
    // TODO: Remova após 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// TODO: Implemente a função para adicionar tarefas de exemplo
function addExampleTasks() {
    const exampleTasks = [
        {
            id: Date.now() - 3,
            text: 'Estudar JavaScript avançado',
            completed: false,
            priority: 'alta',
            createdAt: new Date().toISOString(),
            completedAt: null
        },
        {
            id: Date.now() - 2,
            text: 'Fazer exercícios de CSS',
            completed: true,
            priority: 'media',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            completedAt: new Date().toISOString()
        },
        {
            id: Date.now() - 1,
            text: 'Revisar conceitos de HTML',
            completed: false,
            priority: 'baixa',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            completedAt: null
        }
    ];
    
    tasks = exampleTasks;
    saveTasks();
    renderTasks();
}

// ===== FUNCIONALIDADES EXTRAS (OPCIONAL) =====

// TODO: Implemente funcionalidades extras para pontos adicionais:
// - Drag and drop para reordenar tarefas
// - Categorias/tags para tarefas
// - Data de vencimento
// - Exportar/importar tarefas
// - Modo escuro
// - Atalhos de teclado

/*
CHECKLIST DE ENTREGA:
□ Todas as funcionalidades obrigatórias implementadas
□ Código comentado e organizado
□ Validações de entrada funcionando
□ Persistência no localStorage funcionando
□ Interface responsiva
□ Testado em diferentes navegadores
□ Sem erros no console do navegador
□ Arquivo ZIP com todos os arquivos
*/

