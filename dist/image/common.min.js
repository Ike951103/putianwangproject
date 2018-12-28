/**
 * Created by xiangran.kong on 16/10/30.
 */

define('common', ['jquery', 'plugins/unit/unit' , 'modules/refreshMiniCart', 'modules/addCart', 'modules/fav', 'modules/city', 'modules/cartHeader' ], function($, unit, refreshMiniCart, addCart, fav, City, cartHeader){
    /*** 原temp_zm ***/
    //地址选择
    City.city({
        citya:'#J_currentCity915 a',
        subcity: '.J_subCity915'
    });
    cartHeader();

    //加入购物车
    var uri = location.href;
    if(uri.indexOf('checkout/shopcart')>-1 || uri.indexOf('shopcart.html')>-1){
        //先判断是否是购物车
        addCart(function(){
            var url = $('base').attr('href') + 'index.php?route=cart/shopping/product_list&s=' + Math.random();
            $.loading(true);
            $.getJSON(url, function (data) {
                //Object {status: "1"}
                $('#shopcart').html(data.list);
                $('#shopcart-total').html(data.total);
                $('#free-gift').html(data.five_hundred);
                $.loading(false);
            });
            $('html,body').animate({scrollTop: $('.J_ProductItem').offset().top}, 400);
        }, 'shopcart');
    }else if(uri.indexOf('product/product')>-1 || /item-\d+/.test(uri)){
        //产品详情页加入购物车
        addCart(refreshMiniCart, 'detail');
    }else {
        addCart(refreshMiniCart);
    }

    /*** 原temp_zm ***/


    //进页面时先刷新下购物车
    if(!/checkout\//.test(location.href)){
        refreshMiniCart();
    }

    /*//加入购物车，之后刷新mini购物车
    if(!/checkout\//.test(location.href)){
        addCart(refreshMiniCart);
    }*/

    //loading
    $.loading = function (bool){
        var $loading = $('#J_Loading'),
            $body = $('body');
        if(bool){
            $loading.show();
        }else {
            $loading.hide();
        }
    };

	/**等网站全部加载完后，加载背景图**/
	function getCookie(name) {
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}
   var lang =  getCookie('language');
    window.onload = function (){
        var myDate = Date.parse(new Date());   //Date.parse('2017-12-1 00:00:00')
		// https://image01.fieldschina.com/article_image/background/New_background20170221.jpg?x-oss-process=image/quality,Q_80
		//https://image01.fieldschina.com/article_image/background/New_background20170221.jpg
        if(myDate < 1541001600000){
            $('body').css({'background': 'url(\'https://fieldsimage.oss-cn-hangzhou.aliyuncs.com/article_image/logo/bage20181031.jpg?x-oss-process=image/quality,Q_80\') no-repeat fixed','background-size':'cover'});

        }else{
            if( lang == 'zh_CN'){
                $('body').css({'background': 'url(\'https://fieldsimage.oss-cn-hangzhou.aliyuncs.com/product/201812/1544798477133777.jpg?x-oss-process=image/quality,Q_80\') no-repeat fixed 50% 0%'});
            }else{
                $('body').css({'background': 'url(\'https://image01.fieldschina.com/article_image/background/New_background20170221.jpg?x-oss-process=image/quality,Q_80\') no-repeat fixed 50% 0%'});
            }
        }
		
    };
	

    return $;
});
