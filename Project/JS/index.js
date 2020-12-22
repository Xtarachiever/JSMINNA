function showNav(){
    document.getElementsByClassName("header")[0].classList.toggle("active");
}
const allFunctions=()=>{
    const generatedData=({id,comment})=>{
        const datas=document.querySelector('.datas');
        const eachData=document.createElement('section');
        const electronics=document.querySelector('.elects');
        const furniture=document.querySelector('.furn');
        if(electronics.classList.contains('active')){
            eachData.innerHTML=`
            <div class="cards">
              <div class="heading">
              <p class="price">$150</p>
              <i class="fa fa-heart"></i></div>
              <img src="../images/Xtarachiever.png" alt="images"/>
              <p>${comment}</p>
            </div>
        `
        }
        datas.appendChild(eachData);
        datas.classList.add('datas');
    }
    const generateData=(data)=>{
        for(const country of data){
            generatedData(country)
        };
    }
    const navBar=document.querySelector('.nav-bar');
    const items=document.querySelector('.options');
    navBar.addEventListener('click',()=>{
        items.classList.toggle('toggler');
    });
    const fetchData=async ()=>{
        const response='./data.json';
        fetch(response)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.comments)
            generateData(data.comments);
            // data.forEach((item)=>{
            //     console.log(item)
            // })
        })
        // const response= await('https://jsminnastore.herokuapp.com/suggested');
        // const data = response.json();
        // console.log(data)
    }
    fetchData();
}
allFunctions();