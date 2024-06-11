// for footer

document.addEventListener("DOMContentLoaded", () => {
  const components = [
    { id: "footer-grocery", url: "../footer/footer.html" },
    { id: "header-grocery", url: "../header/header.html" },
  ];

  components.forEach((component) => {
    fetch(component.url)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(component.id).innerHTML = data;
      })
      .catch((error) =>
        console.error(`Error loading ${component.url}:`, error)
      );
  });
});

// end footer

// Function to create a product card
function createGroceryProductCard(product) {
  const discont=(Math.floor(product.rating*(parseInt((product.price.toString()).slice(0,2)))/10))
    const afterDiscontPrice=Math.round((100-discont)*product.price/100)
  
    function formatIndianRupee(number) {
      const parts = number.toString().split(".");
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const formattedNumber = parts.length > 1 ? integerPart + "." + parts[1] : integerPart;
      return formattedNumber;
    }
    
    return `
    <style>
    .products div{font-size:14px}.products img:hover{transform:scale(1.1)}.products{font-size:medium;display:flex;flex-direction:column;align-items:center}.rating{background-color:green;width:fit-content;padding:0 16px;border-radius:5px;color:#fff}.products .product_Img{height:150px}.products img{padding:1px;width:100%;height:100%;object-fit:contain}
    </style>
      <a class="btn col-lg-2 col-md-3 col-sm-4 col-6 p-2" href="../addtokart/?query=${product.name}">
          <div class="products">
              <div class="text-center product_Img img-fluid">
                  <img src="../json-api/product-img/${product.productImg}" alt="${product.id}">
              </div>
              <div class="text-center card-title pt-1">${product.name.slice(0, 20)} ${product.name.length > 20 ? "<b>...</b>":""}</div>
              <div class="text-center mb-1 rating">${product.rating} &nbsp<i class="bi bi-star-fill"></i></div>
              <div class="text-center"><strong>₹${formatIndianRupee(afterDiscontPrice)}</strong> <del style="color:#878787">₹${formatIndianRupee(product.price)}</del> <span style="color:#388e3c"> ${discont}% off </span></div>
          </div>
      </a>
  `;
}


function groceryFetch(g) {
  const groceryList = document.getElementById('grocery-product');
  groceryList.innerHTML = g.map(product => createGroceryProductCard(product)).join('');
}


// Fetch data from the JSON file and grocery for each brand
fetch('../json-api/product.json')
  .then(response => response.json())
  .then(data => {
    const g = data.filter(product => product.category.toLowerCase().includes('grocery'));
    groceryFetch(g);
    })
    .catch(error => console.error('Error fetching data:', error));