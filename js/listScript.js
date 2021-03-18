let conteudoTabela = document.getElementById("conteudoTabela");
let employees = [];
let roles = [];

async function init() {
  [employees, roles] = await Promise.all([listEmployees(), listRoles()]);
  renderTable();
}

function renderTable() {
  conteudoTabela.innerHTML = "";
  for (const employee of employees) {
    let role = roles.find((role) => role.id == employee.role_id);
    const row = document.createElement("tr");
    const cellId = document.createElement("td");
    const cellName = document.createElement("td");
    const cellRole = document.createElement("td");
    const cellSalary = document.createElement("td");
    cellId.textContent = employee.id;
    cellName.textContent = employee.name;
    cellRole.textContent = role.name;
    cellSalary.textContent = employee.salary;
    row.appendChild(cellId);
    row.appendChild(cellName);
    row.appendChild(cellRole);
    row.appendChild(cellSalary);
    conteudoTabela.appendChild(row);
  }
}

init();
