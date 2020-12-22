const suggestions=document.querySelector('.suggestions');
// window.onload=()=>{
//     if(localStorage.getItem('token') != null){
//         window.location.href='suggestions.html';
//     }
//     else{
//         window.location.href='index.html';
//     }
// }

const fetchSuggestions=async () =>{
    const response=await fetch('https://jsminnastore.herokuapp.com/suggested');
    const data=response.json();
    console.log(data)
}
fetchSuggestions();