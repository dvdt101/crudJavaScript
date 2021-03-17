const baseUrl = "http://localhost:3000";

function fetchJson(url, options) {
  return fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      showError("error on loading data", error);
      throw error;
    });
}

function listEmployees() {
  return fetchJson(`${baseUrl}/employees`);
}
function listRoles() {
  return fetchJson(`${baseUrl}/roles`);
}

function updateEmployee(id, employee) {
  return fetchJson(`${baseUrl}/employees/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(employee),
  });
}

function createEmployee(employee) {
  return fetchJson(`${baseUrl}/employees`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(employee),
  });
}

function deleteEmployee(id) {
  return fetchJson(`${baseUrl}/employees/${id}`, {
    method: "DELETE",
  });
}
/*
//criar
fetch("http://localhost:3000/employees", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(employee),
});

//atualizar
fetch(`http://localhost:3000/employees/${id}`, {
  method: "PUT",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(employee),
});

//EXCLUIR
fetch(`http://localhost:3000/employees/${id}`, {
  method: "DELETE",
});

*/
