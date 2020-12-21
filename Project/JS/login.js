const email=document.getElementById('email');
const password=document.getElementById('password');
const errorPass=document.getElementById('errorPass');
const errorEmail=document.getElementById('errorEmail');
const emailParams = /^[a-zA-z]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passMeters= /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
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
const form = document.getElementById('form');
form.addEventListener('submit',(e)=>{
    const messages=[];
    e.preventDefault();
    if(email.value.search(emailParams)==-1){
        email.style.border='2px solid red';
        errorEmail.textContent=('Put in an appropraite email');
        // messages.push('Put in an appropraite email');
    }
    else if(password.value.search(passMeters)==-1){
        password.style.border='2px solid red';
        errorPass.textContent=('Password must contain numbers > 8 < 15,a character and a number');
        // messages.push('Password must contain numbers > 8 < 15,a character and a number');
    }
    else{
        alert('form');
        let myForm=e.target;
        let fd=new FormData(myForm);
        for(let key of fd.keys()){
            console.log(key,fd.get(key))
        }
        let json=convertToJson(fd);
        console.log(json)
        fetch('https://jsminnastore.herokuapp.com/auth/login/',{
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
            console.log(data.success)
            if(data.success!=='true'){
                window.location.href="suggest.html"
            }
            else{
                window.location.href="index.html"
            }
            var token=data.payload.token;
            const getLocalData=()=>{
                if(localStorage.getItem("token")===null){
                    localStorage.setItem("token",JSON.stringify([]));
                }
                else{
                    localStorage.setItem('token',token)
                }
            }
            getLocalData();
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
    // }
});