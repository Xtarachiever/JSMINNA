const firstName=document.getElementById('firstname');
const email=document.getElementById('email');
const password=document.getElementById('password');
const confirm=document.getElementById('confirm');
const errorFName=document.getElementById('errorFName');
const errorPass=document.getElementById('errorPass');
const errorConfirm=document.getElementById('errorConfirm');
const errorEmail=document.getElementById('errorEmail');
const allError=document.getElementById('allErrors');
const emailParams = /^[a-zA-z]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const namesParameters= /^[A-Za-z_ ]*$/;
const passMeters= /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
function fNameVerify(){
    if(firstName.value.match(namesParameters)){
        firstName.style.border='2px solid green';
        errorFName.textContent="";
    }
}
function emailVerify(){
    if(email.value.match(emailParams)){
        email.style.border='2px solid green';
        errorEmail.textContent="";
    }
}
function passVerify(){
    if(password.value.match(passMeters)){
        password.style.border='2px solid green';
        errorPass.textContent="";
    }
}
// function confirmPass(){
//     if(password.value === confirm.value){
//         confirm.style.border="1px solid green"
//         errorConfirm.textContent=" ";
//     }
// }
const form = document.getElementById('form');
form.addEventListener('submit',(e)=>{
    const messages=[];
    e.preventDefault();
    if(firstName.value.search(namesParameters)==-1){
        firstName.style.border='2px solid red';
        errorFName.textContent=('Name must contain only letters');
        // messages.push('Name must contain only letters');
    }
    else if(email.value.search(emailParams)==-1){
        email.style.border='2px solid red';
        errorEmail.textContent=('Put in an appropraite email');
        // messages.push('Put in an appropraite email');
    }
    else if(password.value.search(passMeters)==-1){
        password.style.border='2px solid red';
        errorPass.textContent=('Password must contain numbers > 8 < 15,a character and a number');
        // messages.push('Password must contain numbers > 8 < 15,a character and a number');
    }
    // else if(confirm.value != password.value){
    //     confirm.style.border='2px solid red';
    //     errorConfirm.textContent=('Password must be the same');
    // }
    else{
        alert('form');
        let myForm=e.target;
        let fd=new FormData(myForm);
        for(let key of fd.keys()){
            console.log(key,fd.get(key))
        }
        let json=convertToJson(fd);
        console.log(json)
        fetch('https://jsminnastore.herokuapp.com/auth/signup',{
            method:'POST',
            body:JSON.stringify(json),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
        })
        function convertToJson(formData){
            let obj ={};
            for(let key of formData.keys()){
                obj[key]=formData.get(key);
            }
            return obj;
        }
    }
    // if(messages.length>0){
    //     e.preventDefault();
    //     console.log(messages);
    // };
    // https://jsonplaceholder.typicode.com/posts
});