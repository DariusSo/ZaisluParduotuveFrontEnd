document.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementById('seconds'),
    total = el.innerHTML,
    timeinterval = setInterval(function () {
        total = --total;
        el.textContent = total;
        if (total <= 1) {
            clearInterval(timeinterval);
            window.location.href = "./index.html";
        }
    }, 1000);
    deleteCookie("cartItems");
  });

  function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }