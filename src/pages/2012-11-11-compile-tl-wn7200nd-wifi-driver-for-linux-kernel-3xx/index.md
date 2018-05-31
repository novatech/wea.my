---
title: Compile TL-WN7200ND wireless driver for Linux (Kernel 3.xx)
date: 2012-11-11T03:26:15+00:00
layout: post
categories:
  - 'tips & tricks'
---

Download required linux driver (RT8070 /RT3070 /RT3370 /RT5370 /RT5372 USB) from ralinktech web page\
http://www.ralinktech.com/en/04_support/support.php?sn=501

install required files to build this

```console
sudo apt-get install build-essential linux-headers-$(uname -r)
```

extract the source

```console
tar xjvf 2011_0719_RT3070_RT3370_RT5370_RT5372_Linux_STA\V2.5.0.3_DPO.bz2 && cd 2011_0719_RT3070\*
```

inline edit /os/linux/config.mk to enable WPA support (i'm too lazy to fire vim)

```console
perl -i -pe 's/^(HAS_WPA_SUPPLICANT|HAS_NATIVE_WPA_SUPPLICANT_SUPPORT)=(n)$/\1=y/g' os/linux/config.mk
```

lets verify that we correctly replace the string (shrug!)

```console
grep -E '^(HAS_WPA_SUPPLICANT|HAS_NATIVE_WPA_SUPPLICANT_SUPPORT)' os/linux/config.mk
HAS_WPA_SUPPLICANT=y
HAS_NATIVE_WPA_SUPPLICANT_SUPPORT=y
```

compile & install

```console
sudo make && sudo make install
```

add module to the kernel

```console
sudo modprobe rt5370sta
```

check if your network card

```console
ifconfig -a;iwconfig
```

You should see something like below..

```console
ra0 Link encap:Ethernet HWaddr f8:d1:11:09:cf:87

UP BROADCAST MULTICAST MTU:1500 Metric:1

RX packets:0 errors:0 dropped:0 overruns:0 frame:0

TX packets:0 errors:0 dropped:0 overruns:0 carrier:0

collisions:0 txqueuelen:1000

RX bytes:136644 (136.6 KB) TX bytes:22019 (22.0 KB)

...***snip***...

ra0 Ralink STA ESSID:"11n-AP" Nickname:"RT2870STA"

Mode:Auto Frequency=2.412 GHz Access Point: Not-Associated

Bit Rate:1 Mb/s

RTS thr:off Fragment thr:off

Link Quality=10/100 Signal level:0 dBm Noise level:0 dBm

Tx excessive retries:0 Invalid misc:0 Missed beacon:0
```

that's it...easy right?

troubleshooting: if you wifi still not working after step g, try to unplug and plug back your adapter
