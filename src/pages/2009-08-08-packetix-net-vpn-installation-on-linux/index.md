---
title: PacketiX.NET vpn client installation on linux
date: 2009-08-08T19:10:12+00:00
layout: post
categories:
  - 'tips & tricks'
tags:
  - simple packetix free vpn guide
---

recently i've been using packetix.net vpn and the speed is quite good, unfortunately there's not many guide on how to use the client on linux, so i'm writing one. this gonna be very long..so bear with me till the end ..huhu

to make things easier, lets transform into root :D

```bash
sudo su && cd ~
```

now, make a folder name vpn and download the vpnclient file from their web http://packetix.net/en/secure/install/

```bash
mkdir vpn && cd vpn
wget -c http://packetix.net/en/special/files/vpn2\_5350\_en/vpnclient-5350a-rtm-en-linux-x86.tar.gz
```

now to compile this files, you need zlib, openssl, readline and ncurses.

```bash
apt-get install zlib1g-dev libreadline5-dev
```

once finish,extract the file and continue with compile

```bash
tar -zxvf vpnclient-5350a-rtm-en-linux-x86.tar.gz && cd vpnclient* && make
```

connecting/tunneling to packettix.net

```bash
./vpnclient start
./vpncmd
```

inside vpncmd, choose number 2

```bash
[2] Management of VPN Clinet and input localhost as the destination host
```

u will see something like this,

```bash
Input destination: localhost

Connected to VPN Client "localhost".

VPN Client>
```

now configuring your connection.

```bash
root@bur8:~/vpnclient> ./vpncmd

vpncmd command -- PacketiX VPN Command Line Management Utility

PacketiX VPN Command Line Management Utility (vpncmd command)

Version 2.20 Build 5350   (English)

Compiled Oct  9 2007 01:27:58 by yagi at ILC308

Copyright (C) 2004-2007 SoftEther Corporation. All Rights Reserved.

By using vpncmd program, the following can be achieved.

1.  Management of VPN Server or VPN Bridge

2.  Management of VPN Clinet

3.  Use of VPN Tools (certificate creation and communication speed measurement)

Select 1, 2 or 3: 2

Specify the host name or IP address of the computer that the destination VPN Client is operating on.

If nothing is input and Enter is pressed, connection will be made to localhost (this computer).

Input destination: localhost

Connected to VPN Client "localhost".

VPN Client>niccreate

NicCreate command -- Create New Virtual Network Adapter

Virtual Network Adapter Name: ****

The command terminated normally.
```

now lets configure our account and connection

```bash
VPN Client>niclist

NicList command -- Get List of Virtual Network Adapters

Item                        |Value

----------------------------+----------------------------;

Virtual Network Adapter Name|****

Status                      |Enabled

MAC Address                 |00AC9D035CF6

Version                     |Version 2.20 Build 5350   (English)

The command terminated normally.

VPN Client>accountcreate

AccountCreate command -- Create New VPN Connection Setting

Name of VPN Connection Setting: VPN

Destination VPN Server Host Name and Port Number: public.softether.com:443

Destination Virtual HUB Name: PUBLIC

Connecting User Name: PUBLIC

Used Virtual Network Adapter Name: ****

The command terminated normally.

VPN Client>accountlist

AccountList command -- Get List of VPN Connection Settings

Item                        |Value

----------------------------+----------------------------;

VPN Connection Setting Name |VPN

Status                      |Offline

VPN Server Address          |public.softether.com (Direct TCP/IP Connection)

Virtual Network Adapter Name|****

The command terminated normally.

VPN Client>accountconnect

AccountConnect command -- Start Connection to VPN Server using VPN Connection Setting

Name of VPN Connection Setting: VPN

The command terminated normally.
```

wait for awhile and list the account again

```bash
VPN Client>accountlist

AccountList command -- Get List of VPN Connection Settings

Item                        |Value

----------------------------+----------------------------;

VPN Connection Setting Name |VPN

Status                      |Connected

VPN Server Address          |public.softether.com (Direct TCP/IP Connection)

Virtual Network Adapter Name|****

The command terminated normally.
```

set this as default connection everytime vpnclient started

```bash
VPN Client>AccountStartupSet

AccountStartupSet command -- Set VPN Connection Setting as Startup Connection

Name of VPN Connection Setting: VPN

VPN Client>quit
```

now check for connection, note the interface postfix **\_0** at the end of **vpn**

```bash
root@bur8:~/vpnclient> ifconfig vpn_0

vpn_0 Link encap:Ethernet  HWaddr 00:ac:9d:03:5c:f6

UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1

RX packets:1603 errors:0 dropped:0 overruns:0 frame:0

TX packets:0 errors:0 dropped:0 overruns:0 carrier:0

collisions:0 txqueuelen:500

RX bytes:463867 (463.8 KB)  TX bytes:0 (0.0 B)
```

get dhcp from vpn

```bash
root@bur8:~/vpnclient> dhclient vpn_0

Listening on LPF/vpn_0/00:ac:9d:03:5c:f6

Sending on   LPF/vpn_0/00:ac:9d:03:5c:f6

Sending on   Socket/fallback

DHCPREQUEST of 10.3.83.250 on vpn_0 to 255.255.255.255 port 67

DHCPACK of 10.3.83.250 from 10.0.0.1

bound to 10.3.83.250 -- renewal in 437751335 seconds.

root@bur8:~/vpnclient> ifconfig vpn_0

vpn_0     Link encap:Ethernet  HWaddr 00:ac:9d:03:5c:f6

inet addr:10.3.83.250 Bcast:10.255.255.255 Mask:255.0.0.0
```

now you can start routing you connection to vpn...\
`beware noob routing technique ahead, but it should get the job done and should redirect all your traffic to vpn`

route connection to packet vpn thru main gw

```bash
route add -net 130.158.6.0/24 gw 192.168.182.1

dhclient vpn_0
```

to route all connection to vpn gw

```bash
ip route del default via 192.168.182.1

ip route add default via 10.0.0.1 dev vpn_0
```

route only specific destion thru vpn gw

```bash
ip route del default via 10.0.0.1 dev vpn_0

route add -net 216.152.78.0/24 gw 10.0.0.1
```

this will route all connection to 216.152.78.0/24 to vpn_0 gw
**where  192.168.182.1 is your main gateway**

for more about how to do advance routing in linux please refer to [http://lartc.org/howto/index.html](http://lartc.org/howto/index.html 'linux advance routing')
p/s: to back to your current connection.. stop the service and reroute back to your original gateway.

```bash
./vpnclient stop
route del default
route add default dev ppp0
```

where ppp0 is my celcom 3g modem interface

for those who didn't know what the hell packetix.net is,

> PacketiX.NET is an academic, non-profit online environment for <a href="http://www.plathome.com/products/packetix/index.html" target="_blank">PacketiX VPN</a>, the VPN technology developed by SoftEther Corporation.

more info please visit their website at http://packetix.net/en/

**update:** you need to enable ipforwarding or else you won't be able to connect to internet.

```bash
$ echo 1 > /proc/sys/net/ipv4/ip_forward
```

or simply edit your **/etc/sysctl.conf** file

hope it this guide will give benefit to everyone.. thank you ;)
