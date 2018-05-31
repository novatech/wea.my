---
title: 'xchat script: notify-osd nick notification system'
date: 2010-02-12T02:11:00+00:00
layout: post
categories:
  - programming
tags:
  - plugin
  - scripting
  - tcl
  - xchat
---

here is a simple nick notification system for xchat using ubuntu notification system. it will execute notify-osd comment when someone mention your nick in public channel or private message. it's good for those who like to minimize their xchat while doing something :)

```tcl
on PRIVMSG mynick {
if { [string match -nocase "*[me]*" $_rest] } {
	set thatcontext [getcontext]
	set thiscontext [findcontext]
	if { ![string equal $thiscontext $thatcontext]} {
		splitsrc
		if { ![regexp {listOf|nickYou|wantTo|execludeHere} $_nick] } {
			exec notify-send -i xchat -t 3000 "$_nick/[channel $thatcontext]" "$_rest"
			complete EAT_XCHAT
		   }
	 }
}
complete
}
```
