var $timer = $('#timer'),
    time = 2 * 60,
    formattedTime = formatTime(time*1000),
    formattedTickedTime = [];

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

var timer = new Timer({
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

displayTimer(formattedTime);

$('#start-button').on('click', function(){
  timer.start(time);
});

$('#reset-button').on('click', function(){
  timer.stop();
  displayTimer(formattedTime);
  Game.init(cards);
  timer.start(time);
});
