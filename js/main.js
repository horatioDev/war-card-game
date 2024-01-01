// Save Deck 
let deckId = ''
//==============================================
// Fetch New Shuffled Deck on Screen Load
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  deckId = data.deck_id

  localStorage.setItem('deck_id', deckId)
  localStorage.setItem('remainingCards', data.remaining)

  // 
  document.getElementById('cards-left').innerText = `Cards Left In The Deck: ${data.remaining}`
        console.log('cid', )
  console.log(data, deckId)
  })
  .catch(err => {
      console.log(`error ${err}`)
  });


document.getElementById('draw-cards').addEventListener('click', drawTwo)
document.getElementById('new-hand').addEventListener('click', newHand)

// Draw Two Cards
function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log('d2',data)
        // Get Player 1 Card(s)
        document.getElementById('player1Hand').querySelector('img').src = data.cards[0].image
        // Get Player 2 Card(s)
        document.getElementById('player2Hand').querySelector('img').src = data.cards[1].image

        // Get Value of card
        let p1CardVal = cardConverter(data.cards[0].value)
        let p2CardVal = cardConverter(data.cards[1].value)
        console.log(p1CardVal, p2CardVal)

        // Check Winner
        checkWinner(p1CardVal, p2CardVal)

        // Decrease Card Deck count
        localStorage.setItem('remainingCards', data.remaining)
        let cardsInDeck = localStorage.getItem('remainingCards')
        document.getElementById('cardCount').textContent = `Cards Left In The Deck: ${cardsInDeck}`
        console.log('cid', cardsInDeck)

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// Check Winner Function
function checkWinner(card1, card2){
  if (card1 > card2) {
    document.querySelector('.winner').innerText = 'Player 1 Wins!'
  } else if (card1 < card2) {
    document.querySelector('.winner').innerText = 'Player 2 Wins!'
  } else {
    document.querySelector('.winner').innerText = "It's a Draw! I DECLARE WAR!!!"
  }
}

// Convert Face to Number
function cardConverter(card) {
  // Switch case
  switch (card) {
    case card === 'ACE':
      return 14;
    case card === 'KING':
      return 13;
    case card === 'QUEEN':
      return 12;
    case card === 'JACK':
      return 11;
    default:
      return card
  }
}

// 

function newHand(){
  const url = 'https://www.deckofcardsapi.com/api/deck/new/'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log('nh',data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

newHand()