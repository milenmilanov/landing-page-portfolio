const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("nav");

// Mobile menu
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
  });

  document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
    });
  });
}

// Newsletter interaction
const newsletter = document.getElementById("newsletter");

if (newsletter) {
  newsletter.addEventListener("submit", function(event) {
    event.preventDefault();

    const button = newsletter.querySelector("button");

    if (!button) return;

    const originalText = button.textContent;

    button.textContent = "WELCOME ✓";

    setTimeout(() => {
      button.textContent = originalText || "JOIN →";
      newsletter.reset();
    }, 2500);
  });
}
