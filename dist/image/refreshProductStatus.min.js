/**
 * Created by mei.zhang on 2017/1/5.
 * 异步刷新商品提示信息（暂无现货和扶手商品）和购物车状态
 */
define('modules/refreshProductStatus',['jquery'], function($){
       //异步刷新商品和状态
      var ajax_refresh_product =  function(product_ids) {
           if (product_ids.length == 0) {
               return false;
           }
           var product_ids_str = product_ids.join(',');
           $.ajax({
               type: 'POST',
               url: $('base').attr('href') + 'index.php?route=common/ajax/products&s=' + Math.random(),
               data: "product_ids=" + product_ids_str,
               dataType: 'json',
               success: function (data) {
                    var language_id = data.language_id;
                   $.each(data.rows, function (key, product_info) {
                       var $product_container = $('.product-container-' + key);

                       // 更新提示信息
                       var $p_notice = $product_container.find('.product-icon915');
                       if ($p_notice.length > 0) {
                           if (product_info['issale'] == 0) {
                               if (product_info['status'] == 2) {
                                  var areaSrc= language_id;
                                   // var areaSrc='catalog/view/theme/newest/img/productIcon/areastock-'+language_id+'.png';
                                   $p_notice.attr('src',areaSrc);
                               } else {
                                   // PC的information页面不显示暂无现货标签 mei.zhang 2018-4-8 10:37:12
                                   //var outSrc='catalog/view/theme/newest/img/productIcon/outstock-'+language_id+'.png';
                                   //$p_notice.attr('src',outSrc);
                               }
                           }
                           if (product_info['issale'] == 1 && $p_notice.attr('data-notice-type') == 'stock') {
                               $p_notice.remove();
                           }
                       } else {
                           if (product_info['issale'] == 0) {
                               var stock;
                               if(product_info["status"] == 2){
                                   // stock = "areastock-"+language_id;
                                   // var SRC= "catalog/view/theme/newest/img/productIcon/"+stock+".png";
                                   var SRC = language_id;
                                   var img = $('<img src="" class="product-icon915"/>');
                                   $product_container.find('.m-card-pic').append(img);
                                   $product_container.find('.m-card-pic .product-icon915').attr('src',SRC);
                               } else {
                                   // stock = "outstock-"+language_id;
                               }
                           }
                       }

                       // 更新购物车按钮
                       var $p_add_btn = $product_container.find('.J_selectCart');
                       if (product_info['issale'] == 0 ) {
                           if(product_info["status"] == 2){
                               $p_add_btn.removeClass('J_AddCart icon-cart-mid').addClass('icon-cart-mid-gery');
                           }else{
                               var sy = languages.styleStatus?'none':'';
                               var span = $('<span class="J_ArrivalBtn '+sy+'" data-product-id="'+key+'" style="padding:8px 5px;font-size:12px;color:#fff;background: #009c4c;position: absolute;bottom:-5px;right:0;cursor: pointer;">'+languages.arrivalTips+'</span>');
                               $p_add_btn.parent('.m-card-price').append(span);
                               $p_add_btn.remove();
                           }
                       } else {
                           $p_add_btn.removeClass('icon-cart-mid-gery').addClass('J_AddCart icon-cart-mid');
                       }

                   });
               }
           });
       };

      return {
          ajax_refresh_product:ajax_refresh_product
      }



});