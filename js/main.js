// Save Deck 
let deckId = ''
//==============================================
// Fetch New Shuffled Deck on Screen Load
// fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
// .then(res => res.json()) // parse response as JSON
// .then(data => {
//   console.log(data)
//   deckId = data.deck_id

//   localStorage.setItem('deck_id', deckId)
//   localStorage.setItem('remainingCards', data.remaining)
//   localStorage.setItem('p1Holding', 0)
//   localStorage.setItem('p2Holding', 0)

//   // 
//   document.getElementById('cards-left').innerText = `Cards Left In The Deck: ${data.remaining}`
//   document.querySelector('.p1-holding').innerText = `Player 1's Hand:  ${localStorage.getItem('p1Holding')}`
//   document.querySelector('.p2-holding').innerText = `Player 2's Hand:  ${localStorage.getItem('p2Holding')}`
//         console.log('cid', )
//   console.log(data, deckId)
//   })
//   .catch(err => {
//       console.log('Error', err)
//   });


// document.getElementById('draw-cards').addEventListener('click', drawTwo)

// // Draw Two Cards
// function drawTwo(){
//   const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log('d2',data)
//         // Get Player 1 Card(s)
//         document.getElementById('player1Hand').querySelector('img').src = data.cards[0].image
//         // Get Player 2 Card(s)
//         document.getElementById('player2Hand').querySelector('img').src = data.cards[1].image

//         // Get Value of card
//         let p1CardVal = cardConverter(data.cards[0].value)
//         let p2CardVal = cardConverter(data.cards[1].value)
//         console.log(p1CardVal, p2CardVal)

//         // Check Winner
//         checkWinner(p1CardVal, p2CardVal)

//         // Decrease Card Deck count
//         localStorage.setItem('remainingCards', data.remaining)
//         let cardsInDeck = localStorage.getItem('remainingCards')
//         document.getElementById('cards-left').textContent = `Cards Left In The Deck: ${cardsInDeck}`
//         console.log('cid', cardsInDeck)

//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

// // Check Winner Function
// function checkWinner(card1, card2){
//   let winner = ''
//   if (card1 > card2) {
//     document.querySelector('.winner').innerText = 'Player 1 Wins!'
//     winner = 'p1'
//   } else if (card1 < card2) {
//     document.querySelector('.winner').innerText = 'Player 2 Wins!'
//     winner = 'p2'
//   } else {
//     document.querySelector('.winner').innerText = "It's Time for WAR!!!"
//     // winner = war()
//     // war()
//   }
//   updateHand(winner)
//   console.log(winner)
// }

// // Convert Face to Number
// function cardConverter(card) {
//   // Switch case
//   switch (card) {
//     case 'ACE':
//       return 14;
//     case 'KING':
//       return 13;
//     case 'QUEEN':
//       return 12;
//     case 'JACK':
//       return 11;
//     default:
//       return Number(card)
//   }
// }

// // Update player's hand
// function updateHand(str) {
//   if(!localStorage.getItem(`${str}Holding`)) {
//     localStorage.setItem(`${str}Holding`)
//   }
//   let hand = Number(localStorage.getItem(`${str}Holding`))
//   hand += 2
//   localStorage.setItem(`${str}Holding`, hand)
//   showScore()
// }

// // War function
// function war() {
//   fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//       localStorage.setItem('remainingCards', data.remaining)
//       // let afterWarCount = localStorage.getItem('remainingCards')
      
//       // Get players new war cards
//       let p1WarCardVal = cardConverter(data.cards[3].value)
//       let p2WarCardVal = cardConverter(data.cards[7].value)
      
//       console.log('war', checkWinner(p1WarCardVal,p2WarCardVal))
//     })
//     .catch((err) => console.log('Error', err));

//   // checkWinner(p1WarCardVal,p2WarCardVal)
// }


// function showScore(){
//   document.querySelector('.p1-holding').innerText = `Player 1's Hand:  ${localStorage.getItem('p1Holding')}`
//   document.querySelector('.p2-holding').innerText = `Player 2's Hand:  ${localStorage.getItem('p2Holding')}`
//   document.getElementById('score').textContent = `Score: ${localStorage.getItem('botScore')}`
// }

// 
// Initialize deck ID
// let deckId = '';

// Fetch New Shuffled Deck on Screen Load
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json())
.then(data => {
    console.log(data);
    deckId = data.deck_id;

    localStorage.setItem('deck_id', deckId);
    localStorage.setItem('remainingCards', data.remaining);
    localStorage.setItem('p1Holding', 0);
    localStorage.setItem('p2Holding', 0);

    updateUIWithInitialData(data);
})
.catch(err => {
    console.log('Error', err);
});

// Draw Two Cards
document.getElementById('draw-cards').addEventListener('click', drawTwo);

function drawTwo() {
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        handleDrawnCards(data);
    })
    .catch(err => {
        console.log(`error ${err}`);
    });
}

// Check Winner Function
function checkWinner(card1, card2) {
    let winner = '';
    if (card1 > card2) {
        document.querySelector('.winner').innerText = 'Player 1 Wins!';
        winner = 'p1';
    } else if (card1 < card2) {
        document.querySelector('.winner').innerText = 'Player 2 Wins!';
        winner = 'p2';
    } else {
        document.querySelector('.winner').innerText = "It's Time for WAR!!!";
        initiateWar();
    }
    updateHand(winner);
}

// Convert Face to Number
function cardConverter(card) {
    switch (card) {
        case 'ACE': return 14;
        case 'KING': return 13;
        case 'QUEEN': return 12;
        case 'JACK': return 11;
        default: return Number(card);
    }
}

// Update player's hand
function updateHand(str) {
    let hand = Number(localStorage.getItem(`${str}Holding`));
    hand += 2;
    localStorage.setItem(`${str}Holding`, hand);
    showScore();
}

// Handle drawn cards
function handleDrawnCards(data) {
    document.getElementById('player1Hand').querySelector('img').src = data.cards[0].image;
    document.getElementById('player2Hand').querySelector('img').src = data.cards[1].image;

    let p1CardVal = cardConverter(data.cards[0].value);
    let p2CardVal = cardConverter(data.cards[1].value);

    checkWinner(p1CardVal, p2CardVal);

    localStorage.setItem('remainingCards', data.remaining)
    let cardsInDeck = localStorage.getItem('remainingCards')
    document.getElementById('cards-left').textContent = `Cards Left In The Deck: ${cardsInDeck}`
}

// War function
function initiateWar() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`)
    .then(res => res.json())
    .then(data => {
        handleWarCards(data);
    })
    .catch(err => {
        console.log('Error', err);
    });
}

// Handle war cards
function handleWarCards(data) {
  localStorage.setItem('remainingCards', data.remaining)
  let p1WarCardVal = cardConverter(data.cards[3].value);
  let p2WarCardVal = cardConverter(data.cards[7].value);
  
    checkWinner(p1WarCardVal, p2WarCardVal);
}

// Update the UI with initial data
function updateUIWithInitialData(data) {
    document.getElementById('cards-left').textContent = `Cards Left In The Deck: ${data.remaining}`;
    document.querySelector('.p1-holding').innerText = `Player 1's Hand:  ${localStorage.getItem('p1Holding')}`;
    document.querySelector('.p2-holding').innerText = `Player 2's Hand:  ${localStorage.getItem('p2Holding')}`;
}

// Show score function
function showScore() {
    document.querySelector('.p1-holding').innerText = `Player 1's Hand:  ${localStorage.getItem('p1Holding')}`;
    document.querySelector('.p2-holding').innerText = `Player 2's Hand:  ${localStorage.getItem('p2Holding')}`;
}

