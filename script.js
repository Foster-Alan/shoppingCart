const mainContainer = document.querySelector('.container');
const cart = document.querySelector('.cart');
const cartItems = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const divLoad = document.createElement('div');
divLoad.className = 'loading';
divLoad.innerText = 'carregando...';

const loadFunc = () => mainContainer.appendChild(divLoad);

const removeLoad = () => divLoad.remove();

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

function sumPricesCart() {
  const totalPrice = document.querySelector('.total-price');
  let sumPrices = 0;
  const cartItemList = document.getElementsByClassName('cart__item');

  [...cartItemList].forEach((param) => {
    sumPrices += Number(param.innerHTML.split('$').pop());
  });

  totalPrice.innerHTML = `Valor Total: R$${sumPrices}`;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(JSON.stringify(cartItems.innerHTML));
  sumPricesCart();
}

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

function appendListCartItem(item) {  
  cartItems.append(createCartItemElement(item));
  saveCartItems(JSON.stringify(cartItems.innerHTML));
  sumPricesCart();
}

async function createdItem(itemID) {
  loadFunc(); 
  const result = await fetchItem(itemID);
  removeLoad();
  appendListCartItem(result);
}

function addToCart(event) {
  const idProduct = event.target
    .parentNode
    .firstChild
    .innerText;
  createdItem(idProduct);
}

const createCustomElement = (element, className, innerText, callback) => {
  const theElement = document.createElement(element);
  
  if (callback) {
    theElement.addEventListener('click', callback);
  }

  theElement.className = className;
  theElement.innerText = innerText;
  return theElement;
};

const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price.toFixed(2)}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', 
  addToCart));

  return section;
};

function appendProduct(product) {
  const section = document.querySelector('.items');
  section.append(createProductItemElement(product));
}

async function createdProducts() {
  loadFunc();
  const result = await fetchProducts('computador');
  removeLoad();
  result.results
    .forEach((product) => appendProduct(product));
}

function testEventReload() {
  const li = document.getElementsByClassName('cart__item');
  [...li].forEach((e) => e.addEventListener('click', cartItemClickListener));
}

function appendSum() {
  const totalPrice = document.createElement('div');
  cart.appendChild(totalPrice);
  totalPrice.className = 'total-price';
}

function emptyButton() { 
  cartItems.innerHTML = '';
  sumPricesCart();
  saveCartItems(JSON.stringify(''));
}

function testLocalStorage() {
  const getItem = getSavedCartItems();
  cartItems.innerHTML = JSON.parse(getItem);
  testEventReload();
  sumPricesCart();
}

window.onload = () => { 
  emptyCart.addEventListener('click', emptyButton);
  appendSum();
  createdProducts();
  testLocalStorage(); 
};