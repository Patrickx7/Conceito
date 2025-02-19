// Função para adicionar um card
function adicionarCard(colunaId, titulo) {
    const osNumber = prompt("Número da OS:");
    const descricao = prompt("Descrição da demanda:");
    const status = "Pendente";
    
    if (!osNumber || !descricao) return;
    
    const coluna = document.getElementById(colunaId);
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-status", status);
    card.innerHTML = `
        <h3>${titulo}</h3>
        <p><strong>OS:</strong> ${osNumber}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
        <p><strong>Status:</strong> <span class="status-text status-pendente">${status}</span></p>
        <button class="status-btn" onclick="alterarStatus(this)">
            <i class="fas fa-sync-alt"></i> Alterar Status
        </button>
        <button class="edit-btn" onclick="editarCard(this)">
            <i class="fas fa-edit"></i> Editar
        </button>
        <button class="delete-btn" onclick="excluirCard(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    coluna.appendChild(card);
}

// Função para editar um card
function editarCard(button) {
    const card = button.parentElement;
    const osNumber = prompt("Editar Número da OS:", card.children[1].textContent.replace("OS: ", ""));
    const descricao = prompt("Editar Descrição:", card.children[2].textContent.replace("Descrição: ", ""));
    
    if (osNumber && descricao) {
        card.children[1].textContent = `OS: ${osNumber}`;
        card.children[2].textContent = `Descrição: ${descricao}`;
    }
}

// Função para alterar o status de um card
function alterarStatus(button) {
    const card = button.parentElement;
    const statusText = card.querySelector(".status-text");
    let newStatus = statusText.textContent === "Pendente" ? "Em andamento" : (statusText.textContent === "Em andamento" ? "Concluído" : "Pendente");
    statusText.textContent = newStatus;
    card.setAttribute("data-status", newStatus);
    
    statusText.classList.remove("status-pendente", "status-andamento", "status-concluido");
    if (newStatus === "Pendente") statusText.classList.add("status-pendente");
    if (newStatus === "Em andamento") statusText.classList.add("status-andamento");
    if (newStatus === "Concluído") statusText.classList.add("status-concluido");
}

// Função para excluir um card
function excluirCard(button) {
    if (confirm("Tem certeza que deseja excluir este card?")) {
        const card = button.parentElement;
        card.remove();
    }
}

// Função para filtrar cards por statu
function filtrarStatus() {
    const filtro = document.getElementById("status-filter").value;
    document.querySelectorAll(".card").forEach(card => {
        card.style.display = filtro === "" || card.getAttribute("data-status") === filtro ? "block" : "none";
    });
}