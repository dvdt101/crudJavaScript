function fetchJson(url) {
  return fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw Error(resp.statusText);
    }
  });
}

function solution1() {
  var employeesPromise = fetch("http://localhost:3000/employees");
  employeesPromise.then((resp) => {
    resp.json().then((employees) => {
      let rolesPromise = fetch("http://localhost:3000/roles");
      rolesPromise.then((resp2) => {
        resp2.json().then((roles) => {
          let table = renderTable(employees, roles);
          document.getElementById("app").innerHTML = table;
        });
      });
    });
  });
}

function solution2() {
  fetchJson("http://localhost:3000/employees")
    .then((employees) => {
      fetchJson("http://localhost:3000/roles")
        .then((roles) => {
          let table = renderTable(employees, roles);
          document.getElementById("app").innerHTML = table;
        })
        .catch((error) => {
          showErro();
        });
    })
    .catch((error) => {
      showErro();
    });
}

function solution3() {
  let empPromise = fetchJson("http://localhost:3000/employees");
  let rolesPromise = fetchJson("http://localhost:3000/roles");

  Promise.all([empPromise, rolesPromise]).then((result) => {
    let employees = result[0];
    let roles = result[1];
    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
  }, showErro);
}

async function solution4() {
  try {
    let employees = await fetchJson("http://localhost:3000/employees");
    let roles = await fetchJson("http://localhost:3000/roles");
    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
  } catch (error) {
    showErro();
  }
}

async function solution5() {
  try {
    let [employees, roles] = await Promise.all([
      fetchJson("http://localhost:3000/employees"),
      fetchJson("http://localhost:3000/roles"),
    ]);

    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
  } catch (error) {
    showErro(error);
  }
}

function renderTable(employees, roles) {
  let rows = employees.map((employees) => {
    let role = roles.find((role) => role.id == employees.role_id);
    return `<tr><td>${employees.id}</td><td>${employees.name}</td><td>${role.name}</td></tr>`;
  });

  return `<table>${rows.join("")}</table>`;
}

function showErro(error) {
  document.getElementById("app").innerHTML = "Erro ao carregar dados";
  console.error(error);
}

solution5();
