document.addEventListener("DOMContentLoaded", () => {
    const stripe = Stripe('pk_test_51PlEdJBsNoGKJEE7jvx0qXTpbYBJUgZXBpFflSuL3mRuahlDtMCWVZWmRfwXSd5Nb9VWyVc4uVCB02NNrtAaGJPb00vDUFdR1K'); 
    
    document.getElementById("buyButton").addEventListener("click", async () => {
        var name = document.getElementById("scName").value;
        var email = document.getElementById("scEmail").value;
        var address = document.getElementById("scAddress").value;
        var totalPrice = parseInt(document.getElementById(""))
        var products = JSON.parse(getCookie("cartItems"));

        if(name == "" || email == "" || address == ""){
        alert("All fields must be completed.")
        window.location.reload();
        }
        const response = await fetch('http://localhost:8080/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            products : products,
            totalPrice: 0,
            customerName : name,
            customerAddress: address,
            customerEmail: email,
            paymentStatus: false
        })
        });
    
        const session = await response.json();
        const sessionId = session.id;
    
        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({ sessionId });
    
        if (error) {
            console.error("Stripe Checkout error:", error.message);
        }
    });
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