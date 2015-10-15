(function(){
  //---------------------------------------------
  // GLOBAL VARIABLES
  //---------------------------------------------
  var $timer = $('#timer'),
      time = 2 * 60,
      formattedTime = formatTime(time*1000),
      formattedTickedTime = [],
      Game = {},
      cards = [],
      timer;

  //---------------------------------------------
  // FUNCTION HELPERS
  //---------------------------------------------
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

  function formatTime(millisec) {
    var min = parseInt(millisec / 60000,10),
        sec = Math.round(millisec / 1000) % 60;
    if (sec < 10) {
      sec = '0' + sec;
    }
    return [min, sec];
  }

  function displayTimer(time) {
    $timer.html('<span>'+time[0]+':'+time[1]+'</span>');
  }

  //---------------------------------------------
  // OBJECTS
  //---------------------------------------------
  Game = {
    cards: [],
    pickedCard: null,
    cardCounter: 0,
    attempts: 0,
    init: function(cards) {
      this.resetProps();
      this.setCards(cards);
      this.placeCards(this.cards);
      this.attachEvent();
      this.attachJqueryFlip();
      this.updateAttemptsDOM(0);
    },
    resetProps: function(){
      $('#game-container').html('');
      $('#game-container').off('click');
      this.pickedCard = null;
      this.cardCounter = 0;
      this.attempts = 0;
    },    
    canPick: false,
    setCards: function(cards) {
      var newCardArrays = $.merge([], cards),
          mergedCardArrays = $.merge(newCardArrays, newCardArrays);

      this.cards = shuffle(mergedCardArrays);
      this.cardCounter = mergedCardArrays.length;
    },
    placeCards: function(cards) {
      for(var i=0;i<cards.length;i++) {
        $('#game-container').append(
          '<div class="card"><div></div><div><img src='+cards[i].img+'></div></div>'    
        );
      }
    },
    updateAttemptsDOM: function(attempts) {
      $('#no_of_attempts').html(attempts);
    },
    attachEvent: function() {
      var self = this;
      $('#game-container').on('click', '.card', function(){
        if(self.canPick && self.pickedCard !== this ) {
          $(this).flip(true);
          if(!self.pickedCard) {
            self.pickedCard = this;
          } else if($(self.pickedCard).find('img').attr('src') === $(this).find('img').attr('src')) {
            self.pickedCard = null;
            self.cardCounter -= 2;
            if(self.cardCounter === 0) {
              timer.stop();
              // check if cheating
              var tickedTimeSec = (formattedTickedTime[0] * 60) + formattedTickedTime[1];
              if(Game.attempts < 6 || ( time - tickedTimeSec <= 10)) {
                alert('you cheated!');
              } else {
                alert('you win!');
              }
            }
          } else {
            self.canPick = false;
            setTimeout( function() {
              $(this).flip(false);
              $(self.pickedCard).flip(false);
              self.pickedCard = null;
              self.canPick = true;
              self.attempts += 1;
              self.updateAttemptsDOM(self.attempts);
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

  cards = [
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

  timer = new Timer({
    tick: 1,
    ontick: function(millisec) {
      formattedTickedTime = formatTime(millisec);
      $timer.html('<span>'+formattedTickedTime[0]+':'+formattedTickedTime[1]+'</span>');
    },
    onstart: function() {
      Game.canPick = true;
      console.log('timer started');
    },
    onstop: function(){
      console.log('timer stopped');
    },
    onend: function() {
      console.log('timer finished');
      Game.canPick = false;
      $timer.html('<span>Time finished!</span>');
    }
  });

  //---------------------------------------------
  // EVENT HANDLERS
  //---------------------------------------------
  $('#start-button').on('click', function(){
    timer.start(time);
  });

  $('#reset-button').on('click', function(){
    timer.stop();
    displayTimer(formattedTime);
    Game.init(cards);
    timer.start(time);
  });

  //---------------------------------------------
  // INITIALIZERS
  //---------------------------------------------
  Game.init(cards);
  displayTimer(formattedTime);
}());
