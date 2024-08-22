function addToCart(product){
    let map = {};
    map["productId"] = product.id;
    map["quantity"] = 1;
    if(getCookie("cartItems")){
        var cartItems = getCookie("cartItems");
        var cart = JSON.parse(cartItems);
        var itemInCart = false;
        cart.forEach(order => {
            if(order.productId == product.id){
                order.quantity++;
                setCookie("cartItems", JSON.stringify(cart));
                itemInCart = true;
            }

        })
        if(!itemInCart){
            cart.push(map);
        }
    }else{
        var cart = cart ? JSON.parse(cart) : [];
        cart.push(map)
    }
    setCookie("cartItems", JSON.stringify(cart));
    showPing();
    displayCartProducts();
    document.getElementById("modalText").textContent = "Item has been successfully added to cart!"
    toggleModal();

}
async function addToCartById(id){
    let product = await fetchProductById(id);
    let map = {};
    map["productId"] = product.id;
    map["quantity"] = 1;
    if(getCookie("cartItems")){
        var cartItems = getCookie("cartItems");
        var cart = JSON.parse(cartItems);
        var itemInCart = false;
        cart.forEach(order => {
            if(order.productId == product.id){
                order.quantity++;
                setCookie("cartItems", JSON.stringify(cart));
                itemInCart = true;
            }

        })
        if(!itemInCart){
            cart.push(map);
        }
    }else{
        var cart = cart ? JSON.parse(cart) : [];
        cart.push(map)
    }
    setCookie("cartItems", JSON.stringify(cart));
    showPing();
    displayCartProducts();
    document.getElementById("modalText").textContent = "Item has been successfully added to cart!"
    toggleModal();

}

  function setCookie(name, value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
}

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
function showPing(){
    var ping = document.getElementById("ping");
    if(getCookie("cartItems")){
      if(!ping.classList.contains("hidden")){
        ping.classList.remove("hidden")
      }
    }
  }
function addToFavorites(id){
    let button = document.getElementById("favorites" + id);
    if(button.classList.contains("text-gray-500")){
        button.classList.remove("text-gray-500");
        button.classList.add("text-red-500");
        addToFavoritesCookies(id);
        




    }else{
        button.classList.remove("text-red-500");
        button.classList.add("text-gray-500");
        deleteFavoritesCookies(id);
    }

}
function addToFavoritesCookies(id){
    let map = {};
    map["productId"] = id;
    if(getCookie("favorites")){
        var favoriteItems = getCookie("favorites");
        var cookieFavorites = JSON.parse(favoriteItems);
        cookieFavorites.push(map);
    }else{
        var cookieFavorites = cookieFavorites ? JSON.parse(cookieFavorites) : [];
        cookieFavorites.push(map);
    }
    setCookie("favorites", JSON.stringify(cookieFavorites));
}
function deleteFavoritesCookies(id){
    var removeCookie = JSON.parse(getCookie("favorites"));
    var counter = 0;
        removeCookie.forEach(favorite => {
            if(favorite.productId == id){
                removeCookie.splice(counter, 1);
                setCookie("favorites", JSON.stringify(removeCookie));
            }
            counter++; 
        })
        
}
function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }