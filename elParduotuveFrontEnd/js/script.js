document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();
    showPing();
  });

  function showPing(){
    var ping = document.getElementById("ping");
    if(getCookie("cartItems")){
      if(ping.classList.contains("hidden")){
        ping.classList.remove("hidden")
      }
    }
  }
