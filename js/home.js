// All Li hover Effect
const menuItems = document.querySelectorAll('li');

menuItems.forEach(function (item) {
  item.addEventListener('mouseover', () => {
    item.classList.add('hover:text-hoverColor');
    // item.classList.add('hover:underline');
  });
  item.addEventListener('mouseout', () => {
    item.classList.remove('hover:text-hoverColor');
    // item.classList.remove('hover:underline');
  });
});


// Common button style
document.querySelectorAll('button').forEach(button => {
  // Wrap inner content in a <span> to handle layering
  const span = document.createElement('span');
  span.innerHTML = button.innerHTML;
  button.innerHTML = '';
  button.appendChild(span);
  // Add the class for the hover effect
  button.classList.add('circle-hover-effect');
});


// Product Cart Hover Style
const getCartSearch = document.getElementsByClassName('searchCart');
let itemCount = 0;
for (const searchCart of getCartSearch) {
  searchCart.addEventListener('click', function (event) {
    // Update Cart Count
    itemCount = itemCount + 1;
    setInnerTxt('cartCount', itemCount);
    // Get Product Name and Price
    const productImageUrl = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].src;
    const productName = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[11].childNodes[1].innerText;
    const productPrice = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[11].childNodes[3].childNodes[1].innerText;

    // Hide No Item Text
    document.getElementById('noitems').classList.add("hidden");
    // Add Product To cart
    const div = document.createElement('div');
    div.classList.add('my-2', 'grid', 'grid-cols-5', 'gap-2', 'items-center');
    div.innerHTML = `
    <div class="w-22 border">
        <img src="${productImageUrl}" alt="Product Image">
    </div>
    <div class="col-span-2 text-center">
      ${productName}
    </div>
    <div class="text-center">
      $<span>${productPrice}</span>
    </div>
    <div  class="text-end pr-5">
      <i class="fa-solid fa-trash deleteProduct"></i>
    </div>
    `
    document.getElementById('cartContents').appendChild(div);
    // Update Subtotal 
    const getTotal = getValue('total');
    const updateTotal = getTotal + parseFloat(productPrice);
    setInnerTxt("total", updateTotal);
  });
};


// Remove Product from Cart

document.getElementById('cartContents').addEventListener('click', function (e) {
  if (e.target.classList.contains('deleteProduct')) {
    e.target.parentNode.parentNode.remove();
    // Update Subtotal Balance
    const productPrice = e.target.parentNode.parentNode.childNodes[5].childNodes[1].innerText;
    const getTotal = getValue('total');
    const updateTotal = getTotal - parseFloat(productPrice);
    setInnerTxt("total", updateTotal);
    // Update Cart Count
    itemCount = itemCount - 1;
    setInnerTxt('cartCount', itemCount);
    // If Cart have No item
    if (updateTotal == 0) {
      document.getElementById('noitems').classList.remove("hidden");
    }
  }
});


// Product Search Info
const allItemsInfo = document.getElementsByClassName('itemsInfo');
const popUpContainer = document.getElementById('productInfo');
const dynamicProductInfo = document.createElement('div');
let dynamicItemCount = 1;
for (const itemsInfo of allItemsInfo) {
  itemsInfo.addEventListener('click', function (event) {
    // Getting Product Info
    const productImageUrl = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].src;
    const productName = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[11].childNodes[1].innerText;
    const productPrice = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[11].childNodes[3].childNodes[1].innerText;
    // Dynamic Content
    dynamicProductInfo.classList.add('flex', 'items-center')
    dynamicProductInfo.innerHTML = `
                        <div class="flex-1">
                            <img src="${productImageUrl}" alt="product_1">
                        </div>
                        <div class="flex-1 space-y-4">
                            <h3 class="text-3xl font-bold">${productName}</h3>
                            <h4  class="text-xl font-bold">$ <span id="dynamicProductPrice">${productPrice}</span></h4>
                            <div>
                                <ul class="space-y-3">
                                    <li><i class="fa-solid fa-check text-mainColor pr-2"></i>Unrestrained And portable active streo</li>
                                    <li><i class="fa-solid fa-check text-mainColor pr-2"></i>Free from the confines the wires and chords</li>
                                    <li><i class="fa-solid fa-check text-mainColor pr-2"></i>20 hours of portable capabilities</li>
                                </ul>
                            </div>
                            <div class="flex gap-5 items-center">
                                <div class=" flex items-center gap-5 border justify-center w-24">
                                    <h2 id="productInfoItemCount" class="font-bold text-2xl text-gray-700">1</h2>
                                    <ul>
                                        <li ><i class="fa-solid fa-angle-up itemPlusMinus"></i></li>
                                        <li > <i class="fa-solid fa-angle-down itemPlusMinus"></i></li>
                                    </ul>
                                </div>
                                <div class="">
                                    <button class="btn bg-mainColor circle-hover-effect text-white py-4 px-8 rounded-full"><span>Add to Cart</span></button>
                                </div>
                            </div>
                        </div>
  `
    popUpContainer.appendChild(dynamicProductInfo);
    // Call The PopUp
    my_modal_3.showModal()
    // Increase Item Count
    const itemPlus = document.getElementsByClassName('itemPlusMinus');
    for (const items of itemPlus) {
      items.addEventListener('click', function (event) {
        if (event.target.classList.contains('fa-angle-up')) {
          dynamicItemCount = dynamicItemCount + 1;
          // Get and Set Value of Product Item Count
          
          const itemValue = getValue("productInfoItemCount")
          setInnerTxt("productInfoItemCount", dynamicItemCount);

          // Update Product Cost
          const dynamicProductPrice = getValue('dynamicProductPrice')
          console.log(typeof dynamicProductPrice)
          setInnerTxt('dynamicProductPrice', dynamicProductPrice + parseFloat(productPrice))

        };
        if (event.target.classList.contains('fa-angle-down')) {
          if (dynamicItemCount <= 1) {
            alert('Only One Product Left')
            return;
          }
          else {
            dynamicItemCount = dynamicItemCount - 1;
            // Get and Set Value of Product Item Count
            const itemValue = getValue("productInfoItemCount");
            setInnerTxt("productInfoItemCount", dynamicItemCount);
            // Update Product Cost
            const dynamicProductPrice = getValue('dynamicProductPrice');
            setInnerTxt('dynamicProductPrice', dynamicProductPrice - parseFloat(productPrice).toFixed(2));
          };
        };
      });
    };
  });
};
// Remove Dynamic Content
document.getElementById('closeBtn').addEventListener('click', function () {
  popUpContainer.removeChild(dynamicProductInfo);
});