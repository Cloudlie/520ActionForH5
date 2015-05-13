/**
 * Created by LuoMingWei on 2015/5/13.
 */
(function () {
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        var share_config = {
            general_config: {
                img_url: '',
                sharetitle: "",//share,
                //sharedesc:share,
                sharedesc: "",
                //link: gloBlink
                link: location.href
            }
        };
        var obj = share_config.general_config;
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid": "",
                "img_url": obj.img_url,
                "img_width": "",
                "img_height": "",
                "link": obj.link,
                "title": obj.sharetitle,
                "desc": obj.sharedesc
            }, function (res) {

            });
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": obj.img_url,
                "img_width": "",
                "img_height": "",
                "link": obj.link,
                "title": obj.sharetitle,
                "desc": obj.sharedesc
            }, function (res) {
            });
        });
    });
    var docuH = document.documentElement.clientHeight,
        firLoadImg = document.getElementsByClassName('firLoad');
    secLoadImg = document.getElementsByClassName('secLoad');
    allMoveBox = document.getElementsByClassName('swiper-slide');
    aStory = document.getElementsByClassName('story');
    aButton = document.getElementsByClassName('button');
    oShare = document.getElementsByClassName('share')[0];
    arrow_right = document.getElementsByClassName('arrow-right')[0];
    arrow_left = document.getElementsByClassName('arrow-left')[0];
    document.getElementsByClassName('swiper-container')[0].style.height = docuH + 'px';
    loadingBar_Icon = document.getElementById('loadingBar_Icon');
    loadingBarIn = document.getElementById('loadingBarIn');
    loadingBar_Icon_Text = document.getElementById('loadingBar_Icon_Text');

    for (var i = 1; i < secLoadImg.length; i++) {
        secLoadImg[i].style.backgroundSize = '100% ' + docuH + 'px';
        secLoadImg[i].style.mozBackgroundSize = '100% ' + docuH + 'px';
        secLoadImg[i].style.webkitBackgroundSize = '100% ' + docuH + 'px';
        secLoadImg[i].style.oBackgroundSize = '100% ' + docuH + 'px';
    }

    var addClass = function (ele, strClass) {
        var reg = new RegExp("(^| )" + strClass + "( |$)");
        if (reg.test(ele.className)) {
            //如果此类样式已经存在，则什么也不需要做
        } else { //不存在
            ele.className = ele.className.trim() + " " + strClass;
        }
    };
    var removeClass = function (ele, strClass) {
        if (!(ele && ele.nodeType == 1)) {
            alert('第一参数ele需要是一个DOM元素对象');
            throw new Error('第一参数ele需要是一个DOM元素对象');
        }
        if (typeof strClass != 'string') {
            alert('第二参数必须为string类型');
            throw new Error('第二参数必须为string类型');
        }
        var reg = new RegExp("(?:^| )" + strClass + "(?: |$)", "g");
        ele.className = ele.className.replace(reg, '').trim();
    };
    var getIndex = function (ele) {
        var nIndex = 0;
        var p = ele.previousSibling
        while (p) {
            if (p.nodeType == 1) {
                nIndex++; //让累加一次
            }
            p = p.previousSibling; //继续判断它的下一个哥哥
        }
        return nIndex;
    };
    for (var i = 0; i < firLoadImg.length; i++) {
        firLoadImg[i].style.backgroundImage = firLoadImg[i].dataset.url;
        addClass(allMoveBox[0], 'slide-move');
    }
    var imgObj = new Image();
    imgObj.src = "img/page-1.png";
    imgObj.onload = function () {
        var secLoadImgCount = secLoadImg.length;
        var percent = 0;
        var i = 0;
        var onloadsecLoadImg = function () {
            if (i < secLoadImgCount) {
                secLoadImg[i].style.backgroundImage = secLoadImg[i].dataset.url;
                percent = Math.ceil(((i + 1) / secLoadImgCount) * 100);
                loadingBar_Icon.style.left = (percent > 3 ? percent - 3 : percent) + "%";
                loadingBar_Icon_Text.innerText = percent + "%";
                loadingBarIn.style.width = percent + "%";
                i++;
                setTimeout(onloadsecLoadImg, 40);
            } else {
                setTimeout(function () {
                    document.getElementsByClassName('loading')[0].style.display = 'none';
                    addClass(allMoveBox[0], 'slide-move');
                }, 500);
            }
        }

        setTimeout(onloadsecLoadImg, 40);


    }

    aButton[0].onclick = function () {
        oShare.style.display = 'block';
    }
    oShare.onclick = function () {
        oShare.style.display = 'none';
    }

    arrow_left.onclick = function () {
        mySwiperPic.swipePrev();
    };

    arrow_right.onclick = function () {
        mySwiperPic.swipeNext();
    };

    var mySwiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        mode: 'vertical',
        onSlideChangeEnd: function () { //当滑块滑到下一块时
            var thisDiv = mySwiper.activeSlide(),
                thisIndex = getIndex(thisDiv);

            for (var i = 0; i < allMoveBox.length; i++) {
                removeClass(allMoveBox[i], 'slide-move');
            }
            addClass(thisDiv, 'slide-move');
        }
    });

    var mySwiperPic = new Swiper('.swiper-container-picture', {
        pagination: '.pagination',
        mode: 'horizontal',
        loop: true,
        grabCursor: true,
        paginationClickable: true
    })

    //$('.arrow-left').on('click', function (e) {
    //    e.preventDefault()
    //    mySwiper.swipePrev()
    //})
    //$('.arrow-right').on('click', function (e) {
    //    e.preventDefault()
    //    mySwiper.swipeNext()
    //});
})()
