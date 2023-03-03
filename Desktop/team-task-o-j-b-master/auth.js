const form = document.getElementById("cont");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const pass = document.getElementById("pass").value;
  const data = { name, pass };
  saveData(data);
})

function saveData(data) {
  fetch("http://localhost:8080/users")
    .then(response => response.json())
    .then(users => {
      const matchedUser = users.find(user => user.name === data.name && user.pass === data.pass);
      if (matchedUser) {
        const message = document.getElementById("ok");
        message.innerText = "Login successful. Redirecting in 2 seconds...";
        setTimeout(() => {
          window.location.href = "admin-panel.html";
        }, 2000);
      } else {
        const message = document.getElementById("error");
        message.innerText = "Invalid username or password";
      }
    })
    .catch(error => {
      console.error(error);
    });
}
