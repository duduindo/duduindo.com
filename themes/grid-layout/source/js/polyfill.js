
// Navigator Vibrate
//
if (!('vibrate' in window.navigator)) {
  window.navigator.vibrate = function() {};
}
