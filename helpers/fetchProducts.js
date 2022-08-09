const fetchProducts = (computador) => {
  // seu código aqui
   const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
   return fetch(url)
     .then((response) => response.json())
     .then((data) => data);
 };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
