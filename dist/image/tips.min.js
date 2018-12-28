/**
 * Created by zhiyuan.liu on 16/9/20.
 */
/**
 * 信息提示框
 * @param  {[Object]} 配置
 * @return {[type]}
 * options示例：
 * {
 *      'title': '删除确认框', // 信息提示
 *      'message': '确认删除这条商品吗?', // 内容
 *      'buttons': {
 *          'yes': { // yes将会显示在按钮上
 *              'class': '', // 按钮的class，用于区别不同样式的btn
 *              'action': function(){ // 点击yes后的回调函数
 *                   console.log('您点击了是');
 *               }
 *           },
 *           'no': {
 *               'class': 'red',
 *               'action': function(){
 *                   console.log('您点击了否');
 *               }
 *           }
 *       }
 *  }
 */
define('modules/tips', function(){

    var init = function(opt){
        if($('.m-confirm').length){
            return false;
        }

        var btnHtml = '';

        for( var i in opt.buttons ){
            btnHtml += '<button class=" ' + opt.buttons[i]['class'] + '">' + opt.buttons[i].msg + '</button>';
            if (!opt.buttons[i].action) {
                opt.buttons[i].action = function() {};
            }
        }
        /*$.each(opt.buttons, function(name, obj) {

        });*/

        var maskHtml = '<div class="m-mask-overlay"><div class="m-confirm"><h2>' + (opt.title || '') + '</h2><p>' + opt.message + '</p><div class="m-confirm-btn">' + btnHtml + '</div></div></div>';
        $(maskHtml).appendTo('body');

        var buttons = $('.m-confirm-btn button'),
            i = 0;

        $.each(opt.buttons, function(name, obj) {
            buttons.eq(i++).click(function() {
                hideMask();
                obj.action();
                return false;
            });
        });

        /**
         * 隐藏遮罩
         * @return {[type]} [description]
         */
        function hideMask(){
            $('.m-mask-overlay').remove();
        }
    };

	Window.tipInit = init;
    return {
        init: init
    }
});
