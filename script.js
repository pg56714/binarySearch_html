const numbersContainer = document.querySelector('.numbers-container');
const nextStepButton = document.getElementById('next-step');
const targetInput = document.getElementById('target');
const updateBoundariesButton = document.getElementById('update-boundaries');
const binarySearchStepButton = document.getElementById('binary-search-step');
const cursorLine = document.querySelector('.cursor-line');
updateBoundariesButton.addEventListener('click', updateBoundaries);
binarySearchStepButton.addEventListener('click', binarySearchStep);

// 數字是從1開始，可以更改lastNumber來改變最大值
const lastNumber = 20

let range = []
for (let i = 1; i <= lastNumber; i++) {
    range.push(i)
}

document.addEventListener('mousemove', (e) => {
  cursorLine.style.left = e.pageX + 'px';
  cursorLine.style.top = e.pageY + 'px';
  cursorLine.style.opacity = 1;
});

cursorLine.addEventListener('transitionend', () => {
  cursorLine.style.opacity = 0;
});

for (let i = 0; i < range.length; i++) {
  const number = document.createElement('div');
  number.classList.add('number');
  number.textContent = range[i];
  numbersContainer.appendChild(number);

  const index = document.createElement('div');
  index.classList.add('index');
  index.textContent = i;
  number.appendChild(index);
}

let left = 0;
let right = range.length - 1;
let mid;
let searchFinished = false;
updateBoundaries();
nextStepButton.addEventListener('click', () => {
  if (searchFinished) {
    resetSearch();
    updateBoundaries();
  } else {
    updateBoundaries();
    binarySearchStep();
  }
});

function binarySearchStep() {
  if (left <= right) {
    mid = Math.floor((left + right) / 2);
    const numberElement = numbersContainer.children[mid];
    const target = parseInt(targetInput.value);
      // Set the mid-value element's text content
  document.getElementById('mid-value').textContent = mid;

    // Set the expression element's text content
    document.getElementById('expression').textContent = left + " + " + right;
    document.getElementById('expression').textContent = "(" + left + " + " + right + ")" + " / 2 = " + Math.floor((left + right) / 2);

    clearSearching();
    numberElement.classList.add('searching');

    if (range[mid] === target) {
      numberElement.classList.remove('searching');
      numberElement.classList.add('found');
      searchFinished = true;
      nextStepButton.textContent = '重新開始';
    } else if (range[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  } else {
    clearSearching();
    searchFinished = true;
    nextStepButton.textContent = 'Reset';
    alert('拍謝，沒找到！');
  }
}

function updateBoundaries() {
  const boundaryElements = document.querySelectorAll('.number.boundary');
  boundaryElements.forEach((element) => {
    element.classList.remove('boundary');
  });

  if (left <= right) {
    numbersContainer.children[left].classList.add('boundary');
    numbersContainer.children[right].classList.add('boundary');

    // Set the left-value and right-value elements' text content
    document.getElementById('left-value').textContent = left;
    document.getElementById('right-value').textContent = right;
    // Set the left-value and right-value elements' text content
    document.getElementById('expression').textContent = "(" + left + " + " + right + ")" + " / 2 = " + Math.floor((left + right) / 2);
  }
}

function clearSearching() {
  const searchingElements = document.querySelectorAll('.number.searching');
  searchingElements.forEach((element) => {
    element.classList.remove('searching');
  });
}

function resetSearch() {
  left = 0;
  right = range.length - 1;
  searchFinished = false;
  nextStepButton.textContent = '下一步';
  clearSearching();

  const foundElement = document.querySelector('.number.found');
  if (foundElement) {
    foundElement.classList.remove('found');
  }
  updateBoundaries();
}
