document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();
    showPing();
    toggleFavorites();

  });

  function showPing(){
    var ping = document.getElementById("ping");
    if(getCookie("cartItems")){
      if(ping.classList.contains("hidden")){
        ping.classList.remove("hidden")
      }
    }
  }
  function toggleModal(){
    var modalID = "modal-id";
    document.getElementById(modalID).classList.toggle("hidden");
    document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalID).classList.toggle("flex");
    document.getElementById(modalID + "-backdrop").classList.toggle("flex");
  }
  function toggleFavorites(){
    var favoritesCookies = JSON.parse(getCookie("favorites"));
    favoritesCookies.forEach(cookie => {
      var heart = document.getElementById("favorites" + cookie.productId);
      
      heart.classList.remove("text-gray-500");
      heart.classList.add("text-red-500");

  })
  }
  
