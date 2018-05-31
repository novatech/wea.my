---
title: obfuscated malaysia map in c
date: 2009-07-13T02:14:38+00:00
layout: post
categories:
  - programming
tags:
  - obfuscated programming
  - reverse engineering
---

gua ada satu benda menarik yang gua saja nak show off kat korang ekeke... **nah, cuba la compile!!**

```cpp
#include <stdio.h>
int x,b=10;p(_){return(_>=34&&printf("%c"\
,++b==0x5A?b=b>>4<<1:041U^x&1)&&p(_-1));}
main(){int s="/*, n@vat3ch.^_^v *'b \
*'B#? *+>#? *,;%? *-:%? *-:$@ *-:$@ \
+-9$@ ,14&> -03)< -03*; ,12,: ,0(#(/\
9 --"/* handcoded by */"(''/8 ,/$+$1\
8 ,"/*azwan ali 2009*/"0#>CNDS?QAS@T\
>U=V<W=V<W<V;X:X9Y8Z9X;W<W;X9X;V=U=T\
AQBODMFLFLGKFMFLFJGJIKIGLHLHNENENEOC\
PDPCQ@U<X<X:Y8]5_2a1e+i),"[x+++18];s\
>32?p(s):x+1;return s>0?main():0;}
```

kalau korang masih ingat entry gua tentang [seni pengeliruan atucara](https://wea.my/entry/the-art-of-programming/), hah ni dia versi yang lebih sempurna. apa kebaikan untuk korang?? takde.. seperti gua kata..~~saje nak menunjuk nunjuk~~ hahaha!!
ni versi lebih mampat dan padat tapi sebenarnya gunakan helper function

ciao!~
