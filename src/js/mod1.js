function cart(){
	var str = "购物车页";
// 		1. 获取cookie
// 		2. 转成对象
// 		3. 遍历对象
// 		4. 动态创建ul
// 		5. 获取所有的删除按钮-添加点击事件
// 			1.. 删除当前按钮所在的ul,并找出ul中的自定义id
// 			2.. delete cookieObj[id]
// 		6. 获取所有的减号按钮-添加点击事件
// 			1.. 找到当前按钮所在ul中自定义id
// 			2.. 在合适的条件中--cookieObj[id].num --;
// 			3.. 重新加入cookie
// 			4.. 数量文本框的值 = cookieObj[id].num
// 			5.. 小计中 = cookieObj[id].num * cookieObj[id].price
// 			
// 		7. 获取所有的加号按钮-添加点击事件
// 			1.. 找到当前按钮所在ul中自定义id
// 			2.. cookieObj[id].num ++
// 			3.. 重新加入cookie
// 			4.. 数量文本框的值 = cookieObj[id].num
// 			5.. 小计中 = cookieObj[id].num * cookieObj[id].price
// 		8. 获取所有的数量文本框-添加失焦事件
// 			1.. 找到当前文本框所在的ul中自定义id
// 			2.. cookieObj[id].num = 文本框中的值(必须是大于1的数字)
// 			3.. 重新加入cookie
// 			4.. 数量文本框的值 = cookieObj[id].num
// 			5.. 小计中 = cookieObj[id].num * cookieObj[id].price
// 	`;
	return str;
}
console.log(cart());