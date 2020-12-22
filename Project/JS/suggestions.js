const suggestions=document.querySelector('.suggestions');
const fetchSuggestions=async () =>{
    const response=await fetch('https://jsminnastore.herokuapp.com/suggested/electronics',{
        method:'GET',
        headers:{
            "Content-Type":"application/json; charset=UTF-8",
            "Authorization":'Bearer ' + localStorage.getItem('token')
        }
    });
    const data=response.json();
    console.log(data)
}
fetchSuggestions();