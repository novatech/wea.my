---
title: 'c/c++ programming: number spirals generator'
date: 2010-01-16T04:19:19+00:00
layout: post
categories:
  - programming
tags:
  - algorithm
  - logic programming
---

there is several ways we can generate a spiral number like this.

**5x6 spiral**

```
1  2  3  4  5  6
18 19 20 21 22  7
17 28 29 30 23  8
16 27 26 25 24  9
15 14 13 12 11 10
```

today i would like to show two ways of doing it

first, we can use mapping technique. it is done by going through the number spiral direction and map its coordinate in form of two dimensional arrays. this is pretty much easier to understand but take up a lot of resources and execution time.

here is the my mapping code (written in c++)

jump in to read more .. ;)

```cpp
#include <cstdlib>
#include <ctime>
#include <iostream>
using namespace std;

int i=0,x,y,spiral[100][100];
char direction = 'r';
void change_direction() {
     switch(direction) {
     case 'r':direction='d';break;
     case 'd':direction='l';break;
     case 'l':direction='u';break;
     case 'u':direction='r';break;
     }
}
int check_cell(int a,int b) {
 if (b >= y || b <0) { return 0; }
 else if (a >= x) { return 0; }
 else if (spiral[a][b] != 0) { return 0; }
 else { return 1; }
}
void move_cell(int &a,int &b) {
     int next_a = a, next_b = b;
     if (i == x*y-1) { return; }
     switch(direction) {
     case 'r': next_b = b + 1;break;
     case 'd': next_a = a + 1;break;
     case 'l': next_b = b - 1;break;
     case 'u': next_a = a - 1;break;
     }
     if (check_cell(next_a,next_b)) {
         a = next_a;b = next_b;
     }
     else {
          change_direction();
          move_cell(a,b);
          }
    return;
}

int main() {
int j,a=0,b=0;
srand((unsigned)time(0));
while (!x||!y) { x = rand()%10; y = rand()%10; }
printf("%dx%d spiral number\n",x,y);
for (i = 0;i<x*y;i++) {
     spiral[a][b]=i+1;
     move_cell(a,b);
     }
for (i = 0;i < x;i++) {
         for (j = 0;j < y;j++) {
             printf("%d\t",spiral[i][j]);
         }
         printf("\n");
     }
return 0;
}
```

[preview output](http://codepad.org/2PGoABh0#output)

in this method, all we have to do is go through the number spiral and change direction when it reach certain limit or if next cell already being occupied. it is more like a snake movement.

now, the second technique is by represent those number in matrix form. we going to create a function that going to give us a number for (i,j) position with current size of spiral (a\*b) loop.

for example **5x6** spiral will be

→→→→→  **j** →→→→→

```
|  29 28 27 26 25 24
↓  12             23      11 10  9  8
i  13             22 -->  2         7  --> 1 0
↓  14             21      3  4   5  6      a=1 b=2
↓  15 16 17 18 19 20      a = 3 b = 4
    a = 5 b = 6
```

notice that when the number from left to right then top to bottom, the number reduce from

**total-[a\*b-i+j+1**] // note we +1 because our point start from (0,0)

meanwhile for left-side, start with (1,1) top to bottom then left to right,the number sequence are in

**total-[(a-1)*(b-1)-((a-i)+(b-j))+2;]**

where total is dimension of a\*b. we can use recursive to loop for outer layer of spiral to inner.

here is another example. since the number is inverted, we need to minus it with total (a\*b) when printing it.

```cpp
#include <stdio.h>
#include <time.h>
int s(int i, int j, int a,int b){
  return (i == 0 || j == (b-1)) ? \
  (a*b) - (1 + i + j) : (i == (a-1) || j == 0) ?\
  (a-1)*(b-1)-((a-i)+(b-j))+2 :\
  (a > 2 || b > 2) ? s(i-1, j-1, a-2,b-2) : 0;\
}
int main() {
int x,y,a,b;
//srand((unsigned)time(0));
//while (!a||!b) { a = rand()%10; b = rand()%10; }
a = 5;b=6;
for (x=0;x < a;x++){
    for (y=0;y<b;y++) printf("%d\t",a*b-s(x,y,a,b));
    printf("\n\n");
}
return 0;
}
```

[preview code](http://codepad.org/GyKLUk2j#output)

you can print the spiral number from inner to outer by changing **a\*b-s(x,y,a,b)** to **s(x,y,a,b)** in printf ;)

i know this might not be the most optimal solution but hope i can share something with you guys

thank you :)
