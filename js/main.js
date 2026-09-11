const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("nav");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
  });
});

const newsletter = document.getElementById("newsletter");

newsletter.addEventListener("submit", function(event) {
  event.preventDefault();

  const button = newsletter.querySelector("button");

  button.textContent = "WELCOME ✓";

  setTimeout(() => {
    button.textContent = "JOIN →";
    newsletter.reset();
  }, 2500);
});
