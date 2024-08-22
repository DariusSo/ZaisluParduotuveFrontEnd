async function fetchOrdersAdmin() {
    var paymentStatus = document.getElementById("paymentStatus").value;
    var endpoint = "";
    if(paymentStatus != ""){
        endpoint = "?paymentStatus=" + paymentStatus;
    }
    try {
        const response = await fetch('http://localhost:8080/orders' + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : getCookie("loggedIn")
            },
        });
    
        const orders = await response.json();
        
        if(!Object.keys(orders).length){
          console.log("no data found");
      }else{
          displayOrders(orders);
        }
        
    } catch (error) {
      console.log(error);
    }
}
function displayOrders(orders) {
    var ordersTable = document.getElementById("ordersTable")
    ordersTable.innerHTML = '';
    console.log(orders);
    orders.forEach(order => {
        var productsQuantity = 0;
        var htmlOrder = document.createElement("tr");
        htmlOrder.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600";
        htmlOrder.innerHTML = showOrders(order);
        ordersTable.append(htmlOrder);
        console.log(order.products);
        order.products.forEach(async orderP => {
            productsQuantity = productsQuantity + orderP.quantity;
            document.getElementById("quantity" + order.id).innerText = productsQuantity;
            var htmlOrderProducts = document.createElement("tr");
            ordersTable.append(htmlOrderProducts);
            console.log(orderP.productId)
            var quantity = orderP.quantity;
            htmlOrderProducts.setAttribute("name", "orderProduct" + order.id);
            htmlOrderProducts.className = "hidden w-full bg-gray-200 border-b hover:bg-gray-300";
            var productFromList = await fetchProductById(orderP.productId);
            console.log(productFromList);
            htmlOrderProducts.innerHTML = showOrderProducts(productFromList, quantity);
        })
        
    });
}
function showOrders(order){
    return '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                order.id +
            '</td>' +
                '<td id="quantity'+ order.id +'" class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                    order.products.length +
                '</td>' +
                '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                order.totalPrice +
                '</td>' +
                '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                order.customerName +
                '</td>' +
                '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                order.customerAddress +
                '</td>' +
                '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                order.customerEmail +
                '</td>' +
                '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                order.paymentStatus +
                '</td>' +
                
                '<td class="px-6 py-4">' +
                '<a onclick="openCloseOrderProducts('+ order.id +')" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" id="show'+ order.id +'">Show products</a>' +
            '</td>'
}
document.addEventListener('DOMContentLoaded', function () {
    fetchOrdersAdmin();
    document.getElementById("paymentStatus").onchange = function() {
        fetchOrdersAdmin();
    };
  });
function productsNumber(productsInOrder){

}
function getOrderProducts(orderProducts){
    
}
function showOrderProducts(productFromList, quantity){
    return '<td class="p-4">' +
                '<img src="'+ productFromList.imageUrl +'" class="w-16 md:w-32 max-w-full max-h-full" alt="iPhone 12">' +
            '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
            productFromList.name +
            '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
            productFromList.description +
        '</td>' +
        '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
        productFromList.category +
        '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
            productFromList.price +
            '</td>' + 
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
            quantity +
            '</td>'
}
async function fetchProductById(id) {
    try {
        const response = await fetch('http://localhost:8080/products/'+ id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : getCookie("loggedIn")
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
function openCloseOrderProducts(id){
    let pop = document.getElementsByName("orderProduct" + id);
    var showButton = document.getElementById("show" + id)
    for(let i = 0; i < pop.length; i++){
        if(pop[i].classList.contains("hidden")){
            pop[i].classList.remove("hidden");
            showButton.innerText = "Hide";

        }else{
            pop[i].classList.add("hidden");
            showButton.innerText = "Show Products";
        }
    }
    

}