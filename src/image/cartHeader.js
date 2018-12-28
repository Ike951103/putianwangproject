/**
 *
 * 首页购物车模块
 * @param  {[string]}
 * @return {[Object]}
 *
 */

define('modules/cartHeader', ['modules/refreshMiniCart'], function(refreshMiniCart){
    var cart = function (obj){
        //判断是否有小购物车
        if(!document.getElementById('J_CartQuantity')){
            return false;
        }
        //购物车
        var $sum = 0;
        var timer ;
        $('.J_search-cart915').hover(function(){
            var $that = $(this);
            clearTimeout(timer);
            timer = setTimeout(function() {
                $that.find('.J_cart-product915').show();
            },500);

        },function(){
            var $that = $(this);
            clearTimeout(timer);
            timer = setTimeout(function(){
                $that.find('.J_cart-product915').hide();
            }, 300);
        });

        $('.J_SearchContainer').click(function(){
            //location.assign($('base').attr('href') + 'index.php?route=checkout/shopcart&lang=zh');
        });

        //删除商品
        $(document).on('click', '.J_delete', function(e){
            e.preventDefault();
            var $that = $(this);
            cartnum($that.attr('data-product-id'));
        });

        //求商品的总件数和商品的总价
        function cartnum(product_id){
            product_id = parseInt(product_id);
            if (product_id) {
                url = $('base').attr('href')  + 'index.php?route=cart/shopping/remove&product_id=' + product_id;
                $.getJSON(url, function (data) {
                    if (data.status == '1') {
                        refreshMiniCart();
                    }
                });
            }
        }


    };

    return cart;


});