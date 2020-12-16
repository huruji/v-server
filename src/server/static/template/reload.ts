(function () {
  function connect(endpoint, func) {
      let offset = 0;
      const request = new XMLHttpRequest();
      request.open('GET', endpoint, true);
      request.send();
      request.addEventListener('readystatechange', function () {
          if (request.readyState === 3) {
              const signal = request.response.slice(offset);
              offset += signal.length;
              func(signal);
          }
          if (request.readyState === 4) {
              setTimeout(function () { return connect(endpoint, func); }, 4000);
              func('connecting');
          }
      });
  }
  let established = 0;
  connect('/_server_/signal', function (signal) {
      if (signal === 'established') {
          established += 1;
      }
      if (signal === 'reload' || established > 1) {
          window.location.reload();
      }
      if (signal !== 'ping') {
          const style = 'color: #ccc';
          const message = "v-server: " + signal;
          console.log("%c" + message, style);
      }
  });
})();
