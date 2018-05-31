---
title: faster kernel compiling and update
date: 2010-03-01T22:39:08+00:00
layout: post
categories:
  - 'tips & tricks'
tags:
  - debian
  - kernel
  - ubuntu
---

if you have try to compile a kernel before, you will know how boring the process is!

it get more boring and annoying when you need to disable/enable certain thing in .config or doing some patches you need to recompile the whole thing again

so here, i want to share something that i've learned alot during my experience in wasting time compiling rt preempt kernel for my el-cheapo laptop!

if you want to recompile any changes that you make to the source like some security patch. you can quickly recompile everything that changed like this. (debian style)

```console
rm -rf debian/stamp # clean stamp build

CONCURRENCY_LEVEL=3 fakeroot make-kpkg \
--revision=0.1 kernel-image kernel-headers
```

note you need to use same **--revision=0.1** everytime you do this.. so just pick one number that you wont forget. 0.1 sound good. **CONCURRENCY_LEVEL=3** mean using multi thread in compiling. if you have 4 core processor change it into 5 and so on. it's core+1

another quick workaround that might be handy when you're working on latest kernel from 2.6.31 to 2.6.32 where you get error version missmatch. this is due to build script looking for utsrelease.h but it doesn't exist in include/linux folder anymore. you can either symlink it to ./include/generated/utsrelease.h
```console
ln -s ./include/generated/utsrelease.h ./include/linux/utsrelease.h
```

another tips is that, never remove original kernel. you will never know if anything break with your newly compiled kernel until you reboot and see it for yourself to see if it really working. mostly, check your wireless see if it's really working or not (based on my bad experience :p)
