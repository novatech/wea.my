---
title: how to compile kernel with RT patch
date: 2012-11-16T03:33:56+00:00
layout: post
categories:
  - 'tips & tricks'
tags:
  - compile
  - kernel
  - linux
  - realtime
---

we will be working here
```console
cd /usr/src/
```

download all required files
```console
axel -a http://www.kernel.org/pub/linux/kernel/v3.0/linux-3.6.6.tar.bz2
tar xjvf linux-3.6.6.tar.bz2 && cd linux-3.6.6/
axel -a http://www.kernel.org/pub/linux/kernel/projects/rt/3.6/patch-3.6.6-rt17.patch.bz2
```

test the RT patch before actually patch it ( make sure you are now in /usr/src/linux-3.6.6/ )
```console
bzcat patch-3.6.6-rt17.patch.bz2|patch -p1 --dry-run
```

if everything seem ok, lets really patch it
```console
bzcat patch-3.6.6-rt17.patch.bz2|patch -p1
```

remove the -rt17 prefix local kernel version. this seem to cause problem when running make-kpkg later
```console
echo > localversion-rt
```

copy current kernel configuration
```console
make clean && make mrproper && cp /boot/config-$(uname -r) ./.config
```

configure our kernel
```console
make menuconfig
```

below is the setting that use, please find the menu by browsing the menu config console\
`note: please choose processor family accordingly`
```console
Processor Type and Features
[ ] Enable MPS table
Processor family (Core 2/newer Xeon) ->
[ ] IBM Calgary IOMMU support
Preemption Model (Fully Preemptible Kernel (RT)) ->
Timer frequency (1000 HZ) ->
[ ] kernel crash dumps

Kernel Hacking
[ ] Enable unused/obsolete exported symbols
[ ] Kernel debugging
[ ] Compile the kernel with frame pointers
RCU Implementation (Preemptible tree-based hierarchical RCU) ->
```

below is the setting to enable general support for (most) webcams
```console
evice Drivers ->
[*] Multimedia Support ->
[*] Cameras/video grabbers support
.
.
[*] Video capture adapters (NEW) ->
[*] V4L USB devices ->
<M> USB Video Class (UVC)

[ ] = untick
[*] = tick
```
[optional] this is gcc option tuned for my machine and i'm using Intel(R) Core(TM)2 Duo CPU E4500, yours may differ
```console
export CFLAGS="-O2 -pipe -march=native -param l1-cache-size=32 -param l1-cache-line-size=64 -param l2-cache-size=2048 -mtune=native -mfpmath=sse -m64"
export CXXFLAGS="$CFLAGS"
```

lets compile our kernel and build the .deb package (you may choose your own append_to_version= )
```console
CONCURRENCY_LEVEL=$(getconf \_NPROCESSORS_ONLN) fakeroot make-kpkg -initrd -append_to_version=-zxr -revision=0 kernel_image kernel_headers

cd ..
dpkg -i linux-\*3.6.6\*.deb
```

reboot to and select your new kernel. check your kernel and you should see something like below
```console
┌─\[novatech\]\[~\]
└──╼ uname -a
Linux ZX10R 3.6.6-zxr #1 SMP PREEMPT RT Fri Nov 16 01:45:28 MYT 2012 x86_64 GNU/Linux
```

that's it... kernel compilation is not a rocket science after all isn't?\
have fun with your blazing fast responsive desktop ~

**foot notes:**
1.  this guide can use to compile normal kernel without RT patch
2.  if you would like recompile the kernel after enabling some modules in menuconfig, below is how make make-kpkg faster
```console
    export CLEAN_SOURCE=no
    CONCURRENCY_LEVEL=$(getconf \_NPROCESSORS_ONLN) fakeroot make-kpkg \
    -initrd -append_to_version=-zxr -revision=0 kernel_image kernel_headers
```