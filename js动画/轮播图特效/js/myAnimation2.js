/**
 * 动画函数
 * @param {Object} obj 当前对象
 * @param {Object} json 当前元素属性列表
 * @param {Object} fn 回调函数
 * */
function startAnimation(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let cur = 0,speed = 0;  
        let flag = true; // flag:代表所有动画执行完毕

        // 将json中所有元素属性遍历，修改
        for(attr in json){
            let end = json[attr];

            // 获取对象属性值
            switch(attr){
                case "opacity":
                    cur = Math.round(parseFloat(getStyle(obj,attr)) * 100);
                    break;
                case "scrollTop":
                    cur = obj[attr];
                    break;
                default:
                    cur = parseInt(getStyle(obj,attr));
            }

            // 临界处理 该动画没有执行完毕
            if(end !== cur){
                flag = false;
            }else{
                continue;
            }
            // console.log(cur);
            // 原代码
            // speed = end > cur ? 10:-10;
            // 设置速度：判断结束值end和当前值cur相差值小于speed速度
            
            if(end > cur){ 
                // end=100 cur=92   speed=10
                speed = Math.ceil((end - cur)/20);  // 缓动动画
                speed = end - cur < 10?end - cur:10;
            }else{
                // end=0 cur=2 speed=-10
                speed = Math.floor((end - cur)/20);
                speed = end - cur > -10?end - cur:-10;
            }

            // 设置值
            switch(attr){
                case "opacity":
                    obj.style[attr] = (cur + speed) / 100;
                    obj.style['filter'] = `alpha(opacity:${cur + speed})`;
                    break;
                case "scrollTop":
                    obj[attr] = cur + speed;
                    break;
                default:
                    obj.style[attr] = cur + speed + 'px';
            }
        }
        // 查看flag是否为true，  都当所有属性都没有被修改时，flag为true，结束动画
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
            return ;
        }
    },30)
}
// 获取属性
function getStyle(obj,attr) { 
    if(obj.currentStyle){
        // 针对IE浏览器
        return obj.currentStyle[attr];
    }else{
        // 针对于Firefox浏览器
        return getComputedStyle(obj,null)[attr];
    }
}