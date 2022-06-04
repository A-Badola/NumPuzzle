let n = 5;
let totalPuzzleSolved = 0;
let minTotalSec;
let minTotalMin;
let curTotalSec= 0;
let curTotalMin= 0;
let puzzleArea = document.getElementById('puzzleArea');
let doneBtn = document.getElementById('doneButton');
let valueChanged = n*(n+1)/2;
let appendSeconds = document.getElementById("seconds");
let appendMinutes = document.getElementById("minutes");
let curPuzzleEl = document.getElementById('currentPuzzle');
let totalPuzzleEl = document.getElementById('totalPuzzle');
let numberPad = document.getElementsByClassName('numberData');
let clrBtn = document.getElementById('clrButton');
let curInputEl;
let prevInputEl;

let startmodal = document.getElementById("startPuzzleModal");
let finishmodal = document.getElementById("finishPuzzleModal");
let startPuzzleBtn = document.getElementById("startPuzzle");
startPuzzleBtn.addEventListener('click', function(){
  startmodal.style.display = "none";
  totalPuzzleSolved = 0;
  curPuzzleEl.textContent = '1';
  getPuzzle();    
  timeComponentFunc();
}, false);

let closeBtn = document.getElementsByClassName("close");
for(let cb of closeBtn){
  cb.addEventListener('click', function(e){
    startmodal.style.display = "none";
    finishmodal.style.display = "none";
  }, false);
}
totalPuzzleEl.textContent = n;

let min = 0;
let sec = 0;
let hrs = 0;

function timeComponentFunc(){
  sec++;
  if(sec >= 60){
    sec = 0;
    min++;
    if(min >= 60){
      min = 0;
      sec = 0;
    }
  }

  appendSeconds.textContent = (sec > 9? sec : "0" + sec);
  appendMinutes.textContent = (min > 9? min: "0" + min);
  appendMinutes.style.fontSize = "large";
  appendSeconds.style.fontSize = "large";
  timeComp();
}

function timeComp(){
  t = setTimeout(timeComponentFunc, 1000);
}


for(let i = 1; i <= n; i++){
  let newRow = document.createElement('div');
  newRow.setAttribute('id', 'row'+i.toString(10));
  newRow.setAttribute('class', 'puzzleRow');
  puzzleArea.appendChild(newRow);
  
  for(let j = 1; j <= i; j++){
    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newRow.appendChild(newInput);
  }
}
  
let mat = [[16,0,0,0,0],
    [8,8,0,0,0],
    [4,4,4,0,0],
    [2,2,2,2,0],
    [1,1,1,1,1]
];

let ans = new Set();

function hideKeyboard(element) {
  element.setAttribute('readonly',''); // Force keyboard to hide on input field.
  setTimeout(function() {
      element.blur();  //actually close the keyboard
      // Remove readonly attribute after keyboard is hidden.
      element.removeAttribute('readonly');
      element.style.border = "0.3rem solid rgb(59, 69, 152)";
  }, 100);
}

function finalResultModal(){
  // Get the modal
  let curTotalTime = curTotalMin*60 + curTotalSec;
  checkCookie(curTotalTime);
  let minTotalTime = getCookie("minTotalTime");
  minTotalMin = Math.floor(minTotalTime/60);
  minTotalSec = minTotalTime%60;
  console.log(minTotalMin + " " + minTotalSec);
  let bestScoreEl = document.getElementById('bestScore');
  bestScoreEl.textContent = "Best Time: " + minTotalMin + ":" + minTotalSec;
  bestScoreEl.fontSize = "2rem";
  let currentScoreEl = document.getElementById('currentScore');
  currentScoreEl.textContent ="Time: " + curTotalMin + ":" + curTotalSec;
  currentScoreEl.fontSize = "2rem";
  finishmodal.style.display = "block";

  let startOverBtn = document.getElementById('startOver');
  startOverBtn.addEventListener('click', function(){
    finishmodal.style.display = "none";
    totalPuzzleSolved = 0;
    curPuzzleEl.textContent = '1';
    getPuzzle();      
    timeComponentFunc();
  }, false);
}

function checkSolvable(p){
  //vector<pair<int, int>> v;
  let v = [];
  for(let i = 0; i < n; i++){
    for(let j = 0; j <= i; j++){
      if(p[i][j] != 0){
        v.push([i,j]);
      }
    }
  }

  //for(int i = 0; i < v.size(); i++){
    //cout << v[i].first << " " << v[i].second << endl;
  //}

  for(let x = 0; x < 19; x++){
    let added = false;
    let isLeft = false;
    for(let i = 0; i < n; i++){
      for(let j = 0; j <= i; j++){
        if(p[i][j] == 0){
          isLeft = true;
          if(i+1<n && j+1<=i+1 && p[i+1][j]!=0 && p[i+1][j+1]!=0){
            p[i][j] = p[i+1][j] + p[i+1][j+1];
            added = true;
          }

          if(i-1>=0 && j+1<=i && p[i-1][j]!=0 && p[i][j+1]!=0){
            p[i][j] = p[i-1][j]-p[i][j+1];
            added = true;
          }

          if(i-1>=0 && j-1>=0 && p[i-1][j]!=0 && p[i][j-1]!=0){
            p[i][j] = p[i-1][j]-p[i][j-1];
            added = true;
          }
        }
      }
    }

    if(!isLeft){
      v.sort(function(a, b) {
        if (a[0] == b[0]) {
          return a[1] - b[1];
        }
        return a[0] - b[0];
      });

      let ff = 0, fr = 0, th = 0;
      for(let i = 0; i < v.length; i++){
        if(v[i][0] == n-1){
          ff++;
        }
        if(v[i][0] == n-2){
          fr++;
        }
        if(v[i][0] == n-3){
          th++;
        }
      }
      
      if(ff <= 3 && fr <= 1 && th <= 1){
        ans.add(v.toString());
        continue;
      }
      
      if(ff <= 2 && fr <= 2 && th <= 2){
        ans.add(v.toString());
        continue;
      }
       
      if(ff <= 1 && fr <= 1 && th <= 1){
        ans.add(v.toString());
        continue;
      }
      
    }

    if(!added){
      break;
    }
  }
  //cout << "after" << endl;
  let dup = [];
  for(let i = 0; i < n; i++){
    let inDup = [];
    for(let j = 0; j < n; j++){
      inDup.push(0);
    }
    dup.push(inDup);
  }

  for(let i = 0; i < v.length; i++){
    //cout << v[i].first << " " << v[i].second << endl;
    dup[v[i][0]][v[i][1]] = p[v[i][0]][v[i][1]];
  }

  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      p[i][j] = dup[i][j];
    }
  }

  //cout << "\n\n";  
  //cout << "after2" << endl;
}


function choosePos(p, k, pl, li, lj){
  //cout << li << " " << lj << " " << k <<  endl;
  if(k == 0){
    checkSolvable(p);
  }  
  if(k > pl){
    return;
  }

  for(let i = lj==li+1?li-1:li; i >= 0; i--){
    for(let j = lj==li+1? 0:lj; j <= i; j++){
      p[i][j] = mat[i][j];
      choosePos(p, k-1, pl-1, i, j+1);
      p[i][j] = 0;
      choosePos(p, k, pl-1, i, j+1);
    }
  }
}

let p = [];
for(let i = 0; i < n; i++){
  let inP = [];
  for(let j = 0; j < n; j++){
    inP.push(0);
  }
  p.push(inP);
}


choosePos(p, n, n*(n+1)/2 , 4, 0);

console.log("total configs : " + ans.size);


console.log(valueChanged);
let puzzle = []; 
function getPuzzle() {  
  valueChanged = n*(n+1)/2;
  for(let i = 0; i < n; i++){
    let inPuzzle = [];
    for(let j = 0; j < n; j++){
      inPuzzle.push(0);
    }
    puzzle.push(inPuzzle);
  }

  let maxValue = 10;
  for(let i = 0; i < n; i++){
    puzzle[n-1][i] = Math.floor(Math.random() * maxValue)+1;
  }

  for(let i = n-2; i>=0; i--){
    for(let j = 0; j <= i; j++){
      puzzle[i][j] = puzzle[i+1][j] + puzzle[i+1][j+1];
    }
  }

  console.log(puzzle);
  let totalpuzzleConfig = ans.size;
  let configNumber = Math.floor(Math.random()*totalpuzzleConfig);
  // moving set in array 
  let ansArr = [];
  for(let x of ans){
    let inansArr = [];
    for(let i = 0; i < x.length; i+=4){
      inansArr.push([x[i], x[i+2]]);
    }
    ansArr.push(inansArr);
  }

  let config = ansArr[configNumber];
  valueChanged -= ansArr[configNumber].length;
  console.log(valueChanged);
  console.log(configNumber);
  console.log(config);
  let idx = 0;
  for(let i = 0; i < n; i++){
    let row = document.getElementById('row'+(i+1));
    let curChild = row.firstChild;
    for(let j = 0; j <= i; j++){
      if(i == config[idx][0] && j == config[idx][1]){
        idx++;
        curChild.value = puzzle[i][j];
        curChild.setAttribute('readonly','');
        curChild.style.background = "rgb(157, 213, 248)";
      } else {
        curChild.value = 'X'; 
        curChild.style.background = "white";
        curChild.removeAttribute('readonly');
      }
      curChild = curChild.nextSibling;
    }
  }
  
  min = 0;
  sec = 0;

}

//attaching an event to the button to get next Puzzle
doneBtn.addEventListener('click', function(){
  console.log("button clicked");
  totalPuzzleSolved++;
  curTotalSec += sec;
  curTotalMin += min;

  if(curTotalSec > 60){
    curTotalMin += Math.floor(curTotalSec/60);
    curTotalSec = curTotalSec%60;
  }

  console.log(totalPuzzleSolved);

  if(totalPuzzleSolved === 5){
    finalResultModal();
  }
  else {
    curPuzzleEl.textContent = parseInt(curPuzzleEl.textContent) + 1;
    curPuzzleEl.style.fontSize = "large";
    getPuzzle();    
  }
  doneBtn.setAttribute('disabled','');
  doneBtn.style.backgroundColor = "";
  doneBtn.style.boxShadow = "1px 2px 5px 2px #D8D7D7";
}, false);

// puzzle is built , now it is time to make a check if it is completed or not;

//function to check whether the solution by the player is correct. if correct then allow the user by activating the 
//next puzzle button.

function checkValidSolution(){
  let isValidSol = true;
  for(let i = 0; i < n; i++){
    let row = document.getElementById('row'+(i+1));
    let curChild = row.firstChild;
    for(let j = 0; j <= i; j++){
      if(puzzle[i][j] != parseInt(curChild.value)){
        isValidSol = false;
      }
      curChild = curChild.nextSibling;
    }
  }
  console.log("solution check")
  if(isValidSol){
    console.log("Im Done");
    doneBtn.removeAttribute('disabled');
    doneBtn.style.backgroundColor = "rgba(30, 255, 0, 0.863)";    
    doneBtn.style.boxShadow = "1px 2px 5px 2px #57E503";
  }
}

function isNumber (value){
  let val = (value == "0" || Number(value))?true:false;
  return val;
}

let prevValue;
function saveInputPreviousValue(curInp){
  prevValue = curInp.value;
}

function updateValueChangedHelper(curInp){
  console.log("valueChanged");
  if(!isNumber(curInp.value)){
    curInp.value = 'X';
  }

  if(prevValue === 'X'){
    valueChanged--;
    saveInputPreviousValue(curInp);
  }
  console.log(valueChanged);
  if(valueChanged === 0){
    checkValidSolution();
  }
}
//assuring tha
function updateValueChanged(e){  
  let el = e.target;
  updateValueChangedHelper(el);
}

//function that checks if a player has left a field empty and move to another input field.
// if yes, the field is empty then make it 'X' again.
function checkIfEmpty(e){
  let el = e.target;
  if(el.value === ""){
    el.value = 'X';
    valueChanged++;
    console.log(valueChanged);
  }
}

//attaching events to each input field 
let inputBox = document.getElementsByTagName('input');
for(let i = 0; i < inputBox.length; i++){  
  inputBox[i].addEventListener('click', function(e){
    if(prevInputEl === undefined){
      prevInputEl = inputBox[i];
      curInputEl = inputBox[i];
    } else {
      prevInputEl = curInputEl;
      curInputEl = inputBox[i];
      prevInputEl.style.border="1px solid blue";
    }
    
    if(!curInputEl.readOnly){      
      hideKeyboard(curInputEl);
      curInputEl.style.border = "0.3rem solid rgb(59, 69, 152)";
    }
    saveInputPreviousValue(inputBox[i]);
  }, false);
  inputBox[i].addEventListener('input', function(e){
    updateValueChanged(e);
  }, false);
  inputBox[i].addEventListener('focusout', function(e){
    checkIfEmpty(e);
  }, false);
  inputBox[i].addEventListener('focusin', function(e){
    if(!inputBox[i].readOnly){
      hideKeyboard(inputBox[i]);
    }
    saveInputPreviousValue(e);
  }, false);
}

function clearInputHelper(el){
  if(el.value != 'X'){
    el.value = 'X';
    valueChanged++;
    console.log(valueChanged);
    saveInputPreviousValue(el);
  }
}

function clearInput(){
  if(curInputEl.readOnly){
    return;
  }
  clearInputHelper(curInputEl);
}

function appendNumber(e){
  let num = e.target.innerText;
  if(curInputEl.readOnly){
    curInputEl.value = curInputEl.value;
  }
  else if(prevInputEl == curInputEl && curInputEl.value != 'X'){
    curInputEl.value = curInputEl.value + num;
    updateValueChangedHelper(curInputEl);
  } else {
    curInputEl.value = num;
    updateValueChangedHelper(curInputEl);
  }
  prevInputEl = curInputEl;
}

for(let number of numberPad){
  number.addEventListener('click', function(e){
    appendNumber(e);
  }, false);
}

clrBtn.addEventListener('click', function() {
  clearInput();
}, false);