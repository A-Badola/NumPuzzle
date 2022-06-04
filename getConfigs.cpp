#include<bits/stdc++.h>
using namespace std;

set<vector<pair<int,int>>> ans;

int mat[5][5] = {
    {16,0,0,0,0},
    {8,8,0,0,0},
    {4,4,4,0,0},
    {2,2,2,2,0},
    {1,1,1,1,1}
  };


void printMat(int mat[5][5]){
  for(int i = 0; i < 5; i++){
    for(int j = 0; j < i+1; j++){
      cout << mat[i][j] << " ";
    }
    cout << endl;
  }
}


void checkSolvable(int p[5][5]){
  vector<pair<int, int>> v;
  for(int i = 0; i < 5; i++){
    for(int j = 0; j <= i; j++){
      if(p[i][j] != 0){
        v.push_back({i,j});
      }
    }
  }

  //for(int i = 0; i < v.size(); i++){
    //cout << v[i].first << " " << v[i].second << endl;
  //}

  for(int x = 0; x < 19; x++){
    bool added = false;
    bool isLeft = false;
    for(int i = 0; i < 5; i++){
      for(int j = 0; j <= i; j++){
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
      sort(v.begin(), v.end());
      int ff = 0, fr = 0, th = 0;
      for(int i = 0; i < v.size(); i++){
        if(v[i].first == 4){
          ff++;
        }
        if(v[i].first == 3){
          fr++;
        }
        if(v[i].first == 2){
          th++;
        }
      }
      /*
      if(ff <= 3 && fr <= 1 && th <= 1){
        ans.insert(v);
        continue;
      }
      
      if(ff <= 2 && fr <= 2 && th <= 2){
        ans.insert(v);
        continue;
      }
      */
      if(ff <= 1 && fr <= 1 && th <= 1){
        ans.insert(v);
        continue;
      }
      
    }

    if(!added){
      break;
    }
  }
  //cout << "after" << endl;
  int dup[5][5];
  for(int i = 0; i < 5; i++){
    for(int j = 0; j < 5; j++){
      dup[i][j] = 0;
    }
  }

  for(int i = 0; i < v.size(); i++){
    //cout << v[i].first << " " << v[i].second << endl;
    dup[v[i].first][v[i].second] = p[v[i].first][v[i].second];
  }

  for(int i = 0; i < 5; i++){
    for(int j = 0; j < 5; j++){
      p[i][j] = dup[i][j];
    }
  }

  //cout << "\n\n";  
  //cout << "after2" << endl;
}

void choosePos(int p[5][5], int k, int pl, int li, int lj){
  //cout << li << " " << lj << " " << k <<  endl;
  if(k == 0){
    checkSolvable(p);
  }  
  if(k > pl){
    return;
  }

  for(int i = lj==li+1?li-1:li; i >= 0; i--){
    for(int j = lj==li+1? 0:lj; j <= i; j++){
      p[i][j] = mat[i][j];
      choosePos(p, k-1, pl-1, i, j+1);
      p[i][j] = 0;
      choosePos(p, k, pl-1, i, j+1);
    }
  }
}

int main(){
  printMat(mat);

  int k = 5;
  int p[5][5];
  for(int i = 0; i < 5; i++){
    for(int j = 0; j < 5; j++){
      p[i][j] = 0;
    }
  }

  for(int i = 0; i < 5; i++){
    for(int j = 0; j < 5; j++){
      cout << p[i][j] << " ";
    }
    cout << endl;
  }
  cout << endl;
  choosePos(p, k, 15, 4, 0);
  cout << ans.size() << endl;
  
  for(auto v : ans){
    for(int i = 0; i < v.size(); i++){
      cout << v[i].first << " " << v[i].second << endl;
    }
    cout << "\n\n";
  }
  
}