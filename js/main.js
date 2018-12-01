function getData() {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();

  xhr.open('GET','https://kde.link/test/get_field_size.php', false);
  xhr.send();

  if (xhr.status != 200) {
    reject(error);
  } else {
    var data = JSON.parse(xhr.responseText);
    resolve(data);
    console.log(data);
  }
  });

}

function startGame() {
  getData()
    .then(
      data => game(data.width, data.height),
      error => console.log(`Rejected: ${error}`)
    );
}
var button = document.getElementById('button');
button.addEventListener('click', function () {
  startGame();
  button.style.display = 'none';
})



var count = 0,
stepsCount = 0,
container = [],
compare = [],
bl;

function makeBlock(i){

  let block = document.createElement('div');
  let name = 'block' + i;
  let uniqName = 'num' + count++;

  block.className = name ;
  block.id = uniqName;

  container[count] = block;
  count++;

  block.addEventListener('click', function () {
    block.classList.add('show');
    stepsCount++;
    checkSteps();
    if (compare.length == 1) {
      compare[1] = block.classList;
      if (compare[0].value != compare[1].value) {
        setTimeout(function () {

          block.classList.remove("show");
          bl.classList.remove("show");
        },700);

      }
      compare = [];

    } else {
      compare[0] = block.classList;
      bl = block;
    }

  });
}


function addBlock(k) {
  var wrap = document.createElement('div');
  wrap.className = 'wrap' ;
  area.appendChild(wrap);
  wrap.appendChild(container[k]);
}


//function for mixing pictures
function compareRandom(a, b) {
  return Math.random() - 0.5;
}


function game(width, height) {
  checkSteps();
  setSize(width,height);
  var items = height * width,
  area = document.getElementById('area'),
  i = 0;
  area.style.width = (width * 72 + 'px');

    for (let j = 0; j < (items/2); j++) {

      if (j % 10 == 0) {
        i = 0;
      }
      makeBlock(i,j);
      makeBlock(i,j);
      i++;
    }

    container.sort(compareRandom);

    for (var k = 0; k < items; k++) {
      addBlock(k);
    }

}


function setSize(width,height) {
  size = document.getElementById('size');
  size.textContent = `Size: ${width} X ${height} `;
}

function checkSteps() {
  steps = document.getElementById('steps');
  steps.textContent = `Steps: ${stepsCount} `;
}
