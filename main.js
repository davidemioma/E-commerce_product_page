"use strict";

//Selectors
const toggler = document.querySelector(".nav_toggler");
const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".modal_close");
const overlay = document.querySelector(".overlay");
const imgSelector = document.querySelector(".img_selector");
const allSlides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider_btn-right");
const btnLeft = document.querySelector(".slider_btn-left");
const quantity = document.querySelector(".quantity");
const amount = document.querySelector(".value");
const addToCartBtn = document.querySelector(".btn_add");
const cartModal = document.querySelector(".cart_modal");
const cart = document.querySelector(".cart");
const cartAmount = document.querySelector(".cart_amount");

const maxSlides = allSlides.length;
let curSlides = 0;
let value = 0;
let cartValue = 0;

amount.textContent = value;
cartAmount.textContent = cartValue;

//Event lIsteners
addToCartBtn.addEventListener("click", addToCart);

cartModal.addEventListener("click", deleteFromCart);

cart.addEventListener("click", function (e) {
  if (value <= 0) return;

  cartModal.classList.toggle("hidden");
});

quantity.addEventListener("click", addOrDrop);

toggler.addEventListener("click", openModal);

btnClose.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

createImgDot();

activateDot(curSlides);

goToSlides(curSlides);

btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", previousSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();

  if (e.key === "ArrowLeft") previousSlide();
});

imgSelector.addEventListener("click", function (e) {
  if (e.target.classList.contains("img_dot")) {
    const slide = e.target.getAttribute("data-slide");
    activateDot(slide);
    goToSlides(slide);
  }
});

//Functions
function addToCart() {
  if (value <= 0) return;
  const html = `<h2>Cart</h2>
        <div class="line"></div>
        <div class="checkout">
          <img
            class="cart_img"
            src="./images/image-product-1-thumbnail.jpg"
            alt=""
          />
          <span>
            <h2>Fall Limited Edition Sneaker</h2>
            <p>$125.00 * ${value}</p>
          </span>
          <img class="remove" src="./images/icon-delete.svg" alt="" />
        </div>
        <button class="checkout_btn">Checkout</button>`;
  cartModal.insertAdjacentHTML("beforeend", html);
  cartValue++;
  cartAmount.textContent = cartValue;
}

function deleteFromCart(e) {
  const item = e.target;

  if (item.classList.contains("remove")) {
    const cartItem = item.parentElement;
    cartItem.remove();
    cartValue--;
    cartAmount.textContent = cartValue;
  }
}

function addOrDrop(e) {
  if (e.target.classList.contains("add") && value <= 9) {
    value += 1;
  }
  if (e.target.classList.contains("minus") && value > 0) {
    value -= 1;
  }
  amount.textContent = value;
}

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function goToSlides(slide) {
  allSlides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
}

function nextSlide() {
  if (curSlides === maxSlides - 1) {
    curSlides = 0;
  } else {
    curSlides++;
  }
  goToSlides(curSlides);
  activateDot(curSlides);
}

function previousSlide() {
  if (curSlides === 0) {
    curSlides = maxSlides - 1;
  } else {
    curSlides--;
  }
  goToSlides(curSlides);
  activateDot(curSlides);
}

function createImgDot() {
  allSlides.forEach((s, i) => {
    const html = `<span class="img_dot" data-slide="${i}">
        <img src="./images/image-product-${i + 1}-thumbnail.jpg" alt="" />
        </span>`;
    imgSelector.insertAdjacentHTML("beforeend", html);
  });
}

function activateDot(slide) {
  document.querySelectorAll(".img_dot").forEach((dot) => {
    dot.classList.remove("dot_active");
  });

  document
    .querySelector(`.img_dot[data-slide="${slide}`)
    .classList.add("dot_active");
}
