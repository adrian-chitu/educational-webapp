document.addEventListener("DOMContentLoaded", onload);

function onload() {
  let lForm = document.forms["newPassword-form"];
  lForm.addEventListener("submit", submitPassword);
}

function submitPassword(event) {
  event.preventDefault();
  let lForm = document.forms["newPassword-form"];
  let password = lForm["password"].value;

  let params = {
    password,
  };

  doPost(window.location, params);
}

function doPost(url, params) {
  let req = new XMLHttpRequest();

  req.open("POST", url);
  req.setRequestHeader("Content-type", "application/json");

  req.send(JSON.stringify(params));

  req.onload = () => {
    const data = JSON.parse(req.response);
    if (!data.success) {
      displayError(data.message);
    } else {
      location.assign("http://localhost:4000/auth/login");
    }
  };
}

function displayError(err) {
  const msgElem = document.getElementById("err-msg");
  msgElem.innerHTML = err;
}
