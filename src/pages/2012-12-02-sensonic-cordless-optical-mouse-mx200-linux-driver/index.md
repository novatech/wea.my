---
title: sensonic cordless optical mouse MX200 Linux driver
date: 2012-12-02T01:28:39+00:00
layout: post
categories:
  - 'tips & tricks'
tags:
  - hid
  - kernel
  - linux
  - modules
  - usb
  - wireless
---

wireless mouse is great when you want to be 3-5 feet away from your pc and still want to have control over it.
so i bought this sensonic cordless optical mouse MX200 and I'm being using it extensively to play DOTA.

It was great in windows but not working so well in Linux. lsusb output show the mouse keep connected and disconnected randomly, render it to be unusable.

```console
$ lsusb output
Bus 006 Device 002: ID 0603:1602 Novatek Microelectronics Corp.
```

to fix this we need to add device id and its vendor id to hid module, below is the patch (kernel 3.6.6)

```diff
Index: linux-stable/drivers/hid/hid-ids.h
--- linux-stable.orig/drivers/hid/hid-ids.h
+++ linux-stable/drivers/hid/hid-ids.h
@@ -830,4 +830,7 @@
 #define USB_VENDOR_ID_PRIMAX 0x0461
 #define USB_DEVICE_ID_PRIMAX_KEYBOARD 0x4e05

+#define USB_VENDOR_ID_NOVATEK 0x0603
+#define USB_DEVICE_ID_NOVATEK_MOUSE 0x1602
+
 #endif
Index: linux-stable/drivers/hid/usbhid/hid-quirks.c
--- linux-stable.orig/drivers/hid/usbhid/hid-quirks.c
+++ linux-stable/drivers/hid/usbhid/hid-quirks.c
@@ -96,6 +96,7 @@ static const struct hid_blacklist {
 { USB_VENDOR_ID_WISEGROUP_LTD2, USB_DEVICE_ID_SMARTJOY_DUAL_PLUS, HID_QUIRK_NOGET | HID_QUIRK_MULTI_INPUT },

 { USB_VENDOR_ID_PI_ENGINEERING, USB_DEVICE_ID_PI_ENGINEERING_VEC_USB_FOOTPEDAL, HID_QUIRK_HIDINPUT_FORCE },
+ { USB_VENDOR_ID_NOVATEK, USB_DEVICE_ID_NOVATEK_MOUSE, HID_QUIRK_NO_INIT_REPORTS },

 { USB_VENDOR_ID_CHICONY, USB_DEVICE_ID_CHICONY_MULTI_TOUCH, HID_QUIRK_MULTI_INPUT },
 { USB_VENDOR_ID_CHICONY, USB_DEVICE_ID_CHICONY_WIRELESS, HID_QUIRK_MULTI_INPUT },
```

to recompile the kernel for ubuntu, please follow my previous kernel compilation guide
