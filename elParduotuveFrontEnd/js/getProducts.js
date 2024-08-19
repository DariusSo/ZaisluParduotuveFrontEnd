async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    
        const products = await response.json();
        
        if(!Object.keys(products).length){
          console.log("no data found");
      }else{
          displayProducts(products);
        }
        
    } catch (error) {
      console.log(error);
    }
}
function displayProducts(products) {
    var productsTable = document.getElementById("products1")
    productsTable.innerHTML = '';
    products.forEach(product => {
        var htmlProduct = document.createElement("div");
        htmlProduct.innerHTML = showProductsNew(product);
        productsTable.append(htmlProduct);
        var productClick = document.getElementById("add" + product.id);
        productClick.onclick = function(){
            addToCart(product);
         };
    
    });
}
function showProducts(product){
    return '<div class="bg-gray-100 flex flex-col justify-center">' +
    '<div class="relative m-3 flex flex-wrap mx-auto justify-center">' +
  
      '<div class="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">' +
        '<div class="overflow-x-hidden rounded-2xl relative">' +
          '<img class="h-40 rounded-2xl w-full object-cover" src="'+ product.imageUrl+'">' +
          '<button type="button" id="add'+ product.id +'">' +
          '<p class="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">' +
              '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />' +
            '</svg>' +
          '</p>' +
          '</button>' +
        '</div>' +
        '<div class="mt-4 pl-2 mb-2 flex justify-between ">' +
          '<div>' +
            '<p class="text-lg font-semibold text-gray-900 mb-0">'+ product.name +'</p>' +
            '<p class="text-md text-gray-800 mt-0">'+ product.price+'</p>' +
          '</div>' +
          '<div class="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">' +
              '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />' +
            '</svg>' +
          '</div>' +
        '</div>' +
      '</div>'
}
function showProductsNew(product){
  var roundedPrice = (Math.round(product.price * 100) / 100).toFixed(2);
  return '<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">'+
    '<div class="h-56 w-full">'+
      '<a href="#">'+
        '<img class="mx-auto h-full dark:hidden" src="' + product.imageUrl + '" alt="" />    </a>' +
    '</div>' +
    '<div class="pt-6">' +
    '<div class="mb-4 flex items-center justify-between gap-4">' +
      '<span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> Up to 35% off </span>' +

      '<div class="flex items-center justify-end gap-1">' +
        '<button type="button" data-tooltip-target="tooltip-quick-look" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">' +
          '<span class="sr-only"> Quick look </span>' +
          '<svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">' +
            '<path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />' +
            '<path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />' +
          '</svg>' +
        '</button>' +
        '<div id="tooltip-quick-look" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">' +
          'Quick look' +
          '<div class="tooltip-arrow" data-popper-arrow=""></div>' +
        '</div>' +

        '<button type="button" data-tooltip-target="tooltip-add-to-favorites" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">' +
          '<span class="sr-only"> Add to Favorites </span>' +
          '<svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">' +
            '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />' +
          '</svg>' +
        '</button>' +
        '<div id="tooltip-add-to-favorites" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">' +
          'Add to favorites' +
          '<div class="tooltip-arrow" data-popper-arrow=""></div>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">'+ product.name +'</a>' +


    '<ul class="mt-2 flex items-center gap-4">' +
      '<li class="flex items-center gap-2">' +
        '<svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">' +
          '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />' +
        '</svg>' +
        '<p class="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>' +
      '</li>' +

      '<li class="flex items-center gap-2">' +
        '<svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">' +
          '<path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />' +
        '</svg>' +
        '<p class="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>' +
      '</li>' +
    '</ul>' +

    '<div class="mt-4 flex items-center justify-between gap-4">' +
      '<p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">$'+ roundedPrice +'</p>' +

      '<button type="button" id="add'+ product.id +'" class="bg-green-500 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">' +
        '<svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">' +
          '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />' +
        '</svg>' +
        'Add to cart' +
      '</button>' +
    '</div>' +
  '</div>' +
'</div>'
}
