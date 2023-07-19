const bar=document.getElementById('bar');
const close=document.getElementById('close');
const nav=document.getElementById('navbar');
if(bar){
  bar.addEventListener('click',()=>{
    nav.classList.add('active');
  })
}
if(close){
  close.addEventListener('click',()=>{
    nav.classList.remove('active');
  })
}



var cart = [];

function addToCart(productName, price, quantityId, imageSrc) {
  var quantityInput = document.getElementById(quantityId);
  var quantity = parseInt(quantityInput.value);

  if (quantity > 0) {
    var existingProduct = cart.find(function(item) {
      return item.productName === productName;
    });

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      var newProduct = {
        productName: productName,
        price: price,
        quantity: quantity,
        imageSrc: imageSrc
      };
      cart.push(newProduct);
    }

    quantityInput.value = "1";
    updateCart();
    saveCart(); // Save cart after updating
  } else {
    alert("Quantity must be greater than 0");
  }
}

function removeFromCart(productName) {
  cart = cart.filter(function(item) {
    return item.productName !== productName;
  });

  updateCart();
  saveCart(); // Save cart after updating
}

function updateQuantity(productName, quantity) {
  var product = cart.find(function(item) {
    return item.productName === productName;
  });

  if (product) {
    product.quantity = quantity;
  }

  updateCart();
  saveCart(); // Save cart after updating
}

function updateCart() {
  var cartTable = document.getElementById("cartTable");
  cartTable.innerHTML = `
    <tr>
      <th>Product</th>
      <th>Image</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total</th>
      <th>Action</th>
    </tr>
  `;

  var totalCost = 0;

  cart.forEach(function(item) {
    var total = item.price * item.quantity;
    totalCost += total;

    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.productName}</td>
      <td><img src="${item.imageSrc}" alt="${item.productName}"></td>
      <td>${item.price}</td>
      <td><input type="number" value="${item.quantity}" onchange="updateQuantity('${item.productName}', this.value)" min="1"></td>
      <td>${total}</td>
      <td><button onclick="removeFromCart('${item.productName}')">Remove</button></td>
    `;

    cartTable.appendChild(row);
  });

  document.getElementById("totalCost").textContent = "Total Cost: ₹" + totalCost;
}

function placeOrder() {
  // Perform any necessary actions to place the order
  console.log("Order placed!");
}

// Load cart from local storage
function loadCart() {
  var cartData = localStorage.getItem('cart');
  if (cartData) {
    cart = JSON.parse(cartData);
    updateCart();
  }
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart when the page loads
loadCart();

