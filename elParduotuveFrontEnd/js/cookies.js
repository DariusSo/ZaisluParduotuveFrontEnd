function addToCart(){
    var product = document.getElementById('productName');
    cart = cart ? JSON.parse(cart) : [];
    cart.push(product);
    bake_cookie("cartItems", cart);

}

function bake_cookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
  }