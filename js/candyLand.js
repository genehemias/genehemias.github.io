
(function () {
    'use strict';

    $(document).foundation()

    function newCard(color, number, special) {
        return {
            number: number,
            color: color,
            special: special
        };
    }

    let deck = [];
    let discardPile = [];
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

    //add 8 of each single color cards to deck
    for (let index = 0; index < 8; index++) {
        for (const color in colors) {
            deck.push(newCard(colors[color], 1, false));
        }
    }

    //add 2 of each double color cards to deck
    for (let index = 0; index < 2; index++) {
        for (const color in colors) {
            deck.push(newCard(colors[color], 2, false));
        }
    }

    //add 6 special cards to deck

    deck.push(newCard("pink", 0, "Plumpy"));
    deck.push(newCard("pink", 0, "Mr. Mint"));
    deck.push(newCard("pink", 0, "Jolly"));
    deck.push(newCard("pink", 0, "Gramma Nut"));
    deck.push(newCard("pink", 0, "Princess Lolly"));
    deck.push(newCard("pink", 0, "Queen Frostine"));


    function nextCard() {
        let card = $('#card');
        let label = $('#label');

        if (deck.length === 0) {
            deck = discardPile;
            discardPile = [];
        }

        let remainingCards = deck.length;
        let randomCardIndex = Math.floor(Math.random() * remainingCards);
        let nextCards = deck.splice(randomCardIndex, 1);
        let nextCard = nextCards[0];

        localStorage.setItem("currentCard", JSON.stringify(nextCard));

        card.css("background-color", nextCard.color);
        if (nextCard.number > 0) {
            label.html(nextCard.number);
        } else {
            label.html(nextCard.special);
        }

        discardPile.push(nextCard);
    }

    function playClickSound() {
        //$('#clickSound').play;
        document.getElementById('clickSound').play();
    }

    $('#button').click(() => {
        playClickSound();
        nextCard();
    });

    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker
    //         .register('./service-worker.js')
    //         .then(function () { console.log('Service Worker Registered'); });
    // }
})();
