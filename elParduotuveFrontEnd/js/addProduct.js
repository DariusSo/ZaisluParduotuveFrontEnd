var img = ""
async function addProduct(){
    var name = document.getElementById("itemName").value;
    var description = document.getElementById("itemDescription").value;
    var price = document.getElementById("itemPrice").value;
    var category = document.getElementById("itemCategory").value;
    var imageUrl = await getImageUrl();
    try{
      (async () => {
        const rawResponse = await fetch('http://localhost:8080/products/add', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : getCookie("loggedIn")
          },
          body: JSON.stringify({
            name : name,
            description: description,
            price : price,
            category : category,
            imageUrl : imageUrl
            })
            
        });
        var response = await rawResponse.text();
        if(rawResponse.status == 200){
            alert(response);
        }
      })();
    }catch(err){
        console.error(err);
    }

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

function readFile() {
  
    if (!this.files || !this.files[0]) return;
      
    const FR = new FileReader();
      
    FR.addEventListener("load", function(evt) {

      document.querySelector("#nuotrauka64").src         = evt.target.result;
      var imageBase64 = document.querySelector("#nuotrauka64").src;
    for(let i = 23; i < imageBase64.length; i++){
      img = img + imageBase64[i]
    }
    console.log(img);
      
    }); 
      
    FR.readAsDataURL(this.files[0]);
    
  }
  document.addEventListener('DOMContentLoaded', function () {
    
    document.querySelector("#inp").addEventListener("change", readFile);
    
    
  });
  async function getImageUrl(){
    var form = new FormData();
    form.append("image", img)
    try {
      const response = await fetch('https://api.imgbb.com/1/upload?expiration=600&key=f41c487b4fc4936b18728b0592baf331', {
          method: 'POST',
          
        body : form
         
          
      });
  
      const imgResponse = await response.json();
      console.log(imgResponse.data.display_url);
      
      if(!Object.keys(imgResponse).length){
        console.log("no data found");
    }else{
        return imgResponse.data.display_url;
      }
      
  } catch (error) {
    console.log(error);
  }
}
