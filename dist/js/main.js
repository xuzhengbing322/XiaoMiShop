console.log("加载完成");
/* 
    配置当前这个项目用到的哪些模块
    遵从的都是AMD规范
    所有.js文件，后缀都可以省略
*/
require.config({
  paths: {   //引入的文件路径
    "jquery": "jquery-1.11.3",   //引入jquery模块，文件路径是jquery-1.11.3.js
    "jquery-cookie": "jquery.cookie",  //引入jquery-cookie模块，文件路径是jquery.cookie.js
    "parabola": "parabola",
    //引入banner图效果
    "nav": "nav",
    "slide": "slide",
    "data": "data"
  },
  shim: {
    //设置jquery和jquery.cookie的依赖关系，jquery.cookie是通过jquery开发的。这样在引入的时候就可以先引入jquery.js，然后再去引入jquery-cookie
    "jquery-cookie": ["jquery"],
    //声明当前模块不遵从AMD
    "parabola": {
      exports: "_"
    }
  }
})

require(["nav", "slide", "data"], function (nav, slide, data) {  //通过require引入nav模块，然后再function中找到nav模块
  nav.download();  //调用nav中暴露的download方法
  nav.banner();  //调用nav.js中的banner方法。
  nav.leftNavTab();
  nav.topNavTab();
  nav.searchTab();

  // //加载商品数据 
  slide.download();
  // //添加商品数据滚动效果
  slide.slideTab();
  // //倒计时效果
  slide.countDown();

  // //主页数据加载
  data.download();
  data.tabMenu();

})