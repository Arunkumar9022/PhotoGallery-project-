const btnEl=document.getElementById('btn')
const errormessageEl=document.getElementById('errorMessage')
const galleryEl=document.getElementById('gallery')
async function fetchImage()
{
    const inputvalue=document.getElementById("input").value
    if(inputvalue>10||inputvalue<1)
    {
     errormessageEl.style.display="block";
     errormessageEl.innerText="Number should be between 1 to 10";
     return;
    }
    imgs="";
    try{
        btnEl.style.display="none";
        const loading=`<img src="spinner.svg"/>`
        galleryEl.innerHTML=loading;
        await fetch(`http://api.unsplash.com/photos?per-page=${inputvalue}&page=${Math.round(Math.random()*1000)}&client_id=klTyttIzkpol-1iOhZbSsy53byYiu7Ek6xJX28TSE6o`)
        .then((res)=>res.json().then((data)=>{
            // console.log(data);
            if(data){
                data.forEach((pic) => {
                    imgs +=`<img src=${pic.urls.small} alt="image"/>`;
                    galleryEl.style.display="block";
                    galleryEl.innerHTML=imgs;
                    btnEl.style.display="block"
                    console.log(pic.urls.small)
                    errormessageEl.style.display="none";
                });
            }
        }));
    }
    catch(error)
    {
        console.log(error);
        errormessageEl.style.display="block";
        errormessageEl.innerText="An error occurs,try again later";
        btnEl.style.display="block";
        galleryEl.style.display="none";
    }
}
btnEl.addEventListener("click",fetchImage)