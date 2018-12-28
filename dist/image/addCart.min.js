/**
 * Created by xiangran.kong on 16/10/18.
 */
define('modules/addCart', ['jquery', 'plugins/unit/unit', 'modules/tips'],function($, unit, tips){
    var addCart = unit.getClass('J_AddCart'),
        addCartAjax = function(ele, product_id, quantity, callback){
            //加入购物车的ajax
            if (ele.disabled) {
                return false;
            }
            $.ajax({
                url: $('base').attr('href') + 'index.php?route=cart/shopping/add',
                type: 'post',
                data: 'product_id=' + product_id + '&quantity=' + quantity,
                dataType: 'json',
                beforeSend: function(){
                    ele.disabled = true;
                },
                success: function (json) {
                    if (json.status == 1) {
                        //try{_trackFields.eventType = 'mv',  _trackFields.actionType='addCart',_trackFields.send(); }catch (err){console.log(err);}
                        if(callback) {
                            callback();
                        }

                    } else {
                        //try{_trackFields.eventType = 'mv',  _trackFields.actionType='addCartErr', _trackFields.errmsg=json['msg'], _trackFields.send(); }catch (err){console.log(err);}
                        if(json.product_type == 'turkey'){
                            tips.init({
                                message : (json['msg'] || 'no data'), // 内容
                                buttons: {
                                    sure:{
                                        'msg': languages.sure,
                                        'class': 'm-btn-main',
                                        'action':function(){
                                            window.open("./index.php?route=justrecord/turkey/productInfo&lang="+languages.lang,"_blank");
                                        }
                                    }

                                }
                            });
                        }else{
                            tips.init({
                                message : (json['msg'] || 'no data'), // 内容
                                buttons: {
                                    sure:{
                                        'msg': languages.sure,
                                        'class': 'm-btn-main'
                                    }

                                }
                            });
                        }
                    }
                    ele.disabled = false;
                }
            });
        };

    return function(callback, page){
        $(document).on('click', '.J_AddCart', function(e){
            var target = e.target || e.srcElement,
                productId = unit.attr(target, 'data-product-id'),
                productName = unit.attr(target, 'data-product-name'),
                productPrice = unit.attr(target, 'data-product-price'),
                quantity = unit.getId('J_NowNumber') ? unit.getId('J_NowNumber').value : 1;

            if(page != 'shopcart'){
                var $parent = $(target).parents('.m-card'),
                    $pic = $parent.find('.m-card-pic'),
                    $cart = $('.J_SearchContainer').find('.icon-cart');

                if(page == 'detail'){
                    $pic = $('#J_DetailPic').find('img').eq(0);
                }

                var picClone = $pic.clone(),
                    nStartX = $pic.offset().left,
                    nStartY = $pic.offset().top,
                    nEndY = $cart.offset().top,
                    nEndX = $cart.offset().left;

                picClone.css({left: nStartX+'px', top: nStartY+'px', width: $pic.width()+'px', height: $pic.height()+'px'}).addClass('m-card-animate');
                $('body').append(picClone);

                picClone.animate({left: nEndX-21+'px', top: nEndY+30+'px', height: '50px', width: '50px'}, 400, function(){
                    picClone.animate({left: nEndX+10+'px', top: nEndY-2+'px', height: '5px', width: '5px'}, 250, function(){
                        picClone.remove();
                    });
                });
                //ga
                try{
                    var pos, href = location.href;
                    if(href.indexOf('category_label')>0){
                        pos = 'category label';
                    }else if(href.indexOf('list-')>0){
                        pos = 'product list';
                    }else if(href.indexOf('item-')>0){
                        pos = 'product detail';
                    }else if(href.indexOf('information')>0){
                        pos = 'information';
                    }else if(href.indexOf('points') > 0){
                        pos = 'vip';
                    }else if(href.indexOf('recipe')>0){
                        pos = 'recipe';
                    }else if(href.indexOf('wishlist')>0){
                        pos = 'wishlist';
                    }else{
                        pos = 'home';
                    }
                    ga_add_cart(productId, productName, quantity, productPrice, pos);
                }catch (e){}
            }

            addCartAjax(target, productId, quantity, callback);
        });
    };
});