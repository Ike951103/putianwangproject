/**
 * Created by mei.zhang on 2016/10/26.
 * name: login status 及 获取购物车的数量 , 切换语言
 */
define('modules/start_up', function() {
    // login status
    var login_status = function(module){
        var status = 0;
        $.ajax({
            async: false,
            type : "GET",
            url : $('base').attr('href') + 'index.php?route=common/ajax/login_status&module='+module+'&s='+Math.random(),
            dataType : 'json',
            success : function(data) {
                if(data){
                    status = data['status'];
                    $("#login_status").html(data['text']);
                }
            }
        });
        return status;
    };

    // cart products num
    var cart_products = function(){
        /*$.ajax({
            type : "GET",
            url : $('base').attr('href') + 'index.php?route=common/ajax/cart_products&s='+Math.random(),
            dataType : 'html',
            success : function(data) {
                //$("#J_CartQuantity").html(data);  //这里好后期在修改，拿到具体的class名就可以了
            }
        });*/
    };

    // 第一次进入网站
    var setting_city = function(){
        //$(".city-options").remove();	//移除头部的块
        $("body").append("<div id='setting-city'></div>");
        $.ajax({
            type: "GET",
            url: $('base').attr('href') + 'index.php?route=product/city/city_pop&s=' + Math.random(),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#setting-city").html(data);
                }
            }
        });
    };



    //便捷搜索
    var quickAreaSearchFlag ;
    var quickAreaSearch = function(id){
        if(quickAreaSearchFlag!=null)  clearTimeout(quickAreaSearchFlag);
        quickAreaSearchFlag = setTimeout(function(){
            var areaFlag = $.trim($(id).val()); //id为输入框的id名
            $.ajax({
                type : "GET",
                url : $('base').attr('href') + 'index.php?route=product/city/ajax_quickCitySearch&s='+Math.random(),
                data: '&tag='+encodeURI(areaFlag),
                dataType : 'html',
                success : function(data) {
                    if(data){
                        $(".city-options li").each(function(){
                            if($(this).index()!=1&&$(this).index()!=0&& $(this).attr("class")!='hotcitys'){  //第一个搜索框和热门城市不需要刷新
                                $(this).remove();
                            }
                        });
                        $(".city-options").append(data);
                    }
                }
            });
        },300);
    };

    //三级菜单
    var Init = function(){
        var timerShow, timerHide,$homelist = $('.J_home-menu'),
            $menu = null,
            timer1 = null,
            timer2 = null,
            timer3 = null,
            interval = 200,
            index ;
        //复制分类
        $(function(){
            var $mc = $('#J_MainCate'),
                $sc = $('#J_SubCate'),
                $a = $mc.children('a').clone(),
                $list = $mc.children('.J_twoList').clone(),
                $nav = $mc.children('.J_NavDetail751').clone();
            $list.css({display: 'none'}).removeClass('J_home-menu');
            $nav.css({display: 'none'});
            $sc.append($a);
            $sc.append($list);
            $sc.append($nav);
        });
        //一级菜单事件监听
        $(document).on('mouseover mouseout', '.J_AllAategroy', function(e){
            $menu = $(this).find('.J_twoList');
            //清楚定时事件
            clearTimeout(timer1);
            if(e.type == 'mouseover'){
                timer1 = setTimeout(function(){
                    $menu.css({display: 'block' });
                }, interval);
            }else{
                timer1 = setTimeout(function(){
                    $menu.css({display: 'none' });
                    $('.J_NavDetail751').css({display: 'none' });
                }, interval);
            }
        });

        //二级菜单事件监听
        $(document).on('mouseover mouseout', '.J_twoList li', function(e){
            index = $(this).index();
            var $detail = $(this).parents('.J_AllAategroy').find('.J_NavDetail751');
            //清楚定时事件
            clearTimeout(timer2);
            clearTimeout(timer3);
            if(e.type == 'mouseover'){
                timer2 = setTimeout(function(){
                    $detail.css({display: 'block' });
                    $detail.find('.item-sub751').css({display: 'none' }).eq(index).css({display: 'block' });
                }, interval);
            }else{
                timer2 = setTimeout(function(){
                    $detail.css({display: 'none' });
                    $detail.find('.item-sub751').eq(index).css({display: 'none' });
                }, interval);
            }

        });

        $(document).on('mouseover mouseout', '.J_NavDetail751', function(e){
            clearTimeout(timer1);
            clearTimeout(timer2);
        });
        /*$('.J_AllAategroy').hover(function(){
            clearTimeout(timerHide);
            timerShow = setTimeout(function(){
                $list.show();
            }, 200);
            var Leftmenuheight = $(this).find('.three-list915 li').size()*32;
            $('.J_NavDetail751').css('height',Leftmenuheight);
        },function(){
            clearTimeout(timerShow);
            timerHide = setTimeout(function(){
                $list.hide();
            },200);
        });*/

        /*$list.hover(function(){
            clearTimeout(timerHide);
            timerShow = setTimeout(function(){
                $list.show();
            }, 200);
        },function(){
            clearTimeout(timerShow);
            timerHide = setTimeout(function(){
                $list.hide();
                $('.J_NavDetail751').hide();
            }, 200);
        }).children('li').hover(function(){
            $(this).find('i').removeClass('icon-right-white').addClass('icon-right-green').end().siblings('li').find('i').removeClass('icon-right-green').addClass('icon-right-white');
            $(this).find('a').css('color','#009c4c').end().siblings('li').find('a').css('color','#333');
            $(this).parents('.J_threeList').siblings('.J_NavDetail751').show();
            $(this).parents('.J_threeList').siblings('.J_NavDetail751').find('.item-sub751').eq($(this).index()).show().siblings('.item-sub751').hide();
        });
        $('.J_NavDetail751').hover(function(){
            clearTimeout(timerHide);
            timerShow = setTimeout(function(){
                $('.J_NavDetail751').show();
            },200);
        },function(){
            clearTimeout(timerShow);
            timerHide = setTimeout(function(){
                $list.hide();
                $('.J_NavDetail751').hide();
            }, 200);
            $('.J_threeList li').find('i').removeClass('icon-right-green').addClass('icon-right-white');
            $('.J_threeList li').find('a').css('color','#333');
        });*/


        /*$homelist.hover(function(){
            clearTimeout(timerHide);
            timerShow = setTimeout(function(){
                $homelist.show();
            }, 200);
        },function(){
            clearTimeout(timerShow);
            timerHide = setTimeout(function(){
                //$homelist.hide();
                $('.J_NavDetail751').hide();
            }, 200);
        }).children('li').hover(function(){
            $(this).find('i').removeClass('icon-right-white').addClass('icon-right-green').end().siblings('li').find('i').removeClass('icon-right-green').addClass('icon-right-white');
            $(this).find('a').css('color','#009c4c').end().siblings('li').find('a').css('color','#333');
            $(this).parents('.J_home-menu').siblings('.J_NavDetail751').show();
            $(this).parents('.J_home-menu').siblings('.J_NavDetail751').find('.item-sub751').eq($(this).index()).show().siblings('.item-sub751').hide();
        });
        $('.J_NavDetail751').hover(function(){
            clearTimeout(timerHide);
            timerShow = setTimeout(function(){
                $('.J_NavDetail751').show();
            },200);
        },function(){
            clearTimeout(timerShow);
            timerHide = setTimeout(function(){
                //$homelist.hide();
                $('.J_NavDetail751').hide();
            }, 200);
            $('.J_home-menu li').find('i').removeClass('icon-right-green').addClass('icon-right-white');
            $('.J_home-menu li').find('a').css('color','#333');
        });*/


        //关注甫田
        $('.share-fields-party915 a').hover(function(){
            if($(this).hasClass('wx-QR915')){
                $(this).parents('.share-fields-party915').siblings('.weixin').show();
            } else {
                $(this).parents('.share-fields-party915').siblings('.weixin').hide();
            }
        });

    };



    return {
        cart_products : cart_products,
        login_status : login_status,
        quickAreaSearch :quickAreaSearch,
        Init : Init,
        setting_city :setting_city
    }
});