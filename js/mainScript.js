let employees = [];
let roles = [];
let selectedItem;
const listEl = document.querySelector("ul");
const formEL = document.querySelector("form");
const bdelete = document.getElementById("bdelete");
const bcancel = document.getElementById("bcancel");
const bsubmit = document.getElementById("bsubmit");

async function init() {
  [employees, roles] = await Promise.all([listEmployees(), listRoles()]);
  renderRole();
  renderData();
  clearSeletion();
  bcancel.addEventListener("click", clearSeletion);
  formEL.addEventListener("submit", onSubmit);
  bdelete.addEventListener("click", onDelete);
}

async function onSubmit(event) {
  event.preventDefault();
  const employeeData = {
    name: formEL.name.value,
    salary: formEL.Salary.valueAsNumber,
    role_id: +formEL.role_id.value,
  };

  if (!employeeData.name || !employeeData.salary || !employeeData.role_id) {
    showError("You must fill all fields");
  } else if (selectedItem) {
    const updateItem = await updateEmployee(selectedItem.id, employeeData);
    const i = employees.indexOf(selectedItem);
    employees[i] = updateItem;
    renderData();
    selectItem(updateItem, listEl.children[i]);
  } else {
    const createdItem = await createEmployee(employeeData);
    employees.push(createdItem);
    renderData();
    selectItem(createdItem, listEl.lastChild);
    listEl.lastChild.scrollIntoView();
  }
}

async function onDelete() {
  if (selectedItem) {
    await deleteEmployee(selectedItem.id);
    const i = employees.indexOf(selectedItem);
    employees.splice(i, 1);
    renderData();
    clearSeletion();
  }
}

function selectItem(employee, li) {
  clearSeletion();
  selectedItem = employee;
  li.classList.add("selected");
  formEL.name.value = employee.name;
  formEL.Salary.valueAsNumber = employee.salary;
  formEL.role_id.value = employee.role_id;
  bdelete.style.display = "inline";
  bcancel.style.display = "inline";
  bsubmit.textContent = "Update";
}

function clearSeletion() {
  clearError();
  selectedItem = undefined;
  const li = listEl.querySelector(".selected");
  if (li) {
    li.classList.remove("selected");
  }
  formEL.name.value = "";
  formEL.Salary.valueAsNumber = "";
  formEL.role_id.value = "";
  bdelete.style.display = "none";
  bcancel.style.display = "none";
  bsubmit.textContent = "Create";
}

function renderData() {
  listEl.innerHTML = "";
  for (const employee of employees) {
    let role = roles.find((role) => role.id == employee.role_id);
    const li = document.createElement("li");
    const divName = document.createElement("div");
    const divRole = document.createElement("div");
    divName.textContent = employee.name;
    divRole.textContent = role.name;
    li.appendChild(divName);
    li.appendChild(divRole);
    listEl.appendChild(li);
    li.addEventListener("click", () => selectItem(employee, li));
  }
}

function renderRole() {
  for (const role of roles) {
    const op = document.createElement("option");
    op.textContent = role.name;
    op.value = role.id;
    formEL.role_id.appendChild(op);
  }
}

function showError(message, error) {
  if (!message) {
    console.log(error);
  } else {
    document.getElementById("errors").innerHTML = message;
    if (error) console.log(error);
  }
}

function clearError() {
  document.getElementById("errors").innerHTML = "";
}
init();
