fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((jsondata) => {
    console.log(jsondata);
    buildUI(jsondata);
    localStorage.setItem("products", JSON.stringify(jsondata));
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

// introduction to local storage
// saving data
localStorage.setItem("password", "khbsdfkcnglsdnkjs . jfnwbcnnv");
localStorage.setItem("numbers", [1, 2, 3, 3]);
// retrieving/getting  data
console.log(localStorage.getItem("numbers"));
console.log(localStorage.getItem("password"));
console.log(localStorage.getItem("pass"));
