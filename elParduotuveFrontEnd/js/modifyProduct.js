function modifyCar(){
    //body parametrai
    try{
      (async () => {
        const rawResponse = await fetch('http://127.0.0.1:8080/modifyCar', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : mId,
            pavadinimas: mPavadinimas,
            })
            
        });
      })();
    }catch(err){
        console.error(err);
    } 
  }