const suggestions=document.querySelector('.suggestion');
const allFunctions=()=>{
    const generateSuggested=({itemCategory,itemDescription,itemName,reason})=>{
        const suggestion=document.createElement('section');
        suggestion.innerHTML=`
        <div class="suggests">
            <h3 class="itemName">${itemName}</h3>
            <p class="itemCategory">${itemCategory}</p>
            <p class="itemDescription">${itemDescription}</p>
            <p class="reason">${reason}</p>
        </div>
        `
        suggestions.appendChild(suggestion);
    }
    const generateSuggestions=(idea)=>{
        for(const suggest of idea){
            generateSuggested(suggest);
        }
    }
    const fetchSuggestions=async () =>{
        const response=await fetch('https://jsminnastore.herokuapp.com/suggested/electronics',{
            method:'GET',
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "Authorization":'Bearer ' + localStorage.getItem('token')
            }
        });
        response.json()
        .then(dats=>{
            console.log(dats.payload.result)
            generateSuggestions(dats.payload.result)
        })
        // console.log(dats)
    }
    fetchSuggestions();
}
allFunctions();