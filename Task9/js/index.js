const navSlide=()=>{
    const navBar=document.getElementById('navigations')
    const lists=document.getElementById('lists')
    const menu=document.querySelector('#navigations a')
    const fa_times=document.querySelector('.fa-times')
    const fa_bars=document.querySelector('.fa-bars')
    navBar.addEventListener('click',()=>{
        lists.classList.toggle('listToggle');
        if(menu.innerHTML==='Close'){
            menu.innerHTML='Menu';
            fa_bars.style.display='block'
            fa_times.style.display='none'
        }
        else{
            menu.innerHTML='Close';
            fa_times.style.display='block'
            fa_bars.style.display='none'
        }
    },false)
}
navSlide();