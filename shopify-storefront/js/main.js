// ========================================
// KŌRA STOREFRONT INTERACTIONS
// ========================================

const body = document.body;

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const quickViewOverlay = document.getElementById("quickViewOverlay");
const closeQuickView = document.getElementById("closeQuickView");

const modalProductName = document.getElementById("modalProductName");
const modalProductPrice = document.getElementById("modalProductPrice");
const modalVisual = document.getElementById("modalVisual");
const addToCartButton = document.getElementById("addToCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const drawerCount = document.getElementById("drawerCount");
const subtotalElement = document.getElementById("subtotal");
const progressBar = document.getElementById("progressBar");
const shippingMessage = document.getElementById("shippingMessage");
const emptyCart = document.getElementById("emptyCart");

const continueShopping = document.getElementById("continueShopping");

let selectedProduct = null;
let selectedSize = null;

let cart = [];


// ========================================
// HEADER SCROLL
// ========================================

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// ========================================
// MOBILE MENU
// ========================================

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("open");
  body.classList.add("no-scroll");
});

closeMenu.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  body.classList.remove("no-scroll");
}


// ========================================
// QUICK VIEW
// ========================================

document.querySelectorAll(".product-card").forEach(card => {
  const quickViewButton = card.querySelector(".quick-view");

  quickViewButton.addEventListener("click", () => {
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    selectedProduct = {
      name,
      price
    };

    selectedSize = null;

    modalProductName.textContent = name;
    modalProductPrice.textContent = `€${price}`;
    addToCartButton.querySelector("span").textContent = `€${price}`;

    modalVisual.textContent =
      name.includes("Studio")
        ? "06"
        : name.includes("Form")
        ? "FORM"
        : "KŌRA";

    document.querySelectorAll(".size-options button").forEach(button => {
      button.classList.remove("active");
    });

    quickViewOverlay.classList.add("open");
    body.classList.add("no-scroll");
  });
});

closeQuickView.addEventListener("click", closeQuickViewModal);

quickViewOverlay.addEventListener("click", event => {
  if (event.target === quickViewOverlay) {
    closeQuickViewModal();
  }
});

function closeQuickViewModal() {
  quickViewOverlay.classList.remove("open");
  body.classList.remove("no-scroll");
}


// ========================================
// SIZE SELECTION
// ========================================

document.querySelectorAll(".size-options button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".size-options button").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    selectedSize = button.dataset.size;
  });
});


// ========================================
// ADD TO CART
// ========================================

addToCartButton.addEventListener("click", () => {
  if (!selectedSize) {
    addToCartButton.textContent = "SELECT A SIZE";

    setTimeout(() => {
      if (selectedProduct) {
        addToCartButton.innerHTML = `
          ADD TO BAG
          <span>€${selectedProduct.price}</span>
        `;
      }
    }, 1200);

    return;
  }

  const existingItem = cart.find(
    item =>
      item.name === selectedProduct.name &&
      item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...selectedProduct,
      size: selectedSize,
      quantity: 1
    });
  }

  updateCart();

  closeQuickViewModal();

  setTimeout(() => {
    openCartDrawer();
  }, 250);
});


// ========================================
// CART DRAWER
// ========================================

cartButton.addEventListener("click", openCartDrawer);

closeCart.addEventListener("click", closeCartDrawer);

cartOverlay.addEventListener("click", closeCartDrawer);

if (continueShopping) {
  continueShopping.addEventListener("click", () => {
    closeCartDrawer();
  });
}

function openCartDrawer() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  body.classList.add("no-scroll");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  body.classList.remove("no-scroll");
}


// ========================================
// CART RENDERING
// ========================================

function updateCart() {
  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalQuantity;

  drawerCount.textContent =
    totalQuantity === 1
      ? "1 ITEM"
      : `${totalQuantity} ITEMS`;

  subtotalElement.textContent = `€${subtotal}`;

  updateShippingProgress(subtotal);

  renderCartItems();
}


// ========================================
// FREE SHIPPING PROGRESS
// ========================================

function updateShippingProgress(subtotal) {
  const freeShippingTarget = 90;

  const progress = Math.min(
    (subtotal / freeShippingTarget) * 100,
    100
  );

  progressBar.style.width = `${progress}%`;

  if (subtotal >= freeShippingTarget) {
    shippingMessage.textContent =
      "YOU'VE UNLOCKED FREE SHIPPING";
  } else {
    const remaining = freeShippingTarget - subtotal;

    shippingMessage.textContent =
      `ADD €${remaining} FOR FREE SHIPPING`;
  }
}


// ========================================
// RENDER CART ITEMS
// ========================================

function renderCartItems() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <p>Your bag is empty.</p>
        <a href="#shop" id="continueShoppingDynamic">
          CONTINUE SHOPPING
        </a>
      </div>
    `;

    const dynamicContinue = document.getElementById(
      "continueShoppingDynamic"
    );

    dynamicContinue.addEventListener("click", closeCartDrawer);

    return;
  }

  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");

    itemElement.className = "cart-item";

    itemElement.innerHTML = `
      <div class="cart-item-image">
        KŌRA
      </div>

      <div class="cart-item-info">

        <h4>${item.name}</h4>

        <p>
          SIZE ${item.size} · €${item.price}
        </p>

        <div class="quantity-controls">

          <button
            class="decrease"
            data-index="${index}"
          >
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            class="increase"
            data-index="${index}"
          >
            +
          </button>

        </div>

        <button
          class="remove-item"
          data-index="${index}"
        >
          Remove
        </button>

      </div>
    `;

    cartItems.appendChild(itemElement);
  });

  addCartItemListeners();
}


// ========================================
// CART CONTROLS
// ========================================

function addCartItemListeners() {
  document.querySelectorAll(".increase").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart[index].quantity += 1;

      updateCart();
    });
  });

  document.querySelectorAll(".decrease").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart[index].quantity -= 1;

      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }

      updateCart();
    });
  });

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      updateCart();
    });
  });
}


// ========================================
// NEWSLETTER
// ========================================

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage =
  document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", event => {
  event.preventDefault();

  newsletterMessage.textContent =
    "WELCOME TO THE PRIVATE LIST.";

  newsletterForm.reset();

  setTimeout(() => {
    newsletterMessage.textContent = "";
  }, 3500);
});


// ========================================
// SCROLL REVEAL
// ========================================

const revealElements =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}


// ========================================
// SHOW ABOVE-FOLD CONTENT IMMEDIATELY
// ========================================

window.addEventListener("load", () => {
  revealElements.forEach(element => {
    const rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight) {
      element.classList.add("visible");
    }
  });
});


// ========================================
// ESCAPE KEY
// ========================================

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeQuickViewModal();
    closeCartDrawer();
    closeMobileMenu();
  }
});


// ========================================
// INITIAL CART
// ========================================

updateCart();
