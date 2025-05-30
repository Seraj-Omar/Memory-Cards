document.querySelector(".control-buttons span").onclick = function() {
    let name = prompt("What's Your Name?");

    if(name==null||name=="")
        name="Mr.Unknown"

    document.querySelector(".name span").innerHTML=name

    document.querySelector(".control-buttons").remove()

    previewCards();
};



let duration=1000;
let cardsContainer=document.querySelector(".game-container")
let cards=Array.from(cardsContainer.children)
let orderRange = Array.from(Array(cards.length).keys())


console.log(cards);

shuffle(orderRange)

function previewCards() {
    cards.forEach(card => card.classList.add('flip'));
    cardsContainer.classList.add('stop-clicking');
  
    setTimeout(() => {
      cards.forEach(card => card.classList.remove('flip'));
      cardsContainer.classList.remove('stop-clicking');
    }, 5000);
}
  

  
cards.forEach((card, i) => {
    card.style.order = orderRange[i];
    card.addEventListener('click',function(){
        flipCard(card)
    })
});


function shuffle(a) {
    let curr = a.length, temp, rand
    while (curr) {
        rand = Math.floor(Math.random() * curr)
        curr--
        temp = a[curr]
        a[curr] = a[rand]
        a[rand] = temp
    }
    return a
}

function flipCard(card){
    card.classList.add('flip')
    let flippedCards = cards.filter(flippedCard => flippedCard.classList.contains('flip'))
    if(flippedCards.length === 2){
        stopClicking();
        checkMatching(flippedCards[0],flippedCards[1])
    }
}

function checkMatching(firstCard,secondCard){
    let attemps=document.querySelector(".attempts span")

    
    

    if(firstCard.dataset.logo===secondCard.dataset.logo){
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        firstCard.classList.add('matched')
        secondCard.classList.add('matched')

        document.getElementById('correct').play();
    }
    else{
        
        attemps.innerHTML=parseInt(attemps.innerHTML)+1;
        setTimeout(()=>{
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip')
        },duration)
        document.getElementById('wrong').play();
    }
}
function stopClicking() {
    cardsContainer.classList.add('stop-clicking');
    setTimeout(()=>{
        allowClicking()
    },duration)
  }
  
  function allowClicking() {
    cardsContainer.classList.remove('stop-clicking');
  }
  