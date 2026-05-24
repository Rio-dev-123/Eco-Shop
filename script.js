const btn1 = document.getElementById("toggle1");
const btn = document.getElementById("toggle");
const slider = document.getElementById("holder");
const hr = document.getElementById("indicator");

let index = 0;

let items = document.querySelectorAll(".display-item");

let cartItem = [];
let cartPrice = [];
let cartImg = [];

const cart = document.getElementById("myCart");
const checkout = document.getElementById("checkout");

btn.addEventListener("click", () => {
  if (index === 0) {
    console.log("Already at Shop!");
  }

  if (index === 1) {
    index = (index + 1) % 2;
    slider.style.transform = `translateX(-${index * 100}vw)`;
    hr.style.left = `40px`;
  }
});

btn1.addEventListener("click", () => {
  if (index === 1) {
    console.log("Already at your Cart!");
  }

  if (index === 0) {
    index = (index + 1) % 2;
    slider.style.transform = `translateX(-${index * 100}vw)`;
    hr.style.left = `190px`;
  }
});

items.forEach((item) => {
  item.addEventListener("click", () => {
    let product = item.querySelector("h1").textContent;
    let priceElement = item.querySelector("p");
    let price = priceElement ? priceElement.textContent : "QAR 0.00";
    let img = item.querySelector("img").src;

    cartItem.push(product);
    cartPrice.push(price);
    cartImg.push(img);

    console.log("Added to cart:", product);
  });
});

checkout.addEventListener("click", () => {
  updateCart();
});


function updateCart() {
  cart.innerHTML = "";

  let total = 0;

  let cartHTML = `
    <p style="font-family: Poppins; font-size: 18px;">
      Newly added items won't appear until you click the Refresh Cart button below.
    </p>
    <button id="checkout">Refresh Cart</button>
    <ul class="display">
  `;

  for (let i = 0; i < cartItem.length; i++) {
    let numericPrice = parseFloat(cartPrice[i].replace("QAR", "").trim());
    total += numericPrice;

    cartHTML += `
      <li>
        <div class="display-item">
          <h1>${cartItem[i]}</h1>
          <img src="${cartImg[i]}" style="width: 225px; height: 225px; border-radius: 20px; padding: 10px;">
          <p>${cartPrice[i]}</p>
        </div>
      </li>
    `;
  }

  cartHTML += `</ul>`;

  cartHTML += `
    <h2 style="font-family: Poppins; margin-top: 20px;">
      Your total is: <strong>QAR ${total.toFixed(2)}</strong>
    </h2>

    <button id="fin" class="collections">Checkout</button>
  `;

  cart.innerHTML = cartHTML;
  document.getElementById("checkout").addEventListener("click", updateCart);
  document.getElementById("fin").addEventListener("click", clearCart);
}

function clearCart() {
  cart.innerHTML = `
    <p style="font-family: Poppins; font-size: 18px;">
      Newly added items won't appear until you click the Refresh Cart button below.
    </p>
    <button id="checkout">Refresh Cart</button>
  `;
  alert("Done! Thank you for shopping with Eco-Shop! Will see you next time!");
  cartItem.length = 0;
  cartPrice.length = 0;
  cartImg.length = 0;
  document.getElementById("checkout").addEventListener("click", updateCart);
}
