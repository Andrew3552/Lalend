<!DOCTYPE html>
<html lang="ru"> <?php
  file_get_contents('https://micrometrr.com/56930fa/postback?subid=' . $_COOKIE['subid'] . '&status=lead');
?>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex,nofollow" />
  <title>Kazatomprom</title>
  <link rel="stylesheet" type="text/css" href="css/thanks.css" />
  <link rel="icon" href="images/favicon.ico" type="image/png" />
  <script src="js/pixelInitLead.js"></script>
</head>

<body class="thank_page_main">
  <div class="thank_page_body">
    <img class="thank_logo" src="../images/logo.png" alt="logo" />
    <div class="thank_page_wrap">
      <p class="sub_title_message">Вашу заявку принято!</p>
      <p class="message"> После проверки ваших данных с вами свяжется менеджер для подтверждения регистрации. </p>
      <p class="message">Ваш личный консультант свяжется с вами через:</p>
      <div class="counter-wrapper">
        <div class="numbers-wrapper">
          <div class="numbers-block-outer">
            <div class="numbers-block-inner">
              <span class="current-number hours">23</span>
            </div>
          </div>
          <span class="time-measure hours-span">часа</span>
        </div>
        <div class="numbers-wrapper">
          <div class="numbers-block-outer">
            <div class="numbers-block-inner">
              <span class="current-number minutes">51</span>
            </div>
          </div>
          <span class="time-measure minutes-span">минут</span>
        </div>
        <div class="numbers-wrapper">
          <div class="numbers-block-outer">
            <div class="numbers-block-inner">
              <span class="current-number seconds">23</span>
            </div>
          </div>
          <span class="time-measure seconds-span">секунд</span>
        </div>
      </div>
    </div>
  </div>
</body>
<script src="js/jquery.min.js"></script>
<script>
/* COUNTER */
var localStorage = window.localStorage,
  startDate;
if (localStorage.getItem('startDate')) {
  startDate = localStorage.getItem('startDate');
} else {
  startDate = new Date();
  localStorage.setItem('startDate', startDate);
}
setTimer(startDate);

function setTimer(startDate) {
  var deadline = new Date(Date.parse(startDate) + 01 * 24 * 60 * 60 * 1000);
  initializeClock('countdown', deadline);
}
// Countdown
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  return {
    total: t,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(id, endtime) {
  var clock = document.querySelector('.counter-wrapper');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      startDate = new Date();
      localStorage.setItem('startDate', startDate);
      var deadline = new Date(Date.parse(startDate) + 24 * 60 * 60 * 1000);
      initializeClock('countdown', deadline);
      clearInterval(timeinterval);
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
</script>

</html>