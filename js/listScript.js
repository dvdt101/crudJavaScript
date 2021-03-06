let conteudoTabela = document.getElementById("conteudoTabela");
let isRender;
let employees = [];
let roles = [];
let sortSelect = document.getElementById("sort");
var check = document.querySelectorAll("input");

async function init() {
  [employees, roles] = await Promise.all([listEmployees(), listRoles()]);
  employees.sort(arraySortNameAscending);
  sortSelect.addEventListener("change", () => selectedSort());

  for (var i = 0; i < check.length; i++) {
    check[i].addEventListener("click", updateTable);
  }

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
    isRender = true;
  }
}

function updateTable() {
  conteudoTabela.innerHTML = "";
  let isAnyChecked = false;
  for (var i = 0; i < check.length; i++) {
    if (check[i].checked == true) {
      isAnyChecked = true;
      let checkedId = check[i].id;
      for (const employee of employees) {
        let role = roles.find((role) => role.id == employee.role_id);
        if (role.id == checkedId) {
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
    }
  }
  if (!isAnyChecked) {
    renderTable();
  }
}

function selectedSort() {
  if (sortSelect.value == 1) {
    employees.sort(arraySortNameAscending);
  } else if (sortSelect.value == 2) {
    employees.sort(arraySortNameDownward);
  } else if (sortSelect.value == 3) {
    employees.sort(arraySortSalaryAscending);
  } else if (sortSelect.value == 4) {
    employees.sort(arraySortSalaryDownward);
  }
  updateTable();
}

function arraySortNameAscending(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function arraySortNameDownward(a, b) {
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
}

function arraySortSalaryAscending(a, b) {
  if (a.salary < b.salary) {
    return -1;
  }
  if (a.salary > b.salary) {
    return 1;
  }
  return 0;
}

function arraySortSalaryDownward(a, b) {
  if (a.salary > b.salary) {
    return -1;
  }
  if (a.salary < b.salary) {
    return 1;
  }
  return 0;
}
init();
