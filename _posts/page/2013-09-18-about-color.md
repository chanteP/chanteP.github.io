---
layout: post
title: 色彩模型（色彩空间）笔记
category: article
tags: design
---
## 目录

<nav>

*   [目录](#index)
*   [序](#p1)
*   [列](#p2)
*   [论](#p3)
*   [破](#p4)
*   [参考文献](#arti)
</nav>

<a name="p1"></a>

## 序

说起颜色，一般来说都会想起“给你点颜色瞧瞧（give you some color see see）”的梗吧（记忆混乱中…骚等我歇会…）。对于咱们天天写代码的，第一印象应该是RGB了。

人眼可以分辨可见光谱（380～760nm）内的约150种不同的颜色，每种颜色都与一定波长的光线相对应。因此，在可见光谱的范围内，波长长度只要有3～5nm的增减，就可被视觉系统分辨为不同的颜色。一般认为，人眼能分辨的颜色数量大约一千万（各个地方数据不一，大概也就这个数量吧）。

色彩模型是描述使用一组值（通常使用三个、四个值或者颜色成分）表示颜色方法的抽象数学模型。例如 三原色光模式（RGB) 和印刷四分色模式（CMYK） 都是色彩模型。

其他小学美术内容就不说了。本篇的主题是色彩模型，数学相关。

<a name="p2"></a>

## 列

### Lab

![](http://ww2.sinaimg.cn/large/94fef42ejw1e8qnaqlk61j20k10k7gnm.jpg)Lab的中文是实验室，但这里很明显说的不是这个…这里的Lab色彩模型根据人对颜色的感觉而对颜色的描述，与显示载体无关（设备无关）。Lab中，L表示的是颜色的亮度（Luminosity，ps. 四级词汇量的我一直以为是lightness…），从0到100；a表示的是颜色上洋红-灰-绿色的颜色分量；b表示颜色上黄色-灰-蓝色的颜色分量。Lab模型的色域最广，基本包含了下面所有模型中能表示的颜色。

### RGB

RGB是烂大街的模型了（？）。RGB分别是三基色中的红（red）、绿（green）、蓝（blue）。由于光混色是加法法则，这三种颜色的光通过不同比例的混合能近似表示出人眼能分辨的可见光中所有颜色，于是上古传说中的彩色显示设备中就使用了这三种颜色的显像管来实现彩色的显示，加上RGB的值域相同（正常情况下），方便各种计算和处理，于是RGB就普及了。

使用二进制表示的情况下，每个颜色分量上使用8位来表示，那么每个颜色分量就可以用2^8，即256来量化这种颜色的量，即使用24位的情况下，RGB可以表示16777216（256x256x256）种颜色，理论上大概就是人眼能分辨的颜色数量了。但是理论归理论，RGB模型中，蓝和绿之间的区间显得过长，绿和红之间略短，导致颜色的分布显得不太均匀，导致这传说中的16777216种颜色所构成的色域和人眼能分辨的色域还是有点偏差。

RGB目录下还有几种分支——sRGB、Apple RGB和Adobe RGB等。sRGB大概就是上面两段废话所描述的模型，而AdobeRGB则相当于在其之上套上了一个CMYK（见下文）的马甲，使之能显示更多的颜色，但由于一般的显示屏基于sRGB输出，AdobeRGB中CMYK部分的颜色无法在这些显示器上呈现，所以普及率来说还是sRGB远高于AdobeRGB。当然，高贵的显示器还是有的。支持AdobeRGB的显示器色彩比普通显示器更加丰富，但是价格来说也太贵了…Apple RGB是苹果自己搞的一套模型，色彩比较艳丽（其他信息就不知道了..）。

此外还有个web安全色。由于人类发展初期（？）显示器显示的色域不太一致（大概是颜色位深不一），于是某组织就制定了这个web安全色的定义。这个模型（算是吧）的色域分别是由RGB三个分量中值为00、33、66、99、CC、FF的分量（为什么没有AA…）相互组合所成的颜色构成。于是网页设计上推荐使用web安全色来保证各个显示器上的显示效果一致（现在还谁管这个）。

### HSL/HSB/HSV

然后就到我最喜欢的HSX系列了…

这系列的共同点比较多，例如里面的三个字母代表的方向。其中H是色相（Hue）、S是饱和度（Saturation）、最后一个代表亮度/灰度。它们之间不同的点在于他们的出发点不一样。

HSL中，L指的是亮度（lightness），随着饱和度分量S的变化，颜色从对应色相H的全饱和色变化到与亮度L等价的灰色。

![](http://ww1.sinaimg.cn/large/94fef42ejw1e8qnfqq337j205k05xt8n.jpg)<p>
<p>HSV（其实和HSB一样），V指色调（value），B指明度（brightness）。

![](http://ww3.sinaimg.cn/large/94fef42ejw1e8qni2ddvcj206404w749.jpg)<p>

<p>HSL和HSV的不同可以从下图看到，就不多说了（其实是讲不清楚...）。

![](http://ww4.sinaimg.cn/large/94fef42ejw1e8qnjakheej20b404fdg5.jpg)<p>

<p>由于都是基于RGB色相环的模型，因此HSX和RGB之间能相互换算，有固定的换算公式，见参考文档的wiki链接。

相对于RGB，HSL（或者HSV）更适合人类感官上对颜色的描述。大多软件上的颜色选择器都会使用HSX（当然也会有用RGB选颜色的时候）。

### CYMK

CYMK（或者CMYK，看习惯）是由青（Cyan）、品红（Magenta）、黄（Yellow）和额外的黑色（Black）组成，原理基于颜色的减法混色，因此普遍在印刷业中使用。数值上，这几个分量的取值从0到100。理论上来说，使用不同分量的C、M、Y就可以混合出包括黑色在内的各种颜色（101^3种），黑色可用全分量的三色混合得出。但是实际上由于颜料的纯度还有化学反应什么之类的，这样的量混合只能得出<del datetime="2013-09-18T07:02:22+00:00">shi色</del>深灰色或者深褐色而不是纯黑色，所以添加了黑色油墨进行补充和修正。由于能描述的颜色数量远小于RGB的色域，所以有时候打印出的颜色和屏幕上面显示的颜色会不对应。

### XYZ

全称CIE—XYZ比色系，CIE在RGB上改良而出的一套系统。人眼有对于短（S，420-440nm）、中（M，530-540nm）和长（L，560-580nm）波长的光感受器（称为视锥细胞），还有单色的夜视光传感器---视杆细胞。人脑根据这些细胞受到光的刺激，将信号转换成某种颜色的感觉，因此人能看到色彩，根据这种刺激比例所描述出的颜色空间称为LMS空间。由于光的波长不同其实就是颜色的不同，所以可以从这三原色中导出参数，经过标准中的颜色匹配函数计算，最后得出XYZ色彩空间（ps.好复杂…建议看参考文档中原文）。总而言之xyz模型能比较客观地描述一种颜色，一般用于各种色彩模式转换的算法中。

![](http://ww4.sinaimg.cn/large/94fef42ejw1e8qnk3ulgyj20b40aiq31.jpg)   ![](http://ww1.sinaimg.cn/large/94fef42ejw1e8qnktbuo9j209209mgly.jpg)<p>

<a name="p3"></a>

## 论

<p>色彩属性和物理学中的光谱并不是完全对应的，物理学的人类可见光谱是有两个端点的直线形，并不能形成一个环。当然每种颜色都可以找到相应的光波长，但都有一个范围，并不是单一的波长。

计算机中的“32位真彩色”是在24位（颜色位深为8位）的RGB上添加8位的alpha值实现透明的感觉。

HTML5中可以使用HSL作为颜色值。相对于RGB，使用HSL可以更直观地对颜色进行处理，例如要得到<del datetime="2013-09-18T06:57:28+00:00">shi色</del>深褐色，可以大概想象出橙色在色相环中大概10deg的位置，颜色饱和大概在60%，亮度比较低大概在20%左右，于是得出hsl(10,60%,20%)的属性值。

Lab和XYZ可以比较客观地描述一种颜色。

RGB和CYMK所包含的色域不一样。从RGB转为CYMK时会丢失很多颜色信息。当然CYMK转RGB也会有部分颜色丢掉，因为CYMK中有部分的颜色也无法使用RGB进行描述。因此根据实际情况，在不同的使用情景中使用RGB和CYMK。

<a name="p4"></a>

## 破

这是为了目录好看而已不要在意这些细节…

<a name="arti"></a>

## 参考文献

<aside class="arti">
[http://blog.csdn.net/langyuewu/article/details/4144146](http://blog.csdn.net/langyuewu/article/details/4144146)
[http://amuseum.cdstm.cn/AMuseum/perceptive/page_3_eye/page_3_2b-8.htm](http://amuseum.cdstm.cn/AMuseum/perceptive/page_3_eye/page_3_2b-8.htm)
[http://baike.baidu.com/view/74665.htm](http://baike.baidu.com/view/74665.htm)
[http://www.adobe.com/digitalimag/adobergb.html](http://www.adobe.com/digitalimag/adobergb.html)
[http://zh.wikipedia.org/wiki/SRGB%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4](http://zh.wikipedia.org/wiki/SRGB%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4)
[http://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4](http://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4)
[http://xuewen.cnki.net/R2006050050000120.html](http://xuewen.cnki.net/R2006050050000120.html)
[http://wikipedia.qwika.com/en2zh/CIE_1931_color_space](http://wikipedia.qwika.com/en2zh/CIE_1931_color_space)
</aside>
</div>