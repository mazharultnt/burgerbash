// Mobile menu, menu tabs and the booking form.

// ---------- Mobile menu ----------
var menuButton = document.getElementById("menu-button");
var mainNav = document.getElementById("main-nav");

menuButton.addEventListener("click", function () {
  var isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

mainNav.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// ---------- Menu tabs ----------
var tabBox = document.getElementById("menu-tabs");
var menuGrid = document.getElementById("menu-grid");

function showGroup(group) {
  tabBox.querySelectorAll(".tab").forEach(function (button) {
    button.classList.toggle("active", button.textContent === group);
  });

  var items = menuItems.filter(function (item) {
    return item.group === group;
  });

  menuGrid.innerHTML = items
    .map(function (item) {
      var badge = item.badge ? '<span class="menu-badge">' + item.badge + "</span>" : "";
      return (
        '<article class="menu-card">' +
        '<div class="menu-image"><img src="' + item.image + '" alt="' + item.name + '" onerror="this.style.display=\'none\'"></div>' +
        '<div class="menu-body">' +
        "<h3>" + item.name + badge + "</h3>" +
        "<p>" + item.text + "</p>" +
        '<span class="menu-price">&#2547;' + item.price + "</span>" +
        "</div>" +
        "</article>"
      );
    })
    .join("");
}

var groups = [];
menuItems.forEach(function (item) {
  if (groups.indexOf(item.group) === -1) {
    groups.push(item.group);
  }
});

groups.forEach(function (group) {
  var button = document.createElement("button");
  button.type = "button";
  button.className = "tab";
  button.textContent = group;
  button.addEventListener("click", function () {
    showGroup(group);
  });
  tabBox.appendChild(button);
});

showGroup(groups[0]);

// ---------- Booking form ----------
var form = document.getElementById("book-form");
var success = document.getElementById("book-success");
var dateInput = document.getElementById("date");

// Do not allow a date in the past
function todayAsText() {
  var now = new Date();
  var month = String(now.getMonth() + 1).padStart(2, "0");
  var day = String(now.getDate()).padStart(2, "0");
  return now.getFullYear() + "-" + month + "-" + day;
}
dateInput.min = todayAsText();

function setError(id, message) {
  document.getElementById(id + "-error").textContent = message;
  document.getElementById(id).classList.toggle("input-error", message !== "");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var valid = true;

  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var date = dateInput.value;
  var guests = document.getElementById("guests").value;

  if (name.length < 2) {
    setError("name", "Please enter your name.");
    valid = false;
  } else {
    setError("name", "");
  }

  var digits = phone.replace(/\D/g, "");
  if (!/^[0-9+\-\s()]+$/.test(phone) || digits.length < 7) {
    setError("phone", "Please enter a valid phone number.");
    valid = false;
  } else {
    setError("phone", "");
  }

  if (date === "" || date < todayAsText()) {
    setError("date", "Please pick today or a later date.");
    valid = false;
  } else {
    setError("date", "");
  }

  if (!valid) {
    success.hidden = true;
    return;
  }

  success.textContent =
    "Thank you, " + name + "! Your table for " + guests + " on " + date + " is noted. (Demo only: nothing was sent.)";
  success.hidden = false;
  form.reset();
  document.getElementById("guests").value = "2";
});

document.getElementById("year").textContent = new Date().getFullYear();
