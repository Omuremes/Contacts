const API = "http://localhost:8000/contacts";
const list = document.querySelector("#contact-list");
const addBook = document.querySelector("#add-contact");
const nameInput = document.querySelector("#name");
const numberInput = document.querySelector("#number");
const nameEditInput = document.querySelector("#edit-name");
const numberEditInput = document.querySelector("#edit-number");
const editSaveBtn = document.querySelector("#btn-save-edit");

getContact();

async function getContact() {
  const res = await fetch(API);
  const data = await res.json();
  render(data);
}

async function addContact(contact) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getContact();
}

async function getOneContact(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();
  return data;
}

async function editContact(id, editedContack) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedContack),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getContact();
}

async function deleteBtn(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  getContact();
}

function render(arr) {
  list.innerHTML = "";
  arr.forEach((item) => {
    list.innerHTML += `
    <div class="card m-4" style="width: 13rem">
    <div class="card-body">
      <h5 class="card-name">${item.name}</h5>
      <p class="card-number">${item.number}</p>
      <button href="#" id="${item.id}" class="btn btn-danger btn-delete">DELETE</button>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" id=${item.id} href="#" class="btn btn-warning btn-edit">EDIT</button>
    </div> 
  </div>
    `;
  });
}

addBook.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!nameInput.value.trim() || !numberInput.value.trim()) {
    alert("Поля заполни");
    return;
  }

  const contacts = {
    name: nameInput.value,
    number: numberInput.value,
  };
  addContact(contacts);
  nameInput.value = "";
  numberInput.value = "";
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    deleteBtn(e.target.id);
  }
});

let id = null;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-edit")) {
    id = e.target.id;
    const contact = await getOneContact(e.target.id);
    nameEditInput.value = contact.name;
    numberEditInput.value = contact.number;
  }
});

editSaveBtn.addEventListener("click", () => {
  if (!nameEditInput.value.trim() || !numberEditInput.value.trim()) {
    alert("Заполни поля");
    return;
  }

  const editedContack = {
    name: nameEditInput.value,
    number: numberEditInput.value,
  };
  editContact(id, editedContack);
});
