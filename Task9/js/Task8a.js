var login=document.getElementById('login')
const rememBer=document.getElementById('checker')
login.disabled=true;
const passWord=document.getElementById('password')
const email=document.getElementById('email')
const form=document.getElementById('form')
const errorEmail=document.getElementById('errorEmail')
const errorPass=document.getElementById('errorPassword')
const errors=document.getElementById('all')
rememBer.addEventListener("click",()=>{
    if((rememBer.checked==false)||(passWord.value&&email.value)==""){
        login.disabled=true;
    }
    else if((rememBer.checked==true)&&(passWord.value||email.value)==""){
        login.disabled=true;
    }
    else if(rememBer.checked==true&&(passWord.value||email.value)==""){
        login.disabled=!!this.checked;
    }
    else{
        login.disabled=false;
    }
})

function veriFy(){
    const emailParam = /^[a-zA-z]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passParam= /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if((passWord.value||email.value)==""){
        login.disabled=true;
    }
    if(document.getElementById('email').value.match(emailParam)){
        email.style.border="1px solid green"
        errorEmail.textContent=" "
        return true;
    }
    if(document.getElementById('password').value.match(passParam)){
        passWord.style.border="1px solid green"
        errorPass.textContent=" "
        return true;
    }
}
form.addEventListener('submit',(e)=>{
    const paraMeters= /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const emailParams = /^[a-zA-z]+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let messages=[]
    if(document.getElementById('password').value.search(paraMeters)==-1){
        passWord.style.border="1px solid red"
        errorPass.textContent="Password Instructions not followed"
        passWord.focus();
        messages.push("Password Instructions not followed")
        // for(var i=0;i<messages.length;i++){
        //     document.write("<p style='color:"+red+"'>"+red+"</p>")
        // }
    }
    else if(email.value.search(emailParams)==-1){
        email.style.border="1px solid red"
        errorEmail.textContent="Email Instructions not followed"
        email.focus();
        messages.push("Email Instructions not followed")
    }
    else{
        alert("Form successfully submitted")
    }
    if(messages.length>0){
        e.preventDefault()
        // errors.textContent=messages.join(', ')
    }
})