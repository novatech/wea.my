---
title: crossword solver using command line
date: 2010-03-11T15:12:24+00:00
layout: post
categories:
  - 'tips & tricks'
tags:
  - cheat
  - crossword
  - puzzle
---

if you like to solve crossword puzzle to kill your time but sometimes you are stuck with what word you should put in

here's a quick example on how to do that in your terminal

example clue **the entire CPU of a computer on a single integrated circuit (chip)**

and we have crossword like this

**\_,\_,\_,r,\_,p,\_,\_,\_,\_,\_,\_,\_,r**

now using common word list table we can easily solve this by
```console
grep -e ^...r.p.......r$ /usr/share/dict/words
```
**note:** empty space **(_)** was replaced by dot **(.)** notation

also make sure you have the word list package installed
```console
sudo apt-get install wamerican
```
