---
title: fix broken /dev/null
date: 2010-02-23T01:18:29+00:00
layout: post
categories:
  - 'tips & tricks'
tags:
  - shortnote
---

if you accidentally deleted /dev/null file here's a simple way how to re-create it
```console
mknod -m 666 /dev/null c 1 3
```
