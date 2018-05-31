---
title: seni pengeliruan atucara
date: 2008-04-06T20:49:28+00:00
layout: post
categories:
  - programming
tags:
  - c programming
  - obfuscated programming
  - polymorphis
---

suatu ketika dahulu gua telah diperkenalkan dengan bahasa programming yang agak lucah tapi best iaitu "brainfuck", setelah gua berjaya memahirkan diri maka gua jumpa plak beberapabenda baru dalam dunia ~~berokgraming~~ programming ni iaitu teknik pengeliruan aturaca. apa yang membuatkannya menarik adalah kerana teknik pengeliruan atucara ni banyak menggunakan rekursif (gua paling suka benda alah ni). oh ya.. mat saleh panggil benda ni **art of obfuscated programming**

apa gunanya benda ni?? ada banyak sebenarnya tapi salah satu daripadanya adalah untuk menjaga program kita daripada di-reverse-engineering (**BM: kejuruteraan terbalik?**). orang buat virus biasanya guna teknik ni, tapi bila dah serabut serabut macam tu,mestilah ada banyak kelemahan macam susah nak maintain. apa apa pun, itu semua gua tak pedulik sangat sebenarnya, bagi gua obfuscating adalah satu seni pengaturcaraan. satu benda yang menarik dan penuh dengan misteri serta boleh kasi pecah otak.

oleh kerana gua bosan dan tiba tiba rasa gian nak coding, maka terhasilah karya pengeliruan atucara gua yang kedua

```cpp
#include <stdio.h>
#define O_o "llllllllllllllllIlIllllIlIIlllllllllllllllllllIlllllllllllllllllllllIlIllllllllllllllllllllIlllllllllllllllllllllIIl\
lllllllIlIllllllllllllllllllIlllllllllIIllllllllllllllIlllllllllllllllIllIlllllllllIlllllll\
lllllllllllllIlIIllllllllllIlIllllllllllllIlIllllllllllllllIIllllllllllIlIllllllllllllIlIllllllllllllllI\
|llllIlllllllllIlIIllllllllllllllllllllIll\
lllIllllllllllllllllllIllllllllllllllIlIlllllllllllllIllllllllllllllllIlIlllllllllll\
IIlllllllllllllllllllIlllllIlllllIlllllllllllIlllllllllllllllIllllllllllllllllllIIlllllllllllllIlIlllllllllllIllllllllIllllllllllllIlllllllll\
llllllllllllIlllllllllllIIllIlllllIllllllllllllllllllIlllllllllllllllllllllllIlIllllllllllllllllllIllllllllllllllIlIIllIlllllllllIllllllllllllllllllIlllllllll\
llllllllllllI|lllllllllllllIlllllllllllllllllllllIlllllllllllIlIIl\
lllIlllllllllIlIIllIlllllllllllllllllllllIllllllllllllIlIllllllllllllllllllllIIllIllllllllllllllllll\
lllIllllllllllllIlIllllllllllllllllllllI|lllllllllllllllllllIlllllllllllllllllllllIlllllllllllIlIIlllllllllllllIlIlllllllllllIlIllllllllllllllIIlllllllllllIlllllllllllllllllllllIllllll\
lllIllllllllIIllllIlllllllllllllllIllllllllllllllIlIllllllllllllllllllllI|llllllllllllIlIllllllllllllIlllllllllllllllllllllIIllllllllllllllIlllllllllllllllIllIlllllllllIllllllllllllllllllllIlIIllIlllll\
IllllllllllllllllllIllllllllllllllllllllIlIllllllllllllllIlllllllllllllllllllllllllIlI|lllllllllllllIlIlllllllllllIllllllllIllllllllllllIlllllllllllllllllllllIlllllllllllIIlllllllllIllllllllllllllllllllIllllllllllllllllll\
lllIIllIlllllIllllllllllllllllllIllllllllllllllIlIlllllllllllllIlI|lIlIlIllllllllllllllIIlIlIllllllllllllllIIlIl\
lllllllllllllIIII|llllIlllllllllllllllIllllllllllllllllllIlIlllllIlllllllllllllIlllllllllllllllIllllllllllllllIllllllllllllllIllllllllllllllIllllllllllllllIII"
#define L y,t
#define W 10*9+6
#define _ t[x]
#define X y = W
#define o_o int main(x,L) char t[]; { t=
#define o_O ;X;for\
(x = 0; x<=(19.5\
*W);x++){\
(_ != 'l') ? pri\
ntf("%c",\
((_ == '|') ? '\n':(y%9\
6) ? y : 32)) :y+\
+ ;(_ == 'I') ? X :\
0;}return 0;}
o_o O_o o_O
```

gua kira yang ni lebih elok la berbanding dengan cubaan keji gua yang pertama suatu ketika dahulu menggunakan konsep brainfuck dalam c programming

nanti next entry gua cuba explain macamana gua buat. (senang je ni sebab basic kepada basic untuk basic punya basic). nak ganas-ganas takleh lagi, newbie la katakan hehe

sekian
