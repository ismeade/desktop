function openImg(file) {
    var that = this;
    //多窗口模式，层叠置顶
    layer.open({
        type: 1, //此处以iframe举例
        title: false,
        move: ".layui-layer-content",
        moveOut: true,
        area: "auto",
        closeBtn: 0,
        shade: 0,
        maxmin: false,
        // offset  : [
        //   //为了演示，随机坐标
        //   Math.random() * ($(window).height() - 300),
        //   Math.random() * ($(window).width() - 390),
        // ],
        offset: 'lt', // 左上角
        area: ['200px', '200px'],
        //offset: "auto",
        // content: '<img src="C:/Users/lengq/Downloads/g1.gif" />',
        content: '<img src="' + file + '" />',

        // ,btn: ['继续弹出', '全部关闭'] //只是为了演示
        // ,yes: function(){
        //   $(that).click();
        // }
        // ,btn2: function(){
        //   layer.closeAll();
        // }

        zIndex: layer.zIndex, //重点1
        // 层弹出后的成功回调方法
        success: function (layero, index) {
            console.log(layero)
            //layero.content = '<img src="' + file + '" />';
            layer.setTop(layero); //重点2. 保持选中窗口置顶
            //记录索引，以便按 esc 键关闭。事件见代码最末尾处。
            layer.escIndex = layer.escIndex || [];
            layer.escIndex.unshift(index);
            //选中当前层时，将当前层索引放置在首位
            layero.on("mousedown", function () {
                var _index = layer.escIndex.indexOf(index);
                if (_index !== -1) {
                    layer.escIndex.splice(_index, 1); //删除原有索引
                }
                layer.escIndex.unshift(index); //将索引插入到数组首位
            });
        },
        // 层销毁后触发的回调
        end: function () {
            //更新索引
            if (typeof layer.escIndex === "object") {
                layer.escIndex.splice(0, 1);
            }
        },
        // 拖动方法
        moveEnd: function(layero) {
            console.log(layero)
        },
    });
}

layui.use(["layer", "upload"], function () {
    //独立版的layer无需执行这一句
    var $ = layui.jquery,
        upload = layui.upload,
        layer = layui.layer; //独立版的layer无需执行这一句

    //多窗口模式 - esc 键
    $(document).on("keyup", function (e) {
        if (e.keyCode === 27) {
            layer.close(layer.escIndex ? layer.escIndex[0] : 0);
        }
        if (e.keyCode === 67) {
            //   openImg("C:/Users/lengq/Downloads/g1.gif");
            $("#test10").click();
            // var othis = $("#layerDemo .layui-btn"), method = othis.data("method");
            // active[method] ? active[method].call(this, othis) : "";
        }
    });

    //拖拽上传
    upload.render({
        elem: "#test10",
        // url: "https://httpbin.org/post", //改成您自己的上传接口
        auto: false,
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                openImg(result);
                // $("#demo1").attr("src", result); //图片链接（base64）
            });
        },
        // done: function (res) {
        //   layer.msg("上传成功");
        //   layui
        //     .$("#uploadDemoView")
        //     .removeClass("layui-hide")
        //     .find("img")
        //     .attr("src", res.files.file);
        //   console.log(res);
        // },
    });

    //layer.photos({
        //photos: { "data": [{"src": '/img/-7Q8j2h-9r1nZ26T1kS5k-5k.gif.medium.gif'},{"src": '/img/34b61e506598559d30f1deec1b7385636bf44d40.gif'},{"src":'/img/1srpgdqy8wk71.jpg'}] }
        //,anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机
    //});
});
