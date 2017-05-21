# WeChatAppletDemo
微信小程序demo

去年小程序刚发布时赶潮流做了个demo，感觉还是比较简单的，遗憾的是很多API需要微信认证才能使用。

![demoImg1](http://ooqymz3vm.bkt.clouddn.com/demo1.png)
![demoImg2](http://ooqymz3vm.bkt.clouddn.com/demo2.png)

由于小程序包大小限制在1M以内，所以商品图片等资源放在了云上，另外用Nodejs+Express写了个简单的API服务器供小程序调用，数据较少所以没有用数据库。
感兴趣的可以下载代码跑一下，服务器代码在server分支。

演示：
![demoGif1](http://ooqymz3vm.bkt.clouddn.com/demo1.gif)

![demoGif2](http://ooqymz3vm.bkt.clouddn.com/demo2.gif)

![demoGif3](http://ooqymz3vm.bkt.clouddn.com/demo3.gif)
