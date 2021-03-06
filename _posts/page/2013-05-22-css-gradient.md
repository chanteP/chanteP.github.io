---
layout: post
title: 我们仍未知道那天看到的格子渐变css的写法
category: article
tags: FE
---

#### 前言

前段时间在微博上面看到馍大转的一篇关于各种<del>码农必备</del>格子样式的微博(http://weibo.com/1660579792/zwDT4hPZn)，刚好手头上需要做一个类似的<del>能装逼的</del>效果，于是稍微研究了一下css3的渐变，然后顺手就挖了个坑。

css3里面提供了制作渐变的方法，可以在background-image里面用gradient制作颜色渐变的效果，用途广泛，实乃居家旅行装逼必备神器。当然，不会配色的我用起来还是...

渐变按样式可以分为线性渐变和径向渐变两种，其中各有一个repeat版，参数基本一样，所以下文中主要按样式划分来讲。由于各种浏览器支持不一样，语法和前缀也不太相同，下文以一般通用语法为主(其实还是chrome为主，因为一般只用chrome做实验..)。

[![](http://labs-wordpress.stor.sinaapp.com/uploads/2013/05/QQ截图20130522131041.png "QQ截图20130522131041")](http://labs-wordpress.stor.sinaapp.com/uploads/2013/05/QQ截图20130522131041.png)

#### 线性渐变

linear-gradient/repeating-linear-gradient

[code]linear-gradient([&lt;point&gt;||&lt;angle&gt;,]?&lt;color-stop&gt;,&lt;color-stop&gt;[,&lt;color-stop&gt;]*)[/code]

point: 和background-position一样，表示从哪个店开始；

angle：ndeg，表示渐变的方向，沿x轴正方向逆时针数；

color-stop：又颜色值和可选的位置组成，缺少位置的话将默认均分；根据浏览器的支持情况，颜色值可用#FFFFFF、white、rgb/rgba、hsl/hsla之类的写法；

最终呈现的效果是：在指定的方向上，指定的位置出现指定的颜色，相邻位置间的颜色由指定颜色的过渡来补充。补充的颜色以什么算法来过渡这个待考察。

通过ps上的渐变窗口可以比较直观地解释上面这堆东西。

[![](http://labs-wordpress.stor.sinaapp.com/uploads/2013/05/123.png "ps-gradient")](http://labs-wordpress.stor.sinaapp.com/uploads/2013/05/123.png)

上图的效果如果用linear-gradient实现大致如下：

linear-gradient(90deg, red, purple 20%,blue 45%,cyan 46%,green,yellow,red);

<span style="display:block;height:20px;background-image:linear-gradient(90deg, red, purple 20%,blue 45%,cyan 46%,green,yellow,red);"></span>

由于chrome抽风还是什么的，新版的chrome可以不加前缀直接使用这种写法，但是不支持point参数。当然这也没什么不对，因为线性渐变的确不需要point什么的，方向足矣...

#### 径向渐变

radial-gradient/repeating-radial-gradient

radial-gradient([&lt;position&gt; || &lt;angle&gt;,]? [&lt;shape&gt; || &lt;size&gt;,]? &lt;color-stop&gt;, &lt;color-stop&gt;[, &lt;color-stop&gt;]*)

position：同上

angle：同上

shape：<del datetime="2013-05-22T04:24:18+00:00">同上</del>[circle , ellipse], 表示渐变式圆形还是椭圆的；默认为椭圆；

size：[closest-side，closest-corner，farthest-side，farthest-corner，contain，cover]，颜色值将按照这个参数的属性分配位置

color-stop：和线性一样

#因为没什么用到径向，先坑着以后填#

#### 补充

为什么上面说的都没提到repeat版呢？因为当使用百分比或者缺省stop值的时候，repeat版和普通版的效果完全一样！(初步测试)

和box-shadow、text-shadow一样，background-image也可以使用多个渐变叠加在一起形成更复杂的效果(要设置透明度使后面的不被覆盖)。

因为是background-image，所以可以把这个渐变当作一张图片，background-size、background-repeat之类的属性该怎么影响就怎么影响。如果要做repeat无缝连接的话，要注意计算background-size的时候要把渐变里面倾斜的角度考虑上，例如渐变里面最后的color-stop是120px，angle是45deg的时候，background-size应该是 120px x cos(45deg), 120px x sin(45deg)。

#### demo坑

<span style="display:block;height:20px;background-color:#333;background-image:repeating-linear-gradient(45deg, transparent, transparent 20px, hsla(0, 60%, 40%, .5) 20px, hsla(0, 60%, 40%, .5) 24px, transparent 24px, transparent 26px, hsla(30, 40%, 50%, .5) 26px, hsla(30, 40%, 50%, .5) 28px, transparent 28px, transparent 40px), repeating-linear-gradient(135deg, transparent, transparent 20px, hsla(0, 60%, 40%, .5) 20px, hsla(0, 60%, 40%, .5) 24px, transparent 24px, transparent 26px, hsla(30, 40%, 50%, .5) 26px, hsla(30, 40%, 50%, .5) 28px, transparent 28px, transparent 40px);"></span>

* * *
</hr>

<span style="display:block;height:20px;background-image:repeating-linear-gradient(45deg, #fff 0, #fff 30px, hsl(240, 70%, 80%) 30px, hsl(240, 70%, 80%) 55px);"></span>

* * *
</hr>

<span style="display:block;height:20px;background-image:repeating-linear-gradient(45deg, #333 30px, hsla(18, 80%, 50%, 1) 30px, #333 60px);"></span>

#### 参考

http://wiki.qianduan.net/linear-gradient.html

http://www.cnblogs.com/gaoxue/articles/CSS3Gradient-1.html

http://www.colorzilla.com/gradient-editor/

https://www.webkit.org/blog/1424/css3-gradients/
