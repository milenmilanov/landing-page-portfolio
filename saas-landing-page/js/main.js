const navbar = document.querySelector(".navbar");
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");


// =========================
// NAVBAR SCROLL EFFECT
// =========================

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// =========================
// MOBILE MENU
// =========================

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// =========================
// WORKFLOW TABS
// =========================

const workflowTabs = document.querySelectorAll(".workflow-tab");
const workflowScreens = document.querySelectorAll(".workflow-screen");

workflowTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    workflowTabs.forEach(item => {
      item.classList.remove("active");
    });

    workflowScreens.forEach(screen => {
      screen.classList.remove("active");
    });

    tab.classList.add("active");

    const activeScreen = document.getElementById(target);

    if (activeScreen) {
      activeScreen.classList.add("active");
    }
  });
});


// =========================
// PRICING TOGGLE
// =========================

const billingButtons = document.querySelectorAll(".billing");
const dynamicPrices = document.querySelectorAll(".dynamic-price");

billingButtons.forEach(button => {
  button.addEventListener("click", () => {
    const period = button.dataset.period;

    billingButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    dynamicPrices.forEach(price => {
      const newPrice = price.dataset[period];

      price.style.opacity = "0";
      price.style.transform = "translateY(6px)";

      setTimeout(() => {
        price.textContent = newPrice;

        price.style.opacity = "1";
        price.style.transform = "translateY(0)";
      }, 180);
    });
  });
});

dynamicPrices.forEach(price => {
  price.style.transition =
    "opacity 0.2s ease, transform 0.2s ease";
});


// =========================
// FAQ ACCORDION
// =========================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    faqItems.forEach(otherItem => {
      otherItem.classList.remove("open");
    });

    if (!isOpen) {
      item.classList.add("open");
    }
  });
});


// =========================
// SIDEBAR INTERACTION
// =========================

const sidebarButtons = document.querySelectorAll(".sidebar-icon");

sidebarButtons.forEach(button => {
  button.addEventListener("click", () => {
    sidebarButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
  });
});


// =========================
// AI INPUT DEMO
// =========================

const aiButton = document.querySelector(".ai-input button");
const aiInput = document.querySelector(".ai-input span");

if (aiButton && aiInput) {
  aiButton.addEventListener("click", () => {
    const originalText = aiInput.textContent;

    aiInput.textContent = "Thinking...";

    aiButton.textContent = "•••";

    setTimeout(() => {
      aiInput.textContent = "Your workspace is ready.";
      aiButton.textContent = "✓";

      setTimeout(() => {
        aiInput.textContent = originalText;
        aiButton.textContent = "↑";
      }, 1800);
    }, 900);
  });
}


// =========================
// SMOOTH ANCHOR SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(event) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      const navbarOffset = 100;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navbarOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});
