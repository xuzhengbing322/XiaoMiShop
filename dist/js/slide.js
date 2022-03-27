define(["jquery"], function ($) {
  function download() { //在不同模块中起相同的名字也是可以的
    $.ajax({
      url: "../data/slide.json",
      success: function (data) {
        var slideArr = data.data.list.list;
        for (var i = 0; i < slideArr.length; i++) {
          $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                        <a href="#" target = "_blank">
                            <div class = 'content'>
                                <div class = 'thumb'>
                                    <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                                </div>
                                <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                                <p class = 'desc'>${slideArr[i].desc}</p>
                                <p class = 'price'>
                                    <span>${slideArr[i].seckill_Price}</span>元
                                    <del>${slideArr[i].goods_price}元</del>
                                </p>
                            </div>
                        </a>
                    </li>`).appendTo("#J_flashSaleList ul");
        }
      },
      error: function (msg) {
        console.log(msg);
      }
    })
  }

  function slideTab() {
    //获取到左右按钮
    var aSpans = $(".swiper-controls").find("span");
    //显示第一组图片，默认下表是0开始，每四个图片为一组
    var iNow = 0;
    //每四张图一组，不足取整。减一是因为最后一组要单独进行处理
    var count = Math.ceil(26 / 4) - 1;

    //启动定时器，让其一开始自己滚动
    var timer = setInterval(function () {
      //组数++
      iNow++;
      //调用tab()方法实现滚动
      tab();
      //如果最后组数是最后一列，则取消定时器
      if (iNow == count) {
        clearInterval(timer);
      }
    }, 4000);

    //设置点击事件
    aSpans.click(function () {
      //判断点击的按钮是否下标为0，
      if ($(this).index() == 0) {
        //左键
        iNow--;
        iNow = Math.max(0, iNow);  //iNow最小不能小于零。如果iNow大于等于0，则iNow等于iNow。如果iNow小于等于0，则iNow等于0
      } else {
        //右键
        iNow++;
        iNow = Math.min(count, iNow)  //要么使用count，如果iNow最大值就是iNow
      }
      tab();
    })
    function tab() {
      //如果iNow等于0，就直接将下标为0的按钮，给它添加一个class,即禁用状态。否则就删除这个禁用状态
      iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled");
      //同理如果iNow等于最后，....
      iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled")

      //计算要运动的值，即换页是将前面的iNow往左移。
      //iNow是否等于最后一组。如果是最后一组，则它应该是iNow*-992 + 496,如果不是最后一组则左移iNow * -992。四个图片的宽度
      var iTarget = iNow == count ? iNow * -992 + 496 : iNow * -992;
      //找到节点下面的ul，重设css样式
      $("#J_flashSaleList ul").css({
        //设置transform里面的属性，让它进行运动，左边的距离就是iTarget
        transform: `translate3d(${iTarget}px, 0px, 0px)`,
        //设置滚动的时间
        transitionDuration: "1000ms"
      })
    }

  }

  //定时器倒计时，每天14:00开枪，每天22:00开枪
  function countDown() {
    var nowDate = new Date();
    var hour = nowDate.getHours();
    var date = nowDate.getDate();
    var afterDate = new Date();


    //计算倒计时时间间隔
    if (hour < 14) {
      afterDate.setHours(14);
      $(".flashsale-countdown .round").html("14:00 场");

    } else if (hour >= 14 && hour < 22) {
      afterDate.setHours(22);
      $(".flashsale-countdown .round").html("22:00 场");
    } else {
      $(".flashsale-countdown .round").html("明日14:00 场");
      afterDate.setHours(14);
      afterDate.setDate(date + 1);
    }
    afterDate.setMilliseconds(0);
    afterDate.setSeconds(0);
    afterDate.setUTCMilliseconds(0);

    //计算倒计时总秒数
    var count = parseInt((afterDate.getTime() - nowDate.getTime()) / 1000);


    var aSpans = $(".box-bd .countdown").find("span");

    var timer = setInterval(function () {
      count--;
      aSpans.eq(2).html(doubleNum(count % 60));
      aSpans.eq(1).html(doubleNum(parseInt(count / 60) % 60));
      aSpans.eq(0).html(doubleNum(parseInt(count / 3600) % 24));
      if (count == 0) {
        clearInterval(timer);
        $(".box-bd .desc").html("本次活动结束,敬请期待~");
      }
    }, 1000);
  }

  function doubleNum(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  return {
    download: download,
    slideTab: slideTab,
    countDown: countDown
  }
})