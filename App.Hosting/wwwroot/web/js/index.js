layui.use(['jquery', 'carousel', 'flow', 'layer', 'laytpl', 'form',], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var flow = layui.flow;
    var layer = layui.layer, laytpl = layui.laytpl;

    var width = width || window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
    width = width > 1200 ? 1170 : (width > 992 ? 962 : width);
    var height = width > 992 ? 360 : 250;
    var carousel = layui.carousel;
    //建造实例
    carousel.render({
        elem: '#carousel'
        , interval: 3000
        , width: width + 'px' //设置容器宽度
        , height: height + 'px'
        , indicator: 'inside'
        , arrow: 'always' //始终显示箭头
        , anim: 'default' //切换动画方式

    });

    $(".home-tips-container span").click(function () {
        layer.msg($(this).text(), {
            time: 20000, //20s后自动关闭
            btn: ['明白了']
        });
    });


    $(".recent-list .hotusers-list-item").mouseover(function () {
        var name = $(this).children(".remark-user-avator").attr("data-name");
        var str = "【" + name + "】的评论";
        layer.tips(str, this, {
            tips: [2, '#666666']
        });
    });


    $("#QQjl").mouseover(function () {
        layer.tips('公司内网', this, {
            tips: 1
        });
    });
    $("#gwxx").mouseover(function () {
        layer.tips('OA系统', this, {
            tips: 1
        });
    });
    $("#xlwb").mouseover(function () {
        layer.tips('NC系统', this, {
            tips: 1
        });
    });
    $("#htgl").mouseover(function () {
        layer.tips('炼钢管理系统', this, {
            tips: 1
        });
    });

    $(function () {
        $.get("/home/init", "", function (result) {
            //热门文章
            if (result.hot.length > 0) {
                var getTpl = hotview.innerHTML;
                laytpl(getTpl).render(result.hot, function (html) {
                    $("#hot").append(html);
                });
            }
            //通知
            if (result.notice.length > 0) {
                var getTpl = tipsview.innerHTML;
                laytpl(getTpl).render(result.notice, function (html) {
                    $("#tips").append(html).parent().removeClass("layui-hide");
                });
                //播放公告
                playNotice(5000);
            }
            //右侧标签
            if (result.tags.length > 0) {
                var getTpl = temptags.innerHTML;
                laytpl(getTpl).render(result.tags, function (html) {
                    $("#tagsview").append(html);
                });
            }
            //友情链接
            if (result.link.length > 0) {
                var getTpl = linkview.innerHTML;
                laytpl(getTpl).render(result.link, function (html) {
                    $("#link").append(html);
                });
            }
        });

        search();
    });
    //首页主体文章
    //flow.load({
    //    elem: '#parentArticleList' //指定列表容器
    //    , done: function (page, next) { //到达临界点（默认滚动触发），触发下一页
    //        var lis = [];
    //        $.get('/article/page?page=' + page, function (res) {
    //            //假设你的列表返回在data集合中
    //            layui.each(res.data, function (index, item) {
    //                var tpl = newsview.innerHTML;
    //                laytpl(tpl).render(item, function (html) {
    //                    lis.push(html);
    //                });
    //            });
    //            //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
    //            //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
    //            next(lis.join(''), page < res.count);
    //        });
    //    }
    //});
    //首页通知轮播
    function playNotice(interval) {
        var index = 0;
        var $announcement = $('.home-tips-container>span');
        //自动轮换
        setInterval(function () {
            index++;    //下标更新
            if (index >= $announcement.length) {
                index = 0;
            }
            $announcement.eq(index).stop(true, true).fadeIn().siblings('span').fadeOut();  //下标对应的图片显示，同辈元素隐藏
        }, interval);
    };
    function search(key) {
        $("#parentArticleList>div").remove();
        flow.load({
            elem: '#parentArticleList' //指定列表容器
            , done: function (page, next) { //到达临界点（默认滚动触发），触发下一页
                var lis = [];
                var parm = "";             
                if (key) {
                    parm += "&Keywords=" + key;
                }
                $.get('/article/page?page=' + page + parm, function (res) {
                    //假设你的列表返回在data集合中
                    layui.each(res.data, function (index, item) {
                        var tpl = newsview.innerHTML;
                        laytpl(tpl).render(item, function (html) {
                            lis.push(html);
                        });
                    });
                    //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                    //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                    next(lis.join(''), page < res.count);
                });
            }
        });
    };

    form.on('submit(searchkeywords)', function (data) {
        console.log("aaa");
        var keywords = $("#keywords").val();
        if (keywords == null || keywords == "") {
            layer.msg('请输入要搜索的关键字');
            return false;
        }
        search(keywords);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
});



