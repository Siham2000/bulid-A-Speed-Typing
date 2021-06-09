const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quote-display')

const quoteInputElement = document.getElementById('quote-input')
const timerElement = document.getElementById('timer')



quoteInputElement.addEventListener('input' ,  () =>{
const arryQoute= quoteDisplayElement.querySelectorAll('span')
const arryValue = quoteInputElement.value.split('');

let correct =true 
arryQoute.forEach((characterSpan , index) =>{
const character = arryValue[index]
if(character === null) {
    characterSpan.classList.remove('incorrect')
    characterSpan.classList.remove('correct')
    correct = false 
}
else if(character === characterSpan.innerText){
    characterSpan.classList.add('correct')
    characterSpan.classList.remove('incorrect')
  
} 
else{
    characterSpan.classList.remove('correct')
    characterSpan.classList.add('incorrect')
    correct = false 

}


})
if(correct)renderNewQuote()

})



function getRandomQuote()
{
return fetch(RANDOM_QUOTE_API_URL)
.then(Response => Response.json())
.then(data => data.content)


}


 async function renderNewQuote()
{
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
        
    })
    quoteInputElement.value = null
    startTimer();
}



let startTime


function startTimer (){
timerElement.innerText = 0;
startTime = new Date()
setInterval(()=>{
    timerElement.innerText = getTimertTime()


} , 1000)


}

function getTimertTime(){
 return Math.floor((new Date() - startTime) /1000)
}

renderNewQuote();






