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