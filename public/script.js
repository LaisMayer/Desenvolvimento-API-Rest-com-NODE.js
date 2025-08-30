const form = document.getElementById("alunoForm");
const lista = document.getElementById("lista");

let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

function salvarLocal() {
  localStorage.setItem("alunos", JSON.stringify(alunos));
}

function render() {
  lista.innerHTML = "";
  alunos.forEach((a) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.nome}</td>
      <td>${a.cpf}</td>
      <td>${a.telefone}</td>
      <td>${a.email}</td>
      <td>${a.matricula}</td>
      <td>${a.escola}</td>
      <td></td>
    `;

    const tdAcoes = tr.querySelector("td:last-child");

    // Botão editar
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    btnEdit.onclick = async () => {
      a.nome = prompt("Novo nome:", a.nome) || a.nome;
      a.email = prompt("Novo e-mail:", a.email) || a.email;

      await fetch(`/api/alunos/${a.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(a)
      });

      salvarLocal();
      render();
    };

    // Botão excluir
    const btnDel = document.createElement("button");
    btnDel.textContent = "Excluir";
    btnDel.onclick = async () => {
      await fetch(`/api/alunos/${a.id}`, { method: "DELETE" });
      alunos = alunos.filter(x => x.id !== a.id);
      salvarLocal();
      render();
    };

    tdAcoes.appendChild(btnEdit);
    tdAcoes.appendChild(btnDel);
    lista.appendChild(tr);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const novo = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
    matricula: document.getElementById("matricula").value,
    escola: document.getElementById("escola").value,
  };

  const res = await fetch("/api/alunos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo)
  });
  const criado = await res.json();

  alunos.push(criado);
  salvarLocal();
  render();
  form.reset();
});

async function carregar() {
  const res = await fetch("/api/alunos");
  alunos = await res.json();
  salvarLocal();
  render();
}

carregar();
