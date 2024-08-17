var img1 = "";
async function fetchProductsAdmin() {
    try {
        const response = await fetch('http://localhost:8080/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    
        const products = await response.json();
        
        if(!Object.keys(products).length){
          console.log("no data found");
      }else{
          displayProducts(products);
        }
        
    } catch (error) {
      console.log(error);
    }
}
function displayProducts(products) {
    var productsTable = document.getElementById("productTable")
    productsTable.innerHTML = '';
    products.forEach(product => {
        var htmlProduct = document.createElement("tr");
        htmlProduct.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600";
        htmlProduct.innerHTML = showProducts(product);
        productsTable.append(htmlProduct);
        var htmlProductModify = document.createElement("tr");
        htmlProductModify.className = "bg-red-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hidden";
        htmlProductModify.innerHTML = showModify(product);
        htmlProductModify.id = "modify" + product.id;
        productsTable.append(htmlProductModify);
        document.querySelector("#inp" + product.id).addEventListener("change", function() {
            if (!this.files || !this.files[0]) return;
      
            const FR = new FileReader();
            
            FR.addEventListener("load", function(evt) {

            document.querySelector("#img" + product.id).src         = evt.target.result;
            }); 
      
    FR.readAsDataURL(this.files[0]);
          });
    });
}
function showProducts(product){
    return '<td class="p-4">' +
                '<img src="'+ product.imageUrl +'" class="w-16 md:w-32 max-w-full max-h-full" alt="iPhone 12">' +
            '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                product.name +
            '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
            product.description +
        '</td>' +
        '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
            product.category +
        '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                product.price +
            '</td>' +
            '<td class="px-6 py-4">' +
                '<a onclick="removeProduct('+ product.id +')" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>' +
            '</td>' +
            '<td class="px-6 py-4">' +
            '<a onclick="openForm('+product.id+')" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Modify</a>' +
        '</td>'
}
function showModify(product){
    return '<td class="p-4">' +
                '<img id="img'+ product.id +'" src="'+ product.imageUrl +'" class="w-16 md:w-32 max-w-full max-h-full" alt="iPhone 12">' +
                '<input id="inp'+ product.id +'" type="file"></input>' +
            '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                '<input id="name'+product.id+'" value= "'+product.name+'"></input>' +
            '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
            '<input id="description'+product.id+'" class="w-full" value= "'+product.description+'"></input>' +
        '</td>' +
        '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
            '<input id="category'+product.id+'" class="w-full" value= "'+product.category+'"></input>' +
        '</td>' +
            '<td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">' +
                '<input class="w-20" id="price'+product.id+'" value= "'+product.price+'"></input>' +
            '</td>' +
            '<td class="px-6 py-4">' +
                '<a onclick="closeForm('+product.id+')" class="font-medium text-red-600 dark:text-red-500 hover:underline">Cancel</a>' +
            '</td>' +
            '<td class="px-6 py-4">' +
            '<a onclick="modifyProduct('+product.id+')" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</a>' +
        '</td>'
}
document.addEventListener('DOMContentLoaded', function () {
    fetchProductsAdmin();
  });

function openForm(id){
    var block = document.getElementById("modify" + id);
    block.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
}
function closeForm(id){
    var block = document.getElementById("modify" + id);
    block.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hidden";
}

  async function modifyProduct(id){
    var name = document.getElementById("name" + id).value;
    var description = document.getElementById("description" + id).value;
    var price = document.getElementById("price" + id).value;
    var category = document.getElementById("category" + id).value;
    var imageUrl = await getImageUrlModify(id);
    try{
      (async () => {
        const rawResponse = await fetch('http://localhost:8080/products/update', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : getCookie("loggedIn")
          },
          body: JSON.stringify({
            id : id,
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
  async function getImageUrlModify(id){
    var base64 = "";
    var imageBase641 = document.querySelector("#img" + id).src;
            for(let i = 23; i < imageBase641.length; i++){
            base64 = base64 + imageBase641[i]
            }

    var form = new FormData();
    form.append("image", base64)
    
    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=f41c487b4fc4936b18728b0592baf331', {
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

function removeProduct(id){
    if (confirm('Are you sure?')) {
        try{
        (async () => {
            const rawResponse = await fetch('http://localhost:8080/products/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : getCookie("loggedIn")
            },
            });
            var response = await rawResponse.text();
            if(rawResponse.status == 200){
                alert(response);
            }
        })();
        }catch(err){
            console.error(err);
        } 
    } else {
        return false;
    }
}

  
