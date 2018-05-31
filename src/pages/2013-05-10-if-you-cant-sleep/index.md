---
title: 'if you cant sleep'
date: 2013-05-10T20:26:17+00:00
layout: post
categories:
  - programming
tags:
  - star
---

try this in your terminal :)

```perl
perl -MCurses -e'$x=150;@r=map{[rand($x),rand(5),rand(25)]}(0..25+rand(200));$s = new Curses;do{$s->clear;$s->addch($_->[2],$_->[0],".")foreach@r=map{[($_->[0]<$_->[1])?$x:$_->[0]-$_->[1],$_->[1],$_->[2]]}@r;$s->refresh;}while(select(undef,undef,undef,0.15)||1);'
```

also make sure you have Curses.pm installed :)
