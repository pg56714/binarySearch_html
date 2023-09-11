const binarySearchContainer = document.querySelector('.binary-search-container');
const linearSearchContainer = document.querySelector('.linear-search-container');
const startButton = document.getElementById('start-search');
const targetInput = document.getElementById('target');
const binaryStepCountElement = document.getElementById('binary-step-count');
const linearStepCountElement = document.getElementById('linear-step-count');

// 數字是從1開始，可以更改lastNumber來改變最大值
const lastNumber = 20
let range = []
for (let i = 1; i <= lastNumber; i++) {
    range.push(i)
}
console.log(range)

// 線型搜索 - 基本邏輯無特別算法
for (let i = 0; i < range.length; i++) {
  const number = document.createElement('div');
  number.classList.add('number');
  number.textContent = range[i];
  binarySearchContainer.appendChild(number.cloneNode(true));
  linearSearchContainer.appendChild(number);
}

let binaryLeft = 0;
let binaryRight = range.length - 1;
let binaryMid;
let binaryStepCount = 0;
let binarySearchFinished = false;

let linearIndex = 0;
let linearStepCount = 0;
let linearSearchFinished = false;

startButton.addEventListener('click', async () => {
  if (binarySearchFinished && linearSearchFinished) {
    resetSearch();
  } else {
    startButton.disabled = true;
    await runSearches();
    startButton.disabled = false;
  }
});

async function runSearches() {
  while (!binarySearchFinished || !linearSearchFinished) {
    if (!binarySearchFinished) {
      await binarySearchStep();
    }
    if (!linearSearchFinished) {
      await linearSearchStep();
    }
    await sleep(500);
  }
}

async function binarySearchStep() {
  if (binaryLeft <= binaryRight) {
    binaryMid = Math.floor((binaryLeft + binaryRight) / 2);
    const numberElement = binarySearchContainer.children[binaryMid];
    const target = parseInt(targetInput.value);

    clearSearching(binarySearchContainer);
    numberElement.classList.add('searching');
    binaryStepCount++;
    binaryStepCountElement.textContent = `花了幾步: ${binaryStepCount}`;

    if (range[binaryMid] === target) {
      numberElement.classList.remove('searching');
      numberElement.classList.add('found');
      binarySearchFinished = true;
    } else if (range[binaryMid] < target) {
      binaryLeft = binaryMid + 1;
    } else {
      binaryRight = binaryMid - 1;
    }
  } else {
    clearSearching(binarySearchContainer);
    binarySearchFinished = true;
    alert('懂算法的工程師：拍謝！沒找到！');
  }
}

async function linearSearchStep() {
  if (linearIndex < range.length) {
    const numberElement = linearSearchContainer.children[linearIndex];
    const target = parseInt(targetInput.value);

    clearSearching(linearSearchContainer);
    numberElement.classList.add('searching');
    linearStepCount++;
    linearStepCountElement.textContent = `花了幾步: ${linearStepCount}`;

    if (range[linearIndex] === target) {
      numberElement.classList.remove('searching');
      numberElement.classList.add('found');
      linearSearchFinished = true;
    } else {
      linearIndex++;
    }
  } else {
    clearSearching(linearSearchContainer);
    linearSearchFinished = true;
    alert('不懂算法的工程師：終於全部找完了！哈哈！沒找到！但在找的時後我喝了一杯珍奶，送！');
  }
}

function clearSearching(searchContainer) {
  const searchingElements = searchContainer.querySelectorAll('.number.searching');
  searchingElements.forEach((element) => {
    element.classList.remove('searching');
  });
}

function resetSearch() {
  binaryLeft = 0;
  binaryRight = range.length - 1;
  binarySearchFinished = false;
  binaryStepCount = 0;
  binaryStepCountElement.textContent = `花了幾步: ${binaryStepCount}`;
  clearSearching(binarySearchContainer);

  linearIndex = 0;
  linearSearchFinished = false;
  linearStepCount = 0;
  linearStepCountElement.textContent = `花了幾步: ${linearStepCount}`;
  clearSearching(linearSearchContainer);

  const foundElements = document.querySelectorAll('.number.found');
  foundElements.forEach((element) => {
    element.classList.remove('found');
  });

  startButton.textContent = '出來面對！';
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

