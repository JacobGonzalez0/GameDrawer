
let query = new URLSearchParams({
    search: "secret of monkey island",
    key: rawg
})

axios.get("https://api.rawg.io/api/games?" + query).then( res =>{
  
    console.log(res)

}).catch(err =>{
    console.log(err)
})



