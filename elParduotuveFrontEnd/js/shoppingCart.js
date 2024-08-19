
function displayCartProducts() {
    var cartTable = document.getElementById("cartTable")
    cartTable.innerHTML = '';
    var carItems = JSON.parse(getCookie("cartItems"));
    var totalCartPrice = document.getElementById("totalPrice");
    var priceTotal = 0;
    var tr = document.createElement("tr");
    tr.className = "";
    
    var td = document.createElement("td");
    td.textContent = "None";
    
    var td1 = document.createElement("td");
    td.textContent = "None";
    var td2 = document.createElement("td");
    td.textContent = "None";
    var total = document.createElement("td");
    td.className = "opacity-0";
    total.className = "bg-white px-6 py-4 font-semibold text-gray-900 dark:text-white";
    total.id = "totalPrice";
    var stringTotal = document.createElement("p");
    
    total.append(stringTotal);
    

    carItems.forEach(async item => {
        let fetchedProduct = await fetchProductById(item.productId);
        var cartProduct = document.createElement("tr");
        cartProduct.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600";
        cartProduct.innerHTML = showCartProducts(fetchedProduct, item.quantity);
        cartTable.append(cartProduct);
        

        priceTotal = priceTotal + fetchedProduct.price * item.quantity;
        if(totalCartPrice){
            total.textContent = (Math.round(priceTotal * 100) / 100).toFixed(2);
        }
        tr.append(td);
        tr.append(td1);
        tr.append(td2);
        tr.append(total);
        cartTable.append(tr);
    });
    //console.log(priceTotal);
    
}
function showCartProducts(fetchedProduct, quantity){
    var roundedPrice = (Math.round(fetchedProduct.price * 100) / 100).toFixed(2);
    return '<td class="p-4">' +
                '<img src="'+ fetchedProduct.imageUrl +'" class="w-16 md:w-32 max-w-full max-h-full" alt="iPhone 12">' +
            '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                fetchedProduct.name +
            '</td>' +
            '<td class="px-6 py-4">' +
                '<div class="flex items-center">' +
                    '<button onclick="removeQuantity('+ fetchedProduct.id +', '+ fetchedProduct.price +')" class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">' +
                        '<span class="sr-only">Quantity button</span>' +
                        '<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">' +
                            '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>' +
                        '</svg>' + 
                    '</button>' +
                    '<div class="ms-3">' +
                        '<input type="number" id="scQuantity'+ fetchedProduct.id +'" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="'+ quantity +'" disabled/>' +
                    '</div>' +
                    '<button onclick="addQuantity('+ fetchedProduct.id +', '+ fetchedProduct.price +')" class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">' +
                        '<span class="sr-only">Quantity button</span>' +
                        '<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">' +
                            '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>' +
                        '</svg>' +
                    '</button>' +
                '</div>' +
            '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                roundedPrice +
            '</td>' +
            '<td class="px-6 py-4">' +
                '<a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" onclick="removeFullItemFromCart('+ fetchedProduct.id +')">Remove</a>' +
            '</td>'
}
document.addEventListener('DOMContentLoaded', function () {
    displayCartProducts();
  });

  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
}

async function fetchProductById(id) {
    try {
        const response = await fetch('http://localhost:8080/products/'+ id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    
        const productById = await response.json();
        
        if(!Object.keys(productById).length){
          console.log("no data found");
      }else{
          return productById;
        }
        
    } catch (error) {
      console.log(error);
    }
}
function cartButton(){
    var mText = document.getElementById("modalText");
    mText.textContent = "Your Shopping Cart";
    toggleModal();
}
function removeFullItemFromCart(id){
    var cookieItems = JSON.parse(getCookie("cartItems"));
    var objIndex = 0;
    cookieItems.forEach(item => {
        console.log(id);
        console.log(item.productId);
        if(item.productId == id){
            cookieItems.splice(objIndex, 1);
        }
        objIndex++
    });
    var cart = JSON.stringify(cookieItems);
    setCookie("cartItems", cart);
    displayCartProducts();
}
function removeQuantity(id, price){
    let quantity = document.getElementById("scQuantity" + id);
    if(quantity.value < 2){

    }else{
        var cookieItems = JSON.parse(getCookie("cartItems"));
    var objIndex = 0;
    cookieItems.forEach(item => {
        console.log(id);
        console.log(item.productId);
        if(item.productId == id){
            item.quantity--;
            quantity.value--;
        }
        objIndex++
    });
    var cart = JSON.stringify(cookieItems);
    setCookie("cartItems", cart);
    let total = document.getElementById("totalPrice");
    let num = parseFloat(total.textContent) - parseFloat(price);
    total.textContent = (Math.round(num * 100) / 100).toFixed(2);
    

    }
    
}
function addQuantity(id, price){
    let quantity = document.getElementById("scQuantity" + id);
    var cookieItems = JSON.parse(getCookie("cartItems"));
    var objIndex = 0;
    cookieItems.forEach(item => {
        console.log(id);
        console.log(item.productId);
        if(item.productId == id){
            item.quantity++;
            quantity.value++;
        }
        objIndex++
    });
    var cart = JSON.stringify(cookieItems);
    setCookie("cartItems", cart);
    let total = document.getElementById("totalPrice");
    let num = parseFloat(total.textContent) + parseFloat(price);
    total.textContent = (Math.round(num * 100) / 100).toFixed(2);

}
