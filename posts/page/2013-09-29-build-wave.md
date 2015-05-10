---
layout: post
title: 音频作成（上篇）
category: web前端
tags: FE
---
## 目录

<nav>

*   [虽然全部内容就放在这段里面但是还是觉得加个目录显得比较专业](#cont)
*   [参考文献](#arti)
</nav>

<a name="cont"></a>

## 前因后果

其实很早之前就想做一个[由于相关法律法规此内容已被屏蔽]出来，相关的资源也找的7788了，但是一直都很忙（lan），所以就搁置了...今天闲嘛，所以就开始做一些准备工作了，但是，前段时间找的一个资源突然间不能用了，所以就稍微研究一下黑科技。

### 实验目的

生成特定音高的base64音频

### 实验准备

<del datetime="2013-09-29T08:58:52+00:00">特定音高的base64音频</del> 相关算法文档

一些现成工具包

### 实验难度:

۞۞☼

### 实验过程:

嘛，本来也不想用现成的工具包的，不过搞懂音频数据格式之前也就将就一下吧。

实验用到的工具是riffwave.js。通过设定一定的参数和传入一个音频数组（模拟音频曲线的数组）就可以生成一段音频。有空就拆它代码研究（坑）。有了这个工具之后，现在的任务就变得相对简单了————制作对应音高的音频数据数组。

这个之前嘛，得有一些理论基础<del datetime="2013-09-29T09:07:35+00:00">才能继续吹下去</del>。

高中物理就有讲到了，声音是由<del datetime="2013-09-29T09:16:07+00:00">抽搐</del> 震动产生的，根据震动的不同，产生的声音也不同。震动的**振幅**决定了声音的响度，**频率**决定了声音的音高，，除此之外，发声材质等会影响泛音等因素，造成音色的不同。

于是，怎么算出对应音高的频率呢？

在算这个之前，首先得扯到十二平均律和标准音了。

long long ago，有人发现了虽然各种声音的音高都不一样，但是当两个音相差一定的音高时，两个音给人的感觉大致相同。于是就把这两个音的音程根据感觉的差异分成12等分，然后就%……&&……&就&……（**&（*就得出十二平均律了（以上无科学根据）。然后其中拉了七个音出来组成了自然音阶，音名分别是C~B。因为根据的是感觉的差异，而实际上耳朵听到声音的感觉跟声音的频率并不是成简单的线性关系，而是对数关系（好像吧..不记得了），所以相邻的音之间都是等比关系。而相隔一个八度的音，它们在频率上相差一倍。

就算有了十二平均律，于是怎么才能统一一个规范，哪个音高才是C，哪个音高才是A呢？于是到了二十世纪初一群<del datetime="2013-09-29T09:16:07+00:00">无聊的</del> 物理<del datetime="2013-09-29T09:16:07+00:00">佬</del> 学者就制定了一个标准————把频率是440赫兹的音规定为中央C右右右右右的A的音高。

然后有了这堆奇怪的知识之后就可以开始作业了。当然，网上有对应音高频率的表格，但是如果直接算出来的话，很明显<del datetime="2013-09-29T09:16:07+00:00">逼格就高了</del> 数据方面就更容易处理了。

根据定义的话，A的频率是440赫兹，所以比这个A高一个八度的A的频率就是880赫兹了。由等比数列公式可以得出，相邻两个音之间的比是p，则：

880 = 440 * p^12 =&gt; p^12 = 2

所以只要算出要求的音和这个A的距离，就可以得出所对应的频率了。

由于时间关系，用单个的正弦函数做实验吧...

正弦函数sin(wx)中（输入法里面找不到w (´・ω・｀)...啊，可以复制了），频率：

f = 1 / T = ω / 2 * PI => ω = 2 * PI * f 

然后算出频率f，再算出 ω，代入正弦函数，得出一个数组，然后用riffwave就可以得出对应音高的音频数据了。

附demo：

（ps. 不知道为什么有些频率的声音生成的base64会出错，所以导致有些键无法发声。详细可新窗打开看控制台）

（ps2. 频率根据取样率添加了额外参数控制，音高好像有点怪）

（psp. 临时demo，推荐用chrome新窗打开）

（psv. <del datetime="2013-09-29T09:16:07+00:00">因为懒</del> 没加音量控制，请将系统音量调小，小心8bit电波洗脑）

<iframe src="http://nplab.sinaapp.com/media/audioFactory/index.html" style="height:150px;width:90%;margin:auto;"></iframe>

## 后续计划

拆代码。

找到一些好的音色的正弦函数，生成稍微能用的base64。

<del datetime="2013-09-29T10:01:49+00:00">继续坑着。</del>

## 参考文献

<aside class="arti">
<a>http://blog.laobubu.net/587</a>
<a>http://www.codebase.es/riffwave/</a>
</aside>
</div>