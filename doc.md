# Cutie

## 介绍

![](https://cdn.jsdelivr.net/gh/yz-hs/PicGo/intro4.png)

Cutie 是一个 Hexo 主题。本主题由 [pmlrin](https://github.com/pmlrin/) 制作，外观借鉴了 [handsome](https://www.ihewro.com/archives/489/) 主题，部分代码借鉴自 [mkBlog](https://mkblog.cn/)。本主题可在 [Github](https://github.com/yz-hs/Cutie) 获取。

本主题依赖一些插件。请务必先看本文档，否则无法部署成功。

## 特点

- 自适应。
- 支持多个第三方评论平台（Gitalk，Livere，Giscus 等等）。
- 几种配色（`std`、`white`、`night`，本 Blog 使用 `white` 配色）与三种特殊样式。
- 中英文支持。
- Pjax 支持。
- 其他的许多特性！

## 首次使用

### Dependencies

1. “RSS”依赖 `hexo-generator-feed` 插件来运行。 请运行 `npm install hexo-generator-feed`。 

2. “wordcount”依赖 `hexo-wordcount` 插件来运行。 请运行 `npm i hexo-wordcount --save`。

3. “blog-encrypt”依赖 `hexo-blog-encrypt` 插件来运行。 请运行 `npm install --save hexo-blog-encrypt`。其使用方法，参见 <https://github.com/D0n9X1n/hexo-blog-encrypt/blob/master/ReadMe.zh.md>。

4. “Search”依赖 `hexo-generator-search`。请运行 `npm install hexo-generator-search --save`。其使用方法，参见 <https://github.com/wzpan/hexo-generator-search>。

   设置站内搜索页的方法是：在 front-matter 加上 `layout: search`。

5. 数学公式的依赖见下文。

6. 推荐安装插件： `hexo-neat` `hexo-generator-sitemap` `hexo-butterfly-tag-plugins-plus`。

### 代码高亮

去掉博客配置文件的自带代码高亮即可。

### 数学公式

本主题不内置对数学公式的支持（但已经包含 CSS）。请按照以下方法来支持数学公式：

Git bash 运行：

```bash
npm un hexo-renderer-marked
npm i hexo-renderer-markdown-it-plus
npm i katex
npm i @andatoshiki/markdown-it-katex
```

在博客配置文件写入：

```yaml
markdown_it_plus:
  plugins:
    - plugin:
      name: '@iktakahiro/markdown-it-katex'
      enable: false
    - plugin:
      name: '@andatoshiki/markdown-it-katex'
      enable: true
```

记得 `hexo clean`。

### 添加文章置顶

#### 方法一

请在 `path-to-your-blog/node_modules/hexo-generator-index/lib/generator.js` 的合适位置添加如下代码：

```js
posts.data = posts.data.sort(function(a, b) {
      if(a.top && b.top) {
          if(a.top == b.top) return b.date - a.date;
          else return b.top - a.top;
      }
      else if(a.top && !b.top) {
          return -1;
      }
      else if(!a.top && b.top) {
          return 1;
      }
      else return b.date - a.date;
  });
```

如代码所示，“文章置顶” 原理是按照文章的 top 值排序，并加上 "置顶" 标签。

#### 方法二

卸载系统自带的排序插件：

```swift
npm uninstall hexo-generator-index
```

添加替代插件：

```swift
npm install hexo-generator-index-pin-top --save
```

同样按照文章 top 值排序。

## 页面配置

### Tags/Categories

设置“标签页面”或“分类页面”的方法是：在 front-matter 加上 `layout: tags/categories`。

### Search

本主题支持两种搜索方式：站内搜索和站外搜索。

添加“搜索页面”方法：新建一个 page，在 front-matter 加上 `layout: search`。依赖 `hexo-generator-search`。

这里的站外搜索使用必应搜索。对于其他搜索引擎，可以自己更改。

**请注意：填入 search.xml 的链接时，一定要加上博客配置文件中的 url**。

### Setting

本主题支持“设置页面”，供访者自主设置主题样式、特殊效果等。

添加“设置页面”方法：新建一个 page，在 front-matter 加上 `layout: settings`。

### Mood

本主题支持“说说页面”。

添加“说说页面”方法：新建一个 page，添加如下代码：

```html
title: 说说
---

<script>
  $(function(){$("info").prepend("<i class='fa fa-clock-o'></i> ");});
</script>

<ul class="mood-list">

<li><!-- 头像，使用 img 标签 -->"<text><inner>
<!-- 说说内容 -->
<info><!-- 说说发表时间 --></info></inner></text></li>

...<!-- 不断重复第 10-12 行 -->

</ul>
```

### 404 page

在博客配置文件写入：

```yaml
skip_render:
  - '404.html'
```

之后，把主题文件夹下的 `_doc/404.html` 置入博客 `source` 文件夹下（不是主题的 `source` 文件夹）。

或者，创建新 page 作为 404 页面。在 front-matter 写入 `permalink: /404.html`。

## 其他

### Front-matter

本主题可设置如下 front-matter：

- `discomments: true`——是否禁止评论。
- `top: [number]`——设置文章排列优先级。注意，参看“添加文章置顶”部分来获取启用方式。
- `author: [list/array of string]`——设置作者（支持多作者）。默认为博客根目录中 `config_.yml` 中的内容。

下面是关于文章卡片的。文章卡片指在首页显示的含文章摘要的文本框。设置了背景图片，称为图片文章卡片；否则称为文字文章卡片。

图片文章卡片：

- `bgimg: /path/to/your/pic.img`——设置文章卡片背景图片。
- `height: [string]`——设定文章卡片高度（数字+单位）。默认 `30em`，亦可在 `_config.yml` 修改默认值。

文字文章卡片：

- `faname: [string]`——设置文章卡片的 Font Awesome 图标。默认是 `fa-file-text-o`。
- `disfa: true`——禁用文章卡片的 Font Awesome 图标。

注意：`bgimg` 和 `faname` 冲突。`bgimg` 优先。

### 禁用 Devtools

在需禁用 Devtools 的页面加入如下代码：

```html
<script src="/js/devtools.js"></script>
```

功能：

- 当使用 Devtools 时，跳转网页；
- 禁止右键，禁止选中文本。

### Custom

为了避免自主修改主题源码造成的麻烦，自定义 css 及 js 时，可以在 `/source/custom` 文件夹下自主添加所需要的 css 和 js 代码。

主题只会引用其中的 `custom.css` 和 `custom.js`。

### 短代码效果

理论上 Bootstrap5 中的所有都可以使用。另外，本主题还包括下面的一些东西。

**混乱文字**

```html
<div class="chaffle" data-lang="zh">“她好可爱啊！”</div>
```
**展开折叠**

```html
<details>
    <summary>请点击</summary>
    <p>就算风吹散了冰雪，想念也会留存下来。<br />鼠标点击会展开此内容。</p>
</details>
```

**黑幕类**


```html
提示：<shady title="你知道的太多了">就算风吹散了冰雪，想念也会留存下来。鼠标移在此上会显示此内容</shady>。仿自：[萌娘百科](https://zh.moegirl.org.cn/)。

由于本句话被高度加密，即使使用小刀或者<black title="你不知道的太多了">除了被选中</black>也无法划开屏幕上的部分黑幕。

提示：<blur>没错，你近视了。</blur><invsb>以至于你都看不见这句话。</invsb>

<blur>
<fieldset>
    <legend>温馨提示</legend>
    你需要换眼镜。请立即赶往附近的眼镜店。
</fieldset>
</blur>

<invsb><div class="text-alert danger"><i class="fa fa-info-circle"></i>不用换眼镜了。你已经看不见了。</div></invsb>
```

**提示框**

```html
<fieldset>
    <legend>温馨提示</legend>
    <p>提示点什么好呢？让我想想……</p>
</fieldset>
```

**分栏**

html：

```html
<div class="tab-page">
 <div class="tabTitle">
  <ul>
    <li class="current"></li>
    <li></li>
    <li></li>
  </ul>
 </div>
 <div class="tabContent">
  <div></div>
  <div class="hide"></div>
  <div class="hide"></div>
 </div>
</div>
```

javascript：

```javascript
$(function(){
      var ali = $('tabTitle>ul>li');
      var aDiv = $('tabContent>div');
      var timeId = null;
      ali.click(function(){
        var _this = $(this);
        timeId = setTimeout(function(){
          _this.addClass('current').siblings().removeClass('current');
          var index = _this.index();
          aDiv.eq(index).show().siblings().hide();
        });
      });
  });
```

**标签**

```html
请在 `tabTitle` 的<tag>第一个</tag>的 `li` 标签加上 `current` 类，除了 `tabContent` 的第一个 `div` 标签都加 `hide` 类。

你可以加<tag>不止三个</tag>标签。不过太长会<tag style="background: orange">溢出</tag>。

`tag` 自动轮换四种背景色，当然也可以自己指定。
```

**小号文字**

```html
温馨提示：提示点什么好呢<small>真的没有可提示的,,,</small>
```

**字幕**

```html
<!--滚动方向 direction 4个值 up down left right  默认从右向左-->
<marquee direction="up">我向上滚动</marquee>

<!--3个值 scroll-循环滚动 slide-只滚动一次 alternate-来回滚动  默认循环滚动-->
<marquee behavior="slide">我只滚动一次</marquee>

<!--值越大，滚动速度越快 一般5-10比较适宜消息观看-->
<marquee scrollamount="20">我是速度为20的滚动</marquee>

<!--值越大，滚动速度越慢，通常不设置-->
<marquee scrolldelay="110">我延迟滚动</marquee>

<!-- 默认值-1或infinite 表示无限循环滚动 loop="数值" 表示滚动相应的次数-->
<marquee loop="2">我是loop循环滚动</marquee>

<!--宽100px 高90px 背景色为#f5f5f5的滚动区域-->
<marquee width="100" height="90" bgcolor="#f5f5f5" >
    <p>我是滚动1</p>
    <p>我是滚动2</p>
    <p>我是滚动3</p>
</marquee>

<!--滚动空间 hspace-水平边距 vspace-垂直边距-->
<marquee width="50" hspace="20" vspace="10" >
	<p>我是滚动1</p>
    <p>我是滚动2</p>
    <p>我是滚动3</p>
</marquee>

<!--鼠标悬停，滚动停止   鼠标离开，滚动继续-->
<marquee onmouseover="this.stop()" onmouseout="this.start()">
    我是滚动
</marquee>
```
**时间轴**

```html
<ol class="timeline">
    <li> <t>时间轴</t> </li>
    <li> <b>2020/13/32</b><p>内容 1</p> </li>
    <li> <b>2020/13/33</b><p>内容 2</p> </li>
</ol>
```

**注音**

```html
<ruby>
那 <rt>n</rt>
没 <rt>m</rt>
事 <rt>s</rt>
了 <rt>l</rt>
</ruby>

<ruby>
那没事了 <rt>nmsl</rt>
</ruby>
```

### 外挂标签插件 `Third Party`

参见 <https://akilar.top/posts/615e2dec/>。

要想使用它，需要安装第三方插件 `hexo-butterfly-tag-plugins-plus`。

## 附注

1. 推荐在文件 `path-to-your-blog/_config.yml` 中将 per_page 设置为 0。
2. 如果一个页面中使用多个“标签页”，应使用 id 标注。例：