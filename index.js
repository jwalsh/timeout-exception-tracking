const when = require('when');
const $ = require('jquery');
const _ = require('lodash');

const endpoint="http://p.wal.sh/fb-perf/5s-sleep-json.php";
const settings={};

const out = document.getElementById('out');
const timer = document.getElementById('timer');

let start = (new Date()).getTime();

window.setInterval(() => {
  let current = (new Date()).getTime();
  timer.innerHTML = ((current - start) / 1000) + ' seconds';
}, 1000)
let timeout = (4000 + Math.random() * 2000);

console.log('timeout', timeout);

when($.ajax(endpoint, settings))
  .timeout(timeout) // random failure
  .then((resp) => {
    console.log('then', resp);
    out.innerHTML = JSON.stringify(resp);
    return true;
  })
  .catch((err) => {
    console.log('catch', err);
    out.innerHTML = JSON.stringify(err);
  })
