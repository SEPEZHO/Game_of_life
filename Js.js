var canvas = document.getElementById('c1'); // получим canvas
var ctx = canvas.getContext('2d');
var mas = [];
var count = 0;
var timer;
var range = document.getElementById('range');
var width = 1200;
var height = 720;
// При клике на игровом поле мы должны подставить героя.
canvas.onclick = function (event) {
  var x = event.offsetX; // кордината определяется относительно кенваса
  var y = event.offsetY;
  console.log(x);
  console.log(y);
  // Координаты при клике определяются от 0 до 30.
  x = Math.floor(x / 10); // 300:10 = 30
  y = Math.floor(y / 10);
  (mas[y][x] == 0) ? mas[y][x] = 1: mas[y][x] = 0; // поле, при клике на которое, ставится 1, а если там 1 - то ставится 0
  console.log(mas);
  drawField();
}
// Создадим игровое поле.
function goLife() {
  var n = width,
    m = height; // Создадим массив, который имитирует игровое поле.
  for (var i = 0; i < n; i++) {
    mas[i] = []; // объявим пустой массив
    for (var j = 0; j < m; j++) {
      mas[i][j] = 0;
    }
  }
}
goLife();

function stroke() {
  for (var x = 0.5; x <= width; x += 10) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, width);
  }
  for (var y = 0.5; y <= width; y += 10) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.strokeStyle = 'black';
  ctx.stroke();
}
stroke();

function drawField() {
  ctx.clearRect(0, 0, width, height);
  stroke();
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      if (mas[i][j] == 1) {
        ctx.fillStyle = 'black';
        ctx.fillRect(j * 10, i * 10, 10, 10);
      }
    }
  }
}
// Моделирование жизни.
function startLife() {
  var mas2 = [];
  for (var i = 0; i < width; i++) {
    mas2[i] = [];
    for (var j = 0; j < height; j++) {
      var neighbors = 0;
      if (mas[fpm(i) - 1][j] == 1) neighbors++; //up
      if (mas[i][fpp(j) + 1] == 1) neighbors++; //right
      if (mas[fpp(i) + 1][j] == 1) neighbors++; //bottom
      if (mas[i][fpm(j) - 1] == 1) neighbors++; //left
      if (mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;
      if (mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;
      if (mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;
      if (mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;
      if (mas[i][j] == 0 && neighbors == 3) {
        mas2[i][j] = 1;
      } else {
        if (neighbors == 2 && mas[i][j] == 1 || neighbors == 3 && mas[i][j] == 1) {
          mas2[i][j] = 1;
        } else {
          mas2[i][j] = 0;
        }
      }
    }
  }
  mas = mas2;
  drawField();
  reset();
}

function reset() {
  count++;
  document.getElementById('count').innerHTML = count;
  var speed = range.value;
  timer = setTimeout(startLife, speed);
  var p = document.getElementById('p');
  p.innerHTML = range.value;
}

function fpm(i) {
  if (i == 0) return width;
  else return i;
}

function fpp(i) {
  if (i == width - 1) return -1;
  else return i;
}
document.getElementById('start').onclick = startLife;
