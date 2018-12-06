---
type: conclusion
section: mobile-and-desktop
locale: zh-CN
---
这个类别清晰地展示了 JavaScript 是如何突破浏览器的界限，发展到其他平台上的。

**React Native** 与 **Electron** 是使用网页技术搭建移动端和桌面端 app 的最热门人选。巧合的是，它们的满意度与用户数量都是十分相似的。

Electron 可以与任何前端框架搭配使用，这让它的灵活性大受好评。尽管大部分情况下，人们还是让它与 React 或 Vue.js 搭配使用。

只是，这类工具都还没有稳定下来。Airbnb 最近才发布了一篇文章 [《a thorough series of article》](https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c)，解释了他们在后续产品中放弃 React Native 的原因。

作为 React Native 的替代品，不想使用 React 做跨平台开发的可以考虑 [Weex](https://weex.apache.org/)。同时，使用 Weex 也可以很好地利用 Vue.js 的生态圈。

Google 在这一方面也颇有建树，基于 [Puppeteer](https://github.com/GoogleChromeLabs/carlo) 开发的 [Carlo](https://github.com/GoogleChromeLabs/carlo) 就是一个 “headful Node app” 框架。同时，它们还发布了 [Flutter](https://flutter.io/)。相比之下，Flutter 可以直接编译成平台的原生代码；而 React Native 这类的框架更像是代码与原生环境间的一座桥梁。
