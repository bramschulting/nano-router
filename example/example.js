var view = document.getElementById('app');

var router = new NanoRouter({

  '/': function () {
    view.innerHTML = 'Home<br />';

    var inp = document.createElement('input');
    inp.placeholder = 'Name';
    view.appendChild(inp);

    var button = document.createElement('button');
    button.innerText = 'Go';
    button.addEventListener('click', function () {
      NanoRouter.navigate('hello/' + inp.value);
    });
    view.appendChild(button);
  },

  '/hello/:name':  function (name) {
    view.innerText = 'Hello ' + name + '!';
  },

  '/hello/:name/:age': function (name, age) {
    view.innerText = 'Hello ' + name + '! You are ' + age + ' years old.';
  }

});

router.onBeforeRoute(function (next) {
  console.log('Opening: ' + next);
});
