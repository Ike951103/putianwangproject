/**
 * Created by xiangran.kong on 16/10/18.
 */
define('modules/fav',['plugins/jquery/jquery-1.11.0', 'plugins/unit/unit', 'modules/tips'],function( $, unit, tips){
    $('.J_Favorite').on('click', function(event){
        var target = event.target || window.event.srcElement,
            productId = unit.attr(target, 'data-product-id');

        $.ajax({
            url: 'index.php?route=account/wishlist/update',
            type: 'POST',
            data: 'product_id=' + productId,
            success: function (json) {
                var data = JSON.parse(json);
                if (data.status == '2') {
                    //没有登录，跳到登录页面
                    location.assign('/index.php?route=account/login&lang=zh');
                } else if (data.status == '1') {
                    if (data.type == 1) {
                        try{ ga('send','event','Add Favourite', 'click'); }catch (err){ }
                        unit.addClass(target, 'icon-fav-on');
                    } else {
                        try{ ga('send','event','Remove Favourite', 'click'); }catch (err){ }
                        unit.removeClass(target, 'icon-fav-on');
                    }
                }
            }
        });
    });
});