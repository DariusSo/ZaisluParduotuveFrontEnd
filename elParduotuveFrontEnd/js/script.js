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
  function toggleModal(){
    var modalID = "modal-id";
    document.getElementById(modalID).classList.toggle("hidden");
    document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalID).classList.toggle("flex");
    document.getElementById(modalID + "-backdrop").classList.toggle("flex");
  }
  
