function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var Game = {

  cards: [],
  pickedCard: null,
  cardCounter: 0,
  init: function(cards) {
    this.resetProps();
    this.setCards(cards);
    this.placeCards(this.cards);
    this.attachEvent();
    this.attachJqueryFlip();
  },
  resetProps: function(){
    $('#game-container').html('');
    this.pickedCard = null;
    this.cardCounter = 0;
  },    
  canPick: true,
  setCards: function(cards) {
    var newCardArrays = $.merge([], cards),
        mergedCardArrays = $.merge(newCardArrays, newCardArrays);

    this.cardCounter = mergedCardArrays.length;
    this.cards = shuffle(mergedCardArrays);
  },
  placeCards: function(cards) {
    for(var i=0;i<cards.length;i++) {
      $('#game-container').append(
        '<div class="card" data-name='+cards[i].name+'><div></div><div><img src='+cards[i].img+'></div></div>'    
      );
    }
  },
  attachEvent: function() {
    var self = this;
    $('#game-container').on('click', '.card', function(){
      if(self.canPick && self.pickedCard !== this ) {
        $(this).flip(true);
        if(!self.pickedCard) {
          self.pickedCard = this;
        } else if($(self.pickedCard).data('name') === $(this).data('name')) {
          self.pickedCard = null;
          self.cardCounter -= 2;
          if(self.cardCounter === 0) {
            alert('you win!');
          }
        } else {
          self.canPick = false;
          setTimeout( function() {
            $(this).flip(false);
            $(self.pickedCard).flip(false);
            self.pickedCard = null;
            self.canPick = true;
          }.bind(this),500);
        }
      }
    });
  },
  attachJqueryFlip: function(){
    // Attach manual jQuery flip event to all cards
    $(".card").flip({
      trigger: 'manual'
    });
  }

};

var cards = [
		{
			name: "php",
			img: "assets/php-logo_1.png",
			id: 1,
		},
		{
			name: "css3",
			img: "assets/css3-logo.png",
			id: 2
		},
		{
			name: "html5",
			img: "assets/html5-logo.png",
			id: 3
		},
		{
			name: "jquery",
			img: "assets/jquery-logo.png",
			id: 4
		}, 
		{
			name: "javascript",
			img: "assets/js-logo.png",
			id: 5
		},
		{
			name: "node",
			img: "assets/nodejs-logo.png",
			id: 6
		},
		{
			name: "photoshop",
			img: "assets/photoshop-logo.png",
			id: 7
		},
		{
			name: "python",
			img: "assets/python-logo.png",
			id: 8
		},
		{
			name: "rails",
			img: "assets/rails-logo.png",
			id: 9
		},
		{
			name: "sass",
			img: "assets/sass-logo.png",
			id: 10
		},
		{
			name: "sublime",
			img: "assets/sublime-logo.png",
			id: 11
		},
		{
			name: "wordpress",
			img: "assets/wordpress-logo.png",
			id: 12
		},
	];

Game.init(cards);

// can only start play the game after click the start button
Game.canPick = false;
