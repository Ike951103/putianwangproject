/**
 * Created by xiangran.kong on 16/10/18.
 */
define('plugins/unit/unit', function(){
    var PublicMethod = function (){};
    PublicMethod.prototype = {
        hasClass : function(ele, name){
            var classStr = this.attr(ele, 'class'), classArray, isExist=false;
            if(!!classStr){
                classArray = classStr.split(' ');
                for( var i=0; i<classArray.length; i++ ){
                    if(classArray[i] == name){
                        isExist = true;
                    }
                }
            }
            return isExist;
        },
        /**
         * 获取DOM对象
         * 通过id 来获取DOM元素
         * @param id string类型，返回DOM对象
         * */
        getId: function(id){
            return typeof(id) === 'string' ? document.getElementById(id) : id;
        },
        /**
         * 获取DOM对象
         * 通过 className 来获取DOM元素
         * @param className string 类型，返回DOM对象
         * @param parentNode object 类型，要查找Dom元素的父级元素，用于筛选，可选
         * */
        getClass : function(className, parentNode){
            if(typeof(className)!=='string'){
                console.error('传入的值类型不是字符串！请检查传入的值');
                return false;
            }

            var parents = parentNode || document,
                eleArray = [],
                eleList;

            if(document.getElementsByClassName){
                eleList = parents.getElementsByClassName(className);
                for(var i =0; i<eleList.length; i++){
                    eleArray.push(eleList[i]);
                }
            }else {
                eleList = parents.getElementsByTagName('*');
                for(var j=0; j<eleList.length; j++){
                    if(this.hasClass(eleList[i], className)){
                        eleArray.push(eleList[i]);
                    }
                }
            }
            return eleArray;
        },
        /**
         * 事件绑定
         * addListener function,增加事件监听
         * @param ele  DOM元素，需要绑定的元素
         * @param type  string,事件类型
         * @param handle  fun类型 元素绑定执行的函数
         **/
        addListener : function (ele, type, handle){
            if(ele.addEventListener){
                ele.addEventListener(type, handle, false);
            }else if(ele.attachEvent){
                ele.attachEvent('on'+type, handle);
            }else{
                ele['on'+type] = handle;
            }
        },
        /**
         * 移除事件绑定
         * removeListener function,移除事件绑定
         * @param ele  DOM元素，需要移除绑定的元素
         * @param type  string,移除事件类型
         * @param handle  fun类型 元素移除；执行的函数
         * **/
        removeListener : function(ele, type, handle){
            if(ele.remvoeEventListener){
                ele.remvoeEventListener(type, handle, false);
            }else if(ele.detachEvent){
                ele.detachEvent('on'+type, handle);
            }else{
                ele['on'+type] = handle;
            }
        },
        /**
         * 遍历数组
         * @param list Array 类型，要遍历的数组
         * @param fn Function 类型，回调函数
         * **/
        each: function (list, fn){
            if(! list instanceof  Array){
                console.error('输入类型不是数组！');
                return false;
            }
            if(!!Array.prototype.forEach){
                list.forEach(function(item, index){
                    fn(item);
                });
            }else {
                for(var i=0; i<list.length; i++){
                    fn(item);
                }
            }
        },
        /**
         * 增加className
         * @param ele Object类型，必填，要操作的DOM对象
         * @param className String 类型，必填，要添加的class名称
         * **/
        addClass: function(ele, className){
            var classNameString = this.attr(ele, 'class'),
                classNameArray = [];
            if(!!classNameString){
                classNameArray = classNameString.split(' ');
                if(classNameArray.indexOf(className)>=0){
                    return false;
                }else {
                    classNameArray.push(className);
                    this.attr(ele, 'class', classNameArray.join(' '));
                    return classNameArray;
                }
            }else {
                return false;
            }
        },
        /**
         * 删除className
         * @param ele Object类型，必填，要操作的DOM对象
         * @param className String 类型，必填，要删除的class名称
         * **/
        removeClass: function(ele, className){
            var classNameString = this.attr(ele, 'class'),
                classNameArray = [],
                index;
            if(!!classNameString){
                classNameArray = classNameString.split(' '),
                    index = classNameArray.indexOf(className);
                if(index>=0){
                    var delName = classNameArray.splice(index, 1);
                    this.attr(ele, 'class', classNameArray.join(' '));
                    return delName;
                }else {
                    return false;
                }
            }else {
                return false;
            }
        },
        /**
         * 修改属性，不填属性值默认为获取属性
         * @param ele   必填，Object类型，要获取Dom元素
         * @param name  必填，String 类型，需要获取或者设置的属性名
         * @param value 可选，String 类型，需要设置的属性值
         * **/
        attr : function (ele, name, value){
            if(!!value && (typeof value == 'string')){
                ele.setAttribute(name, value);
            }else {
                if(ele){
                    return ele.getAttribute(name);
                }
            }
        },
        /**
         * 给DOM元素加样式
         * @param dom  Object对象，必填，要添加样式的DOM元素
         * @param json  Object对象，必填，样式组成的json值
         * **/
        css : function(dom, json){
            if(dom){
                for(var i in json){
                    dom.style[i] = json[i];
                }
            }
        },
        /**
         * 过滤后代元素,返回一个数组或DOM对象
         * @param currentNode Object对象，必填，当前的DOM节点
         * @param childName String 对象，必填，子节点的名称，可以为id,class,tag
         * **/
        find: function(currentNode, childName){
            if(currentNode){
                var nodes = null;
                if(/^\#/.test(childName)){
                    //当childName为id的时候
                    childName = childName.slice(1, childName.length);
                    return this.getId(parentName);
                }else if(/^\./.test(childName)){
                    //当child为class的时候
                    childName = childName.slice(1, childName.length);
                    var classArray = [];
                    if(currentNode.getElementsByClassName){
                        nodes = currentNode.getElementsByClassName(childName);
                        for(var i=0; i<nodes.length; i++){
                            classArray.push(nodes[i]);
                        }
                    }else {
                        nodes = currentNode.getElementsByTagName('*');
                        for(var j=0; j<nodes.length; j++){
                            var nameArray = nodes[j].className.split(' ');
                            for(var n=0; n<nameArray.length; n++){
                                if(nameArray[n] == childName){
                                    return nodes[j];
                                }
                            }
                        }
                    }
                    return classArray;
                }else if(/^[A-Za-z]/.test(childName)){
                    //当childName为tag的时候
                    var tagArray = [];
                    nodes = currentNode.getElementsByTagName('*');
                    for(var k=0; k<nodes.length; k++){
                        if(nodes[k].tagName == childName.toUpperCase()){
                            tagArray.push(nodes[k]);
                        }
                    }
                    return tagArray;
                }else {
                    return [];
                }
            }
        },

        /**
         * 向上查找父级元素。只查找一个匹配元素后返回
         * @param currentNode  Object对象，必填，当前的DOM节点
         * @param parentName String 对象，必填，要查找父节点的名称，可以为id,class
         * **/
        parents: function(currentNode, parentName){
            if(currentNode){
                if(/^\#/.test(parentName)){
                    parentName = parentName.slice(1, parentName.length);
                    return this.getId(parentName);
                }else if(/^\./.test(parentName)){
                    parentName = parentName.slice(1, parentName.length);

                    var findUp = function(ele, name){
                        if(ele.tagName == 'BODY'){
                            return false;
                        }
                        var classNameArray = ele.className.split(' '),
                            isExist = false;
                        for(var m=0; m<classNameArray.length; m++){
                            if(classNameArray[m] == name){
                                isExist = true;
                                break;
                            }
                        }

                        if(isExist){   //console.log('exist');
                            return ele;
                        }else {
                            return findUp(ele.parentNode, name);
                        }
                    };
                    return findUp(currentNode, parentName);
                }else {
                    return false;
                }
            }
        },
        /**
         * 查找所有同辈元素,返回一个数组或DOM对象
         * @param currentNode Object对象，必填，当前的DOM节点
         * @param siblingsName String 对象，必填，要查找同辈节点的名称，可以为id，class，tag
         * **/
        siblings: function(currentNode, siblingsName){
            if(currentNode){
                var siblings = [],
                    filter = function(node, name, pos, type ){
                        if(!!node){
                            if(node.nodeType == 1){
                                if(type == 'tag'){
                                    if(node.nodeName == name.toUpperCase()){
                                        siblings.push(node);
                                    }
                                }else {
                                    var nameArray = node.className.split(' ');
                                    for(var x=0; x<nameArray.length; x++){
                                        if(nameArray[x] == name){
                                            siblings.push(node);
                                        }
                                    }
                                }
                            }
                            if(pos == 'prev'){
                                filter(node.previousSibling, name, 'prev', type);
                            }else {
                                filter(node.nextSibling, name, 'next', type);
                            }
                        }else {
                            return ;
                        }
                    };
                if(/^\#/.test(siblingsName)){
                    siblingsName = siblingsName.slice(1, siblingsName.length);
                    return this.getId(parentName);
                }else {
                    var prevNodes = currentNode.previousSibling,
                        nextNode = currentNode.nextSibling;
                    if (/^\./.test(siblingsName)) {
                        siblingsName = siblingsName.slice(1, siblingsName.length);
                        filter(prevNodes, siblingsName, 'prev', 'class');
                        filter(nextNode, siblingsName, 'next', 'class');
                    } else if (/^[A-Za-z]/.test(siblingsName)) {
                        filter(prevNodes, siblingsName, 'prev', 'tag');
                        filter(nextNode, siblingsName, 'next', 'tag');
                    }
                    return siblings;
                }
            }
        },
        /**
         * 操作Cookie
         *  setCookie function,设置cookie
         * @param name  string，cookie名称
         * @param val  string,cookie中要存放的字符串
         * @param day  number类型 元素绑定执行的函数
         * @param domain  String 类型 域名
         * **/
        setCookie : function(name, val, day, domain){
            var days = day || 30, exp = new Date();
            exp.setTime(exp.getTime() + days*24*60*60*1000);
            document.cookie = name + "="+ encodeURI(val) + ";expires=" + exp.toGMTString()+";path=/"+domain ? ';domain='+domain:'' ;
        },
        /**
         * 操作Cookie
         * getCookie function,获取指定cookie
         * @param name  string，cookie名称
         * **/
        getCookie : function(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)) {
                return encodeURI(arr[2]);
            } else {
                return null;
            }
        },
        /**
         * 操作Cookie
         * delCookie function,删除指定cookie
         * @param name  fun类型 元素移除；执行的函数
         * **/
        delCookie : function(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=getCookie(name);
            if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
        },
        /**
         * 异步AJAX
         * @param opts 传入的参数
         *      url 必填，string,ajax的URL
         *      method 选填,String， ajax请求类型，GET或POST
         *      data : 如果method为POST时，为必填项，object,post所传数据
         *      isAsynv: 可选，boolean，是否异步传输
         *      success: 可选,成功时调用的函数
         *      error: 可选,失败时调用的函数
         * **/
        ajax : function(opts){
            var options = {
                    url: opts.url,
                    method: opts.method || 'POST',
                    data: opts.data,
                    isAsync: opts.isAsync || true
                },xhr;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            if(options.method == 'GET'){
                xhr.open(options.method, options.url, options.isAsync);
                xhr.send();
            }else {
                xhr.open(options.method, options.url, options.isAsync);
                xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
                xhr.send(options.data);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    opts.success('success');
                }else if(xhr.status == 404){
                    opts.error('error');
                }
            }
        }
    };
    var privateMethod = function (){};
    privateMethod.prototype = new PublicMethod();

    var p = new privateMethod();
    return PublicMethod.prototype;
});