---
title: calculating phase of moon in ruby
date: 2010-01-24T14:32:55+00:00
layout: post
categories:
  - programming
tags:
  - calculation
  - ruby
---

this is one of programmingpraxis exercise. written it in ruby because i need to sharpen my ruby skill :p

the question is quite easy actually. there's a lot more exciting and challenging excessive at [programmingpraxis](http://programmingpraxis.com) i will try during my free time. imo, this can be some kind of new hobby

```ruby
def julian (year, month, day)
a = (14-month)/12
y = year+4800-a
m = (12*a)-3+month
return day + (153*m+2)/5 + (365*y) + y/4 - y/100 + y/400 - 32045
end
def phase (year,month,day)
p=(julian(year,month,day)-julian(2000,1,6))%29.530588853
if p<1.84566: return "New"
elsif p<5.53699: return "Waxing crescent"
elsif p<9.22831: return "First quarter"
elsif p<12.91963: return "Waxing gibbous"
elsif p<16.61096: return "Full"
elsif p<20.30228: return "Waning gibbous"
elsif p<23.99361: return "Last quarter"
elsif p<27.68493: return "Waning crescent"
else return "New"
end
end

print "#{phase(2020,1,23)}\n"
print "#{phase(1999,1,6)}\n"
print "#{phase(2010,2,10)}\n"
print "#{phase(1987,5,10)}\n"
```

[preview moon phase output](http://codepad.org/weAgLbh7#output)
