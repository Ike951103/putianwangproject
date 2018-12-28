/**
 * Created by xiangran.kong on 16/10/22.
 */
define('modules/refreshMiniCart', function(unit){
    /**
     * 希望接口能修改，返回数据
     * **/

    return function(args){
        //刷新购物车数量
        $.ajax({
            type: "GET",
            url: 'index.php?route=cart/shopping/product_list_mini&s=' + Math.random(),
            dataType: 'json',
            success: function (data) {
                if (data.status == '1') {
                    $(".J_cart-product915").html(data.list);
                }
            }
        });

        /**刷新购物车总数**/
        $.ajax({
            type: "GET",
            url: 'index.php?route=cart/shopping/total_quantity&s=' + Math.random(),
            dataType: 'html',
            success: function (data) {
                $("#J_CartQuantity").html(data);
            }
        });
    };
});