// 1.
/* Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”). */
axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
.then( (response) => {
    const card = response.data.cards[0];
    console.log(`${card.value} of ${card.suit}`);
});

// 2.
/* Make a request to the deck of cards API to request a single card from a newly shuffled deck.
Once you have the card, make a request to the same API to get one more card from the same deck.
Once you have both cards, console.log the values and suits of both cards. */
const newDeck = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
axios.get(newDeck)
.then( ( response ) => {
    const deckID = response.data['deck_id'];
    return axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`);
})
.then ( (response) => {
    const [card1, card2] = response.data.cards;
    console.log(`1: ${card1.value} of ${card1.suit}`);
    console.log(`2: ${card2.value} of ${card2.suit}`);
});

// 3.
/* Build an HTML page that lets you draw cards from a deck.
When the page loads, go to the Deck of Cards API to create a new deck,
and show a button on the page that will let you draw a card. Every time you click the button,
display a new card, until there are no cards left in the deck.*/
const btn = document.getElementById('btn-draw');
const pile = document.getElementById('card-pile');
const counter = document.getElementById('card-count');
axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then( (response ) => {
    const deck = response.data;
    const deckSize = deck.remaining;
    counter.innerText = `Cards Remaining: ${deck.remaining}`;

    btn.addEventListener('click', function(evt){
        deck.remaining -= 1;
        if (deck.remaining < 0) return;
        axios.get(`http://deckofcardsapi.com/api/deck/${deck['deck_id']}/draw/?count=1`)
        .then( (response) => {
            deck.remaining = response.data.remaining;
            const card = response.data.cards[0];
            const cardImg = document.createElement('img');
            cardImg.src = card.image; 
            cardImg.alt = `${card.value} of ${card.suit}`;
            cardImg.classList.add('card');
            cardImg.style.zIndex = deckSize - deck.remaining;
            cardImg.style.transform = `rotate(${Math.random()}turn)`;
            cardImg.style.top = String(Math.trunc(Math.random() * 10) - 5) + 'px';
            cardImg.style.left = String(Math.trunc(Math.random() * 50) - 10) + 'px';
            pile.append(cardImg);
            counter.innerText = `Cards Remaining: ${deck.remaining}`;
        })
        .catch( (err) => {
            console.log(err)
        })
    })

});