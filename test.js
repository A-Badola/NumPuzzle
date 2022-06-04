let n = 5;
let mat = [[16,0,0,0,0],
[8,8,0,0,0],
[4,4,4,0,0],
[2,2,2,2,0],
[1,1,1,1,1]
];

let ans = new Set();
function checkSolvable(p){
//vector<pair<int, int>> v;
let v = [];
for(let i = 0; i < 5; i++){
for(let j = 0; j <= i; j++){
  if(p[i][j] != 0){
    let inV = [];
    inV.push(i);
    inV.push(j);
    v.push(inV);
  }
}
}

//for(int i = 0; i < v.size(); i++){
//cout << v[i].first << " " << v[i].second << endl;
//}

for(let x = 0; x < 19; x++){
let added = false;
let isLeft = false;
for(let i = 0; i < 5; i++){
  for(let j = 0; j <= i; j++){
    if(p[i][j] == 0){
      isLeft = true;
      if(i+1<5 && j+1<=i+1 && p[i+1][j]!=0 && p[i+1][j+1]!=0){
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
    if(v[i][0] == 4){
      ff++;
    }
    if(v[i][0] == 3){
      fr++;
    }
    if(v[i][0] == 2){
      th++;
    }
  }
  /*
  if(ff <= 3 && fr <= 1 && th <= 1){
    ans.add(v);
    continue;
  }
  
  if(ff <= 2 && fr <= 2 && th <= 2){
    ans.add(v);
    continue;
  }
  */ 

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

for(let i = 0; i < 5; i++){
for(let j = 0; j < 5; j++){
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

console.log(p.length);
choosePos(p, n, 15, 4, 0);

console.log("total configs : " + ans.size);