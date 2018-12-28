/**
 * Created by mei.zhang
 * 滑动模块
 * @param  {[string]} obj.panel eg: '.slider-panel'
 * * @param  {[string]} obj.paneleq eg: '.slider-panel:eq(0)'
 * * @param  {[string]} obj.main eg: '.slider-main'
 * * @param  {[string]} obj.Next eg: .slider-next
 * * @param  {[string]} obj.pre eg: '.slider-pre'
 * * @param  {[string]} obj.stopAuto是否停止自动滑动，true为停止 eg: '.slider-pre'
 * @return {[Object]}
 *
 */


define('modules/slide', function(){
    "use strict";
    var slide= function (obj){
        var len,myset;
        var Time = obj.time || 4000;
        if(obj.panel){
            len=$(obj.panel).size();//获取banner图的图片总数
        } else if(obj.panel1){
            len=$(obj.panel1).size()/5;//获取banner图的图片总数/4
            len = Math.ceil(len);
        }
        var wid=$(obj.panelfir).width();//每次滑动的距离
        var $new=$(obj.paneleq).clone();//克隆第一张图片添加到最后
        if(len>1){//当循环的商品图片（首页banner）是一个或是一组（可能喜欢）的时候不能自动轮播和左右切换
            $(obj.main).append($new);//并将克隆的第一张图片添加到最后
            $(obj.pre).click(right);//右按钮
            $(obj.Next).click(left);//左按钮
        }
        var n=0;
        //点击右按钮要执行的动作
        function right(){
            add();
            play("after");
            $(obj.main).stop(true).animate({'left':-wid*n});
        }
        //点击左按钮要执行的动作
        function left(){
            add();
            play("before");
            $(obj.main).stop(true).animate({'left':-wid*n});
        }
        function play(str){
            str=="after" ? n++ : n--;
            if(n>len){
                $(obj.main).css({'left':0});
                n=1;
            }
            if(n<0){
                $(obj.main).css({'left':-wid*len});
                n=len-1;
            }
            dashed();
        }
        //图片上面圆点是否高亮显示
        function dashed(){

            $('.slider-item').removeClass('slider-item-selected');
            $('.slider-item').eq(n%len).addClass('slider-item-selected');//n%len  的意思就是到达最后一张（克隆的那一张）的时候高亮的点能回到第一个
        }

        //自动轮播
        if(!obj.stopAuto && len>1){
            myset=window.setInterval(every,Time);
        }
        function every(){
            play("after");
            $(obj.main).stop(true).animate({'left':-wid*n});
        }

        //将第一个slider-item设为激活状态
        $(".slider-item:first").addClass('slider-item-selected');
        //鼠标上悬时清除定时器,鼠标离开时添加定时器
        function stop(btnarrow){
            $(btnarrow).hover(function() {
                clear();
            }, function() {
                if(!obj.stopAuto && len>1) {
                    add();
                }
            });
        }
        stop(obj.Next);
        stop(obj.pre);
        stop(obj.panel);
        stop('.overflow dl');
        //当鼠标悬浮在图片上的点点时，图片的切换
        $(".slider-item").hover(function() {
            clear();
            n=$(this).index();
            $(obj.main).stop(true).animate({'left':-wid*n});
            $('.slider-item').removeClass('slider-item-selected');
            $(this).addClass('slider-item-selected');
        }, function() {
            if(!obj.stopAuto && len>1){
                add();
            }
        });
        //清除定时器
        function clear(){
            window.clearInterval(myset);
            myset=null;
        }
        //添加定时器
        function add(){
            if(!obj.stopAuto && len>1){
                window.clearInterval(myset);
                myset=null;
                myset=window.setInterval(every,Time);
            }
        }

    };
    return {
        slide:slide
    };

});