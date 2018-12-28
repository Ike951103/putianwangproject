/**
 *  zhang mei
 * 城市选择模块
 * @param  {[string]} obj.citya eg: 点击的目标元素（#J_currentCity915 a）
 * @return {[Object]}
 *
 */

define('modules/city', function(){
    var city = function (obj){
        //控制地址显示的最大高度为：浏览器可视区的高度减50
        var height = document.documentElement.clientHeight-50;
        $('#J_cityOption915').css('max-height', height);
        //点击当前元素让切换城市
        $(obj.citya).click(function(){
            var $that = $(this);
            var $cityname = $that.parents('#J_currentCity915').find('.cityname915');
            $cityname.text($that.text());
        });
        //点击可展开的地址
        $(obj.subcity).click(function(){
            var $that = $(this);
            if ( $that.attr('data-falg') == 'close' ) {
                $that.parents('.city-text-r').next().show();
                $that.attr("data-falg","open");
            } else {
                $that.parents('.city-text-r').next().hide();
                $that.attr("data-falg","close");
            }
        });

    };

    return {
        city: city
    };


});