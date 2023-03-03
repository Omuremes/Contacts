//? АПИ для запросов
const API = "http://localhost:8000/cars";

const carList = document.querySelector("#car-list");

//? пагинация
const paginList = document.querySelector(".pag-list");
const pref = document.querySelector(".prev");
const nexT = document.querySelector(".next");

//? инпуты для поиска
const searchInput = document.querySelector("#search");
//? переменная по которой делаем запрос на поиск
let searchV = "";

//? макс кол машин
const limit = 6;
//? текущая страница
let currPage = 1;
//? макс кол страниц
let pTC = 1;

getCarss();
async function getCarss() {
  const res = await fetch(
    `${API}?carname_like=${searchV}&_limit=${limit}&_page=${currPage}`
  );
  const count = res.headers.get("x-total-count");
  pTC = Math.ceil(count / limit);
  const data = await res.json();
  renderr(data);
}

async function getOneCarss(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();
  return data;
}

function renderr(arr) {
  //? чтобы не копировало
  carList.innerHTML = "";
  arr.forEach((item) => {
    carList.innerHTML += `<div class="card m-5" style="width: 18rem">
    <img
      src="${item.image}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${item.carname}</h5>
      <p class="card-text">
        ${item.description.slice(0, 70)}...
      </p>
      <p class="card-text">
        $ ${item.price}
      </p>
      <div class="father">
      <button href="#" class="button button-buy">Buy</button>
      </div>
    </div>
  </div>`;
  });
  //? чтобы пагинация тоже отображалось
  rendPagg();
}

//? для поиска
searchInput.addEventListener("input", () => {
  searchV = searchInput.value;
  currPage = 1;
  getCarss();
});

function rendPagg() {
  paginList.innerHTML = "";
  for (let i = 1; i <= pTC; i++) {
    paginList.innerHTML += `
        <li class="page-item ${currPage == i ? "active" : ""}">
           <button class="page-link page_number">${i}</button>
        </li>
        `;
  }
  //? чтобы кнопка pref была не активна на первой странице
  if (currPage == 1) {
    pref.classList.add("disabled");
  } else {
    pref.classList.remove("disabled");
  }

  //? чтобы кнопка nexT была не активна на последней странице
  if (currPage == pTC) {
    nexT.classList.add("disabled");
  } else {
    nexT.classList.remove("disabled");
  }
}

//? обработчик события чтобы перейти на определенную страницу
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("page_number")) {
    console.log("CLOCK", currPage);
    currPage = e.target.innerText;
    getCarss();
  }
});

//? обработчик события чтобы перейти на следующию страницу
nexT.addEventListener("click", () => {
  if (currPage == pTC) {
    return;
  }
  currPage++;
  getCarss();
});

//? обработчик события чтобы перейти на предыдущую страницу
pref.addEventListener("click", () => {
  if (currPage == 1) {
    return;
  }
  currPage--;
  getCarss();
});
