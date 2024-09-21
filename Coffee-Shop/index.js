let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.fa-cart-shopping');
let body = document.querySelector('body');
let checkOut = document.querySelector('.checkOut');
let closeCart = document.querySelector('.close');
let sidebar = document.querySelector(".sidebar");
let products = [];
let cart = [];

function openSidebar() {
  sidebar.style.right = "0";
}
function closeSidebar() {
  sidebar.style.right = "-100%";
}

// Toggle cart visibility
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
    console.log('Cart icon clicked');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
    console.log('Close cart button clicked');
});

const addDataToHTML = () => {
    // Clear existing products
    listProductHTML.innerHTML = '';

    // Add new products
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('card');
            newProduct.innerHTML = 
            `<div class="product-img">
                <img src="${product.image}" width="100" height="100" loading="lazy">
            </div>
            <div class="product-info">
                <p>${product.name}</p>
                <h3 class="discounted">&#x20B1;${product.price}</h3>
            </div>
            <div class="cart-btn">
                <button class="cart-btn">Add to Cart</button>
            </div>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('cart-btn')) {
        let id_product = positionClick.closest('.card').dataset.id; 
        addToCart(id_product);
        console.log(`Add to Cart button clicked for product ID: ${id_product}`);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
    console.log('Cart updated:', cart);
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart saved to localStorage');
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalPrice = 0;
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
                <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">&#x20B1;${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
            totalPrice += info.price * item.quantity;
            checkOut.innerText = `Pay ₱${totalPrice}`;

        })
    }
    else {
        totalPrice = 0;
        checkOut.innerText = `Order an item`;

    }
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
        console.log(`Quantity changed for product ID: ${product_id}, Type: ${type}`);
    }
})

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
    console.log('Cart quantity changed:', cart);
}

const initApp = () => {
    // Get product data
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // Get cart data from memory
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
        console.log('App initialized with products:', products);
    })
}

initApp();
