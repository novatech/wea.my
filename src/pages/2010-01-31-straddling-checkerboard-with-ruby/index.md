---
title: straddling checkerboard with ruby
date: 2010-01-31T19:48:29+00:00
layout: post
categories:
  - programming
tags:
  - cryptography
  - ruby
---

this week i sharpen my ruby saw with an excessive about straddling checkerboard encryption.

> In cryptography, a straddling checkerboard is a device for converting an alphabetic  plaintext  into digits whilst simultaneously achieving fractionation (a simple form of information diffusion) and homophony (a simple method for suppressing peaks of the frequency distribution). It also is known as a monome-dinome cipher. — [wikipedia](http://en.wikipedia.org/wiki/Straddling_checkerboard)

after do some reading on how the operation was, i've workout the algorithm.

as i want to learn more about ruby but don't know what i can do with it, so i decided to write this in ruby

here's the solution

```ruby
class Straddling
def initialize( key_text, n1, n2, n3 )
   key_text = key_text+"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
   key_text = key_text.upcase.split(//).uniq
   @key_text = key_text
   @n1 = n1;@n2 = n2;@n3 = n3
end

def create
   @board = Array.new()
   k = 0;prev = ""
   for a in 0..40 do
       if (a == @n1 || a == @n2 || a == @n3)
     	 @board[a] = "_"
       else
         if ("A".."J") === prev

          @board[a] = prev == "J"? 0:((prev)[0]-16).chr
         else
          @board[a] = @key_text[k] == " " ? "*" : @key_text[k]
          k+=1
         end
         prev = @board[a]
       end
    end
   return @board.to_s
end


def tp(key,text)
@key = key.split(//)
@text = text.gsub(' ','*').upcase.split(//)
end

def keygen
@keygen = Array.new
@checker_board = @board.to_s.split(//)
for a in 0..@text.length-1 do
	found = @checker_board.index(@text[a])
	if (0..9) === found
        @keygen.push(found)
	elsif (10..19) === found
        @keygen.push(@n1,found%10)
	elsif (20..29) === found
        @keygen.push(@n2,found%10)
	else
        @keygen.push(@n3,found%10)
	end
end
end

def e(key,text)
self.tp(key,text)
self.keygen
print "#{@keygen.to_s}\n"
t = Array.new
	@keygen.each do |value|
		t.push((@key[0].to_i+value.to_i)%10)
		@key << @key.shift
	end
print "#{@t.to_s}\n"
print "Encrypt=#{self.show(t)}\n"
end

def d(key,text)
self.tp(key,text)
self.keygen
t = Array.new
@keygen.each do |value|
t.push((value+10-(@key[0]).to_i)%10)
@key << @key.shift
end
print "Decrypt=#{self.show(t).gsub('*',' ')}\n"
end


def show(t)
a = 0
result = ""
while a < t.length
unless t[a] == @n1 || t[a] == @n2 || t[a] == @n3
result = result + @checker_board[t[a]]
a+=1
else
result = result + @checker_board[   t[a+1] == nil ? t[a] :  (t[a] == @n1 ? 1 : t[a] == @n2? 2:3)*10+t[a+1]         ]
a+=2
end
end
return result
end


end
board = Straddling.new("sharpen your saw",2,5,9)
puts(board.create)
board.e("2641","programming praxis")
board.d("2641","S811R53S87A18RUAS8PSSH5")
puts("\n")
board.e("2641","encrypt this text")
board.d("2641","A118R1H81A8RALR8H5ALRA180_")
puts("\n\n")
board = Straddling.new("my secret keys",2,5,9)
puts(board.create)
board.e("241","ruby programming rocks")
board.d("241","SF5E5*5MIREESEACY45YIS5****MESE")
```

[code preview](http://codepad.org/YxIAE8Ch)

**fix:** bug where it didn't check for null value after last digit

note that this code use 3 space but of course you can modify it and chose different space if you like
