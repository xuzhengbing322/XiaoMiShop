//处理首页导航部分，声明模块遵从AMD
define(["jquery"], function ($) { //声明模块jquery，通过参数$就能拿到对应的数据
  function download() { //创建函数下载数据
    //数据下载
    $.ajax({   //使用jquery中的ajax方法获取数据
      type: "get",
      url: "../data/nav.json",
      success: function (data) {  //data
        //第一部分，实现轮播图效果
        //data应该指的就是json文件，data.banner指的是文件中json文件中banner数据，banner是个数组，所以对象名是bannerArr。此时bannerArr就代表json中banner数据。
        var bannerArr = data.banner;
        //通过循环将数据添加到页面上。先将数组进行遍历，然后加载数据。通过循环创建和index.html中对应相同部分的节点。
        //href是点击图片时的链接，class时图片的样式，src是图片的地址
        for (var i = 0; i < bannerArr.length; i++) {
          $(`<a href="${bannerArr[i].url}">
                        <img class = 'swiper-lazy swiper-lazy-loaded' src = '../images/banner/${bannerArr[i].img}' alt=""/> 
                    </a>`).appendTo("#J_homeSwiper .swiper-slide");
          //通过appendTo()将$内容插到index.html中id为J_homeSwiper中class为.swiper-slide。将静态的文件拷过去
          var node = $(` <a href="#" class = 'swiper-pagination-bullet'></a>`);
          if (i == 0) {
            //判断是否选择第一张图，默认第一张图被选中。并给第一张图片的小圆点添加样式
            node.addClass("swiper-pagination-bullet-active");
          }
          //通过appendTo()将$内容插到index.html中id为J_homeSwiper中class为.swiper-slide。将静态的文件拷过去
          node.appendTo("#J_homeSwiper .swiper-pagination");
        }
      },
      error: function (msg) { //提高容错
        console.log(msg);

      }
    })
    topNavDownload();
    leftNavDownload(); //并没有单独暴露这个函数，而是通过加载banner时，顺便一起加载leftNavDownload
  }

  //侧边导航栏加载。实现某个功能，先构建布局，然后再实现特效。
  function leftNavDownload() {
    $.ajax({
      url: "../data/nav.json",
      success: function (data) {
        //第二部分，实现侧边导航栏
        var sideArr = data.sideNav;
        //数据添加成功后，通过循环将每个节点添加到页面上
        for (var i = 0; i < sideArr.length; i++) {
          //创建节点
          var node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideArr[i].title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix">
                            
                        </div>
                    </li>`);
          //将节点插在首页对应的地方
          node.appendTo("#J_navCategory #J_categoryList");

          //取出当前选项对应的子节点数据
          var childArr = sideArr[i].child;
          //计算当前选项一共多少列。每列最多放6条数据，不足六条ceil向上取整
          var col = Math.ceil(childArr.length / 6);
          //找到节点中的div.children，去给他一个class，实现设置对应列数的class样式。
          node.find("div.children").addClass("children-col-" + col);
          //通过循环，创建右侧上面的每一个数据
          for (var j = 0; j < childArr.length; j++) {
            if (j % 6 == 0) {
              //当有六个数据时，就创建一个列表newUl
              var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`);
              //将找到节点插在node.div.children
              newUl.appendTo(node.find("div.children"));
            }
            //拿到每一个li标签
            $(`<li>
                            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childArr[j].title}</span>
                            </a>
                        </li>`).appendTo(newUl);
          }
        }
      }
    })
  }

  //下载顶部导航数据
  function topNavDownload() {
    $.ajax({
      url: "../data/nav.json",
      success: function (data) {
        //第三部分实现顶部导航
        var topNavArr = data.topNav;
        //服务和社区没有下拉数据，因此通过push添加两个title
        topNavArr.push({ title: "服务" }, { title: "社区" });
        for (var i = 0; i < topNavArr.length; i++) {
          //创建title节点
          $(`<li data-index="${i}" class="nav-item">
                        <a href="javascript: void(0);" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1" class="link" data-stat-id="69baf6920236bfcb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-69baf6920236bfcb', 'javascript:void0', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1']);">
                            <span class="text">${topNavArr[i].title}</span>
                        </a> 
                    </li>`).appendTo(".site-header .header-nav .nav-list");

          //创建ul节点，默认第0的显示
          var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}">
                    </ul>`);
          node.appendTo("#J_navMenu .container")
          //取出所有的子菜单选项
          //取数据时判断i有childs属性，再进行以下操作，如果没有就不做。
          if (topNavArr[i].childs) {
            //获取childs数据，通过循环创建所有的li节点。
            var childsArr = topNavArr[i].childs;
            for (var j = 0; j < childsArr.length; j++) {
              $(`<li>
                                <a href="#">
                                    <div class = 'figure figure-thumb'>
                                        <img src="${childsArr[j].img}" alt=""/>
                                    </div>
                                    <div class = 'title'>${childsArr[j].a}</div>
                                    <p class = 'price'>${childsArr[j].i}</p>
                                </a>
                            </li>`).appendTo(node);
            }
          }
        }
      },
      error: function (msg) {
        console.log(msg);
      }
    })
  }

  //顶部导航添加移入移出效果
  function topNavTab() {
    //找到节点，然后通过事件委托，让nav-item响应
    $(".header-nav .nav-list").on("mouseenter", ".nav-item", function () {
      $(this).addClass("nav-item-active");
      //移出，当前移入这个a标签的下标，这个小标和下面部分要显示的ul的下标一致
      var index = $(this).index() - 1;
      if (index >= 0 && index <= 6) {  //让服务和社区没有移入移出的效果。
        $("#J_navMenu").css({ display: "block" }).removeClass("slide-up").addClass("slide-down");
        $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");;
      }
    })
    $(".site-header").on("mouseleave", ".nav-item", function () {
      $(this).removeClass("nav-item-active");
    })


    //移出的时候取消下拉菜单。不要添加在每一个a标签上，不然当鼠标移出a标签时，下拉菜单会直接消失掉。因此要在整体的外面添加移出
    $(".site-header").mouseleave(function () {
      $("#J_navMenu").css({ display: "block" }).removeClass("slide-down").addClass("slide-up");
    })

  }

  //给侧片导航添加移入切换效果  选项卡的切换效果
  function leftNavTab() {  //通过事件委托，首先获取节点，然后添加鼠标移入，并让.category-item响应
    $("#J_categoryList").on("mouseenter", ".category-item", function () {
      $(this).addClass("category-item-active");
    })
    $("#J_categoryList").on("mouseleave", "li.category-item", function () {
      $(this).removeClass("category-item-active");
    })
  }

  //实现轮播图的轮播效果
  function banner() {

    var iNow = 0;  //当前显示的图片的下标
    var aImgs = null;  //记录图片
    var aBtns = null;  //记录小圆圈
    var timer = setInterval(function () {  //每隔2.5s，iNow+1，并执行一次tab()函数
      iNow++;
      tab();

    }, 2500);

    //封装切换函数 
    function tab() {
      if (!aImgs) { //如果判断当前界面图片不存在，则找到#J_homeSwiper .swiper-slide中所有的a标签
        aImgs = $("#J_homeSwiper .swiper-slide").find("a");
      }
      if (!aBtns) {  //如果判断当前界面图片的小圆圈不存在，则找到#J_homeSwiper .swiper-pagination中所有的a标签
        aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
      }
      if (iNow == 5) {
        iNow = 0;
      }

      //图片切换。先将页面上所有的图片隐藏掉，然后将透明度全部设置为0.2，然后通过eq(iNow)找到要显示的图片，并将它显示出来，然后通过动画animate（）设置它的透明的为1，时间为500毫秒
      aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({ opacity: 1 }, 500);
      //小圆点按钮切换。先取消所有小圆点的样式，然后通过eq(iNow)找到按钮，然后添加样式swiper-pagination-bullet-active
      aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
    }

    //添加鼠标的移入移出
    $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function () {
      clearInterval(timer);
    });
    $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseleave(function () {
      timer = setInterval(function () {
        iNow++;
        tab();

      }, 2500);
    });

    //点击小圆圈可以完成切换到对应的图片。通过事件委托让a标签响应。先找到节点$，然后事件委托添加点击，让a标签响应函数
    $("#J_homeSwiper .swiper-pagination").on("click", "a", function () {
      iNow = $(this).index();  //将当前小圆点的下标赋值给iNow，让两者的值完全一致
      tab();//调用函数实现点击小圆圈切换到对应图片
      return false;  //阻止a链接的默认行为，防止点击小圆圈后出现页面跳转
    })

    //给上一张和下一张添加点击事件 
    $(".swiper-button-prev,.swiper-button-next").on("click", function () {
      if (this.className == "swiper-button-prev") {
        iNow--;
        if (iNow == 0) {
          iNow == 4;
        }
      } else {
        iNow++;
      }
      tab();
    })

  }

  //搜索框效果
  function searchTab() {
    $("#search").focus(function () {
      $("#J_keywordList").removeClass("hide").addClass("show");
    })
    $("#search").blur(function () {
      $("#J_keywordList").removeClass("show").addClass("hide");
    })
  }

  function allGoodsTab() {
    $(".header-nav .nav-list").on("mouseenter", ".nav-category", function () {
      $(this).addClass("nav-category-active");
      $(this).find(".site-category").css("display", 'block');
    })

    $(".header-nav .nav-list").on("mouseleave", ".nav-category", function () {
      $(this).removeClass("nav-category-active");
      $(this).find(".site-category").css("display", 'none');
    })
  }

  return {
    banner: banner, //把函数当作返回值反馈出去，然后再main.js中调用这个方法
    download: download, //下载的方法需要在main.js中被调用，所以要在这里暴露。
    leftNavTab: leftNavTab,
    topNavTab: topNavTab,
    searchTab: searchTab,
    topNavDownload: topNavDownload,
    allGoodsTab: allGoodsTab,
    leftNavDownload: leftNavDownload

  }
})