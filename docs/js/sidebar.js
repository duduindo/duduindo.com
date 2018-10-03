
(function() {
  const main = document.getElementsByClassName('js-aside').item(0);
  const target = main.getElementsByClassName('js-aside-target').item(0);
  const trigger = main.getElementsByClassName('js-aside-trigger').item(0);
  const classHidden = 'is-hidden-xs';


  trigger.addEventListener('click', function() {
    target.classList.toggle(classHidden);
    window.navigator.vibrate(40);
  });
})();
