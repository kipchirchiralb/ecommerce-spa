fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((jsondata) => {
    console.log(jsondata);
    buildUI(jsondata);
    addEventsToButtons();
    // localStorage.setItem("products", JSON.stringify(jsondata));
  });

//async

// callback functions------------------------------ funcitonal prgramming in js

function buildUI(productsArray) {
  const productsSectionEl = document.getElementById("products");
  productsArray.forEach((product) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product");
    // child elements
    let productImage = document.createElement("img");
    productImage.setAttribute("src", product.image);
    productImage.setAttribute("alt", product.title);

    let productTitle = document.createElement("h3");
    productTitle.textContent = product.title;

    let productCat = document.createElement("p");
    productCat.setAttribute("class", "category");
    productCat.textContent = product.category;

    let productDesc = document.createElement("p");
    productDesc.classList.add("description");
    productDesc.textContent = product.description.slice(0, 91) + "...";

    let actionDiv = document.createElement("div");

    let productPrice = document.createElement("p");
    productPrice.classList.add("price");
    productPrice.textContent = "KSH. " + product.price;

    let addToCartBtn = document.createElement("button");
    addToCartBtn.setAttribute("id", product.id + "-btn");
    addToCartBtn.classList.add("add-to-cart");
    addToCartBtn.textContent = "Add To Cart";

    // putting the elements on the page
    actionDiv.append(productPrice);
    actionDiv.append(addToCartBtn);
    productDiv.append(productImage);
    productDiv.append(productCat);
    productDiv.append(productTitle);
    productDiv.append(productDesc);
    productDiv.append(actionDiv);
    // adding each product div into the section element
    productsSectionEl.append(productDiv);
  });
}

let cartList = [];

function checkStorageForCartList() {
  if (localStorage.getItem("cartlist")) {
    cartList = JSON.parse(localStorage.getItem("cartlist"));
  }
}
checkStorageForCartList();

// a function that adds even listeners to all add-to-cart buttons

function addEventsToButtons() {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target);
      console.log(
        e.target.parentElement.parentElement.querySelector("h3").textContent
      );
      checkStorageForCartList();
      let newCartItem = {
        id: e.target.id.split("-")[0],
        title:
          e.target.parentElement.parentElement.querySelector("h3").textContent,
        price: e.target.previousElementSibling.textContent,
        count: "",
      };
      cartList.push(newCartItem);
      localStorage.setItem("cartlist", JSON.stringify(cartList));
      // console.log(cartList);
      updateCartCount();
    });
  });
}

function updateCartCount() {
  checkStorageForCartList();
  document.querySelector(".cart-count").textContent = cartList.length;
}
updateCartCount();

document.getElementById("cart-icon").addEventListener("click", function () {
  document.getElementById("cart-display").classList.toggle("hidden");
  if (!document.getElementById("cart-display").classList.contains("hidden")) {
    checkStorageForCartList();
    populateCartDisplay(cartList);
  }
});

function populateCartDisplay(list) {
  let unorderedList = document.getElementById("cart-output");
  unorderedList.innerHTML = "";
  list.forEach((product) => {
    let pLI = document.createElement("li");
    let pname = document.createElement("p");
    let pprice = document.createElement("p");
    pname.textContent = product.title;
    pprice.textContent = product.price;
    pLI.append(pname);
    pLI.append(pprice);
    unorderedList.append(pLI);
  });
}

// localStorage.clear();
