const form=document.getElementById('form');
const itemName=document.getElementById('itemName');
const itemDescription=document.getElementById('itemDescription');
const itemCategory=document.getElementById('itemCategory');
const reason=document.getElementById('reason');
const error=document.querySelector('.error');

window.onload=()=>{
    const tokens=localStorage.getItem('token');
    const tok=atob(tokens.split(".")[1]);
    console.log(tok);
    let jsonified=JSON.parse(tok)
    let jsonied=new Date(jsonified.exp)
    console.log(jsonied)
    // if(localStorage.getItem('token') != null){
    //     self.location.href='./suggest.html';
    // }
    // else{
    //     window.location.href='index.html';
    // }
}

function item(){
    if(itemCategory.value.toLowerCase() === 'electronics'){
        error.textContent='';
    }
    else if(itemCategory.value.toLowerCase() ==='furniture'){
        error.textContent='';
    }
    else if(itemCategory.value.toLowerCase() ==='grocery'){
        error.textContent='';
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(itemCategory.value.toLowerCase() !== 'electronics' && itemCategory.value.toLowerCase() !=='grocery' && itemCategory.value.toLowerCase() !=='furniture'){
        error.textContent='Item Category Cannot be suggested'
    }
    else{
        alert('form successfully submitted');
        let myForm=e.target;
        let fd=new FormData(myForm);
        for(let key of fd.keys()){
            console.log(key,fd.get(key))
        }
        let json=convertToJson(fd);
        console.log(json)
        let check=localStorage.getItem('token');
        console.log(check)
        fetch('https://jsminnastore.herokuapp.com/suggest',{
            method:'POST',
            body:JSON.stringify(json),
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "Authorization":'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            // if(data.success ==='true'){
            //     window.location.href="suggestions.html"
            // }
            // else{
            //     window.location.href="index.html"
            // }
        })
        function convertToJson(formData){
            let obj ={};
            for(let key of formData.keys()){
                obj[key]=formData.get(key);
            }
            return obj;
        }
        // console.log(check)
    }
    if(localStorage.getItem('token') != null){
        window.location.href='suggestions.html';
    }
    else{
        window.location.href='index.html';
    }
});