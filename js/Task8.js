const form= document.getElementById('form');
var signUp=document.getElementById('sign-up');
signUp.disabled=true;
const errorElement=document.getElementById('error')
const errorName=document.getElementById('errorName')
const errorEmail=document.getElementById('errorEmail')
const errorConfirm=document.getElementById('errorConfirm')
const errors=document.getElementById('ahh')
const firstName=document.getElementById('firstname')
const lastName=document.getElementById('lastname')
const name=document.getElementById('names')
const passWord=document.getElementById('password');
const email=document.getElementById('email')
const confirmPass=document.getElementById('confirm');
const checkBox=document.getElementById('check');
const loader=document.getElementById('loader')
const siGn=document.getElementsByClassName('sign-up')

checkBox.addEventListener("click",()=>{
    // const inputs=document.getElementsByClassName(input)
    // const verifyInputs=()=>{
    //     const inputFunctions=[veriFy(),verifyEmail(),verifyName(),conFirm()]
    //     if(inputFunctions.every(input=>input)&&checkBox.checked==true){
    //         signUp.disabled=false;
    //     }
    //     else{
    //         signUp.disabled=true;
    //     }
    // }
    // verifyInputs()
    if((checkBox.checked==false)||(firstName.value&&lastName.value&&passWord.value&&email.value&&confirmPass.value)==""){
        signUp.disabled=true;
    }
    else if((checkBox.checked==true)&&(firstName.value||lastName.value||passWord.value||email.value||confirmPass.value)==""){
        signUp.disabled=true;
    }
    else{
        signUp.disabled=false;
    }
})
function verifyName(){
    const namesParam= /^[A-Za-z]*$/;
    if((firstName.value.search(namesParam)||lastName.value.search(namesParam))==-1){
        name.style.border="1px solid red"
        errorName.textContent="Name cannot contain numbers"
        name.focus();
    }
    else{
        name.style.border="1px solid green"
        errorName.textContent=""
    }
}
function veriFy(){
    const paraM= /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(document.getElementById('password').value.search(paraM)==-1){
        passWord.style.border="1px solid red"
        errorElement.textContent="Password Instructions not followed"
        passWord.focus();
    }
    else{
        passWord.style.border="1px solid green"
        errorElement.textContent=""
    }
}
function verifyEmail(){
    const emailParam = /^[a-zA-z]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.value.search(emailParam)==-1){
        email.style.border="1px solid red"
        errorEmail.textContent="Email Instructions not followed"
        email.focus();
    }
    else{
        email.style.border="1px solid green"
        errorEmail.textContent=" "
    }
}
function conFirm(){
    if(passWord.value != confirmPass.value){
        confirmPass.style.border="1px solid red"
        errorConfirm.textContent="Password values not the same"
        confirmPass.focus();
    }
    else{
        confirmPass.style.border="1px solid green"
        errorConfirm.textContent=" "
    }
}
form.addEventListener('submit',(e)=>{
        loader.style.display="block"
        setTimeout(function(){
            $(".sign-up").addClass("loader")
            // siGn.addClass("loader")
        }, alert("Form successfully submitted"));
})

