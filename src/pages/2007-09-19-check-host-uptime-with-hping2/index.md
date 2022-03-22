---
title: check host uptime with hping2
date: 2007-09-19T06:36:59+00:00
layout: post
categories:
  - 'tips & tricks'
tags:
  - hping2
  - linux
  - networking
  - uptime
---

here's some trick to find a host uptime beside using nmap
type this command in your terminal/console (whatever you call it)

```bash
$ hping2 <host> -p <portnumber> -S --tcp-timestamp
```

where host is the ip/hostname of a machine you want to check and portnumber is the open port on remote machine.
oh, you be root in order to use that command.
here's some example how it gonna work, scanning my college wireless gateway uptime.

```bash
novatech@bagiro:~$ sudo hping2 10.10.15.250 -p 443 -S --tcp-timestamp
HPING 10.10.15.250 (eth1 10.10.15.250): S set, 40 headers + 0 data bytes
len=56 ip=10.10.15.250 ttl=64 id=1 sport=443 flags=SA seq=0 win=8192 rtt=161.5 ms
TCP timestamp: tcpts=986124
len=56 ip=10.10.15.250 ttl=64 id=1 sport=443 flags=SA seq=1 win=8192 rtt=196.2 ms
TCP timestamp: tcpts=986126
HZ seems hz=2
System uptime seems: 5 days, 16 hours, 57 minutes, 43 seconds
```

shit, uptime are 5days ++ but i can only use internet in the morning.

**note:** i use port 443 since it's the only port opened on the gateway. hehe.
