/**
 * Created by mei.zhang on 2016/10/21.
 * 页面头部的搜索js
 *
 *
 */
define('modules/searchList',['jquery','jqueryui'],function($, autocomplete){
    //搜索框自动完成
       var search_sug = function(obj) {
            var demo_cate = {};
           //ga
           try{
               ga('send', 'event', 'Search', 'click',  $('#search_input').val());
           }catch (e){}
            $("#search_input").autocomplete({
                source: function (request, response) {
                    obj.search_sug_url=='' && (obj.search_sug_url="index.php?route=product/search/suggest");
                    $.ajax({
                        url: obj.search_sug_url,
                        type: 'GET',
                        data: {q: request.term},
                        success: function(data){
                            try {
                                data = JSON.parse(data);
                            }catch(e){
                                return false;
                            }
                            if (data) {
                                demo_cate.cate = data.search_cate;
                                if(data.keywords && data.keywords.length>0){
                                    response($.map(data.keywords, function (item) {
                                        //针对按照分类查询，正则表达式过滤出真正查询的内容
                                        var itemVal = item;
                                        var itemCategoryId = '';
                                        var matches = item.match(/<span.*?<div[^>]*?><p>(.*?)<\/p><b>(.*?)<\/b><\/div>/);
                                        if (matches) {
                                            itemVal = matches[1]
                                            itemCategoryId = matches[2]
                                        };
                                        return {label: item, value: itemVal, category_id: itemCategoryId}
                                    }));
                                }else{
                                    response({value: languages.emptyList });
                                }
                            }
                        }
                    });
                    /*$.getJSON(obj.search_sug_url, {q: request.term}, function (data) {
                        if (data) {
                            demo_cate.cate = data.search_cate;
                            if(data.keywords.length>0){
                                response($.map(data.keywords, function (item) {
                                    //针对按照分类查询，正则表达式过滤出真正查询的内容
                                    var itemVal = item;
                                    var itemCategoryId = '';
                                    var matches = item.match(/<span.*?<div[^>]*?><p>(.*?)<\/p><b>(.*?)<\/b><\/div>/);
                                    if (matches) {
                                        itemVal = matches[1]
                                        itemCategoryId = matches[2]
                                    };
                                    return {label: item, value: itemVal, category_id: itemCategoryId}
                                }));
                            }else{
                                response({value: languages.emptyList });
                            }
                        }
                    });*/
                },
                open:function(){
                    if(!demo_cate.cate){
                        demo_cate.cate={};
                    }
                    resetSearchList(demo_cate);
                },
                close:function(){
                    setTimeout(function(){
                        $(".zy-history").hide();
                    }, 200);
                },
                minLength: 1,
                select: function (event, ui) {
                    $(this).val(ui.item.value);
                    $("#search_frm").find("input[name='category_id']").val(ui.item.category_id);
                    $("#search_frm").submit();
                }
            })
            .focus(function (request, response) {
                if ($.trim($("#search_input").val()) != _defaultSearchVal) { //默认值聚焦的时候 不提示
                    $(this).autocomplete("search");
                }
            })
           .data("ui-Autocomplete")._renderItem = function (ul, item) {	//搜索框添加分类
                ul.attr('id', 'searchAutoList');
                var o = $(".search-form915").offset();
                $("<li></li>")
                    .data("ui-autocomplete-item", item) //item.autocomplete
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
                ul.css({"z-index": 999, "top": o.top + 35, left: o.left, display: 'block', width: "412px"});
                return ul;
            };
    };

    //在搜索下拉框中添加分类搜索
    function resetSearchList(demo_cate){
        return ;
        if(demo_cate.cate){
            var userInput = $.trim($("#search_input").val());
            var temp_str = '';
            temp_str = '<li class="ui-menu-item" role="presentation"><a class="ui-corner-all">' + userInput + '</a></li>';
            for (var i = 0; i < demo_cate.cate.length; i++) {
                temp_str += '<li class="ui-menu-item" role="presentation"><a class="ui-corner-all" href="index.php?route=product/search&search=' + userInput + '&searchCate=' + demo_cate.cate[i] + '">' + search_in1 +'<span>' + demo_cate.cate[i] + '</span>' + search_in2 + '</a></li>';
            }
            $(".zy-history").html(temp_str);
            $(".zy-history").css('display','block');
            var ulLeft = $(".zy-history").offset().left;
            $("#searchAutoList").css("left", ulLeft);

            var ulTop = $(".zy-history").height();
            ulTop = ulTop + Number($(".zy-history").offset().top) + 5.5;
            ulTop = ulTop + 'px';
            $("#searchAutoList").css({"top": ulTop,"width":"412px"});
        }else{
            $(".zy-history").hide();
        }
    }

    $(window).resize(function(){
        var ulLeft = $(".zy-history").offset().left;
        $("#searchAutoList").css("left", ulLeft);

        var ulTop = $(".zy-history").height();
        ulTop = ulTop + Number($(".zy-history").offset().top) + 5.5;
        ulTop = ulTop + 'px';
        $("#searchAutoList").css("top", ulTop);

    });


    $("#searchAutoList li a").mouseover(function(){
        //console.log($(this).html());
    });

    $("#search_input").keydown(function(event){
        if(event.keyCode == '40'){
            $("#searchAutoList li").attr("style", "background: '';");
            for(var num = 0; num< $("#searchAutoList li").length ;num++ ){
                if(num == 0){
                    $("#searchAutoList li").eq(0).attr("style", "background: #EFEFEF");
                }

                if( $("#searchAutoList li").eq(num).find("a").html() == $("#search_input").val() ){
                    $("#searchAutoList li").attr("style", "background: '';");
                    $("#searchAutoList li").eq(num+1).attr("style", "background: #EFEFEF");

                }
            }
        }else if(event.keyCode == '38'){
            //$("#searchAutoList li").eq($("#searchAutoList li").length).attr("style", "background: #CCC!important");
            for(var num = 0; num< $("#searchAutoList li").length ;num++ ){
                if(num == 1 ){
                    $("#searchAutoList li").eq($("#searchAutoList li").length -1).attr("style", "background: #EFEFEF");
                }

                if( $("#searchAutoList li").eq(num).find("a").html() == $("#search_input").val() ){
                    $("#searchAutoList li").attr("style", "background: '';");
                    $("#searchAutoList li").eq(num-1).attr("style", "background: #EFEFEF");

                }
            }
        }
    });

    //ga
    $('.m-search-hot').on('click', 'a', function(){
        try{
            var txt = $(this).text();
            ga('send', 'event', 'Search', 'click', txt);
        }catch (e){}
    });
    $('body').on('click', '#searchAutoList a', function(){
        try{
            var txt = $(this).text();
            ga('send', 'event', 'Search', 'click', txt);
        }catch (e){}
    });

    return {
        search_sug:search_sug
    }



});

