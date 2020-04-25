/**
 * 动画函数
 * @param {Object} obj 当前对象
 * @param {Object} attr 当前元素对象的属性
 * @param {Object} end 末尾位置
 * @param {Object} fn 回调函数
 * */
function startAnimation(obj,attr,end,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let cur = 0,speed = 0;
        if(attr === 'opacity'){
            cur = Math.round(parseFloat(getStyle(obj,attr)) * 100); 
            // console.log(getStyle(obj,attr));
        }else{
            cur = parseInt(getStyle(obj,attr));
        }
        if(end === cur){
            clearInterval(obj.timer);
            // 回调函数放在动画执行结束之后
            if(fn){
                fn();
            }
            return;
        }
        // 运动
        speed = end > cur ? 10:-10;
        if(attr === 'opacity'){
            // console.log(cur + speed);
            obj.style[attr] = (cur + speed) / 100;
            obj.style['filter'] = `alpha(opacity:${cur + speed})`;
        }else{
            obj.style[attr] = cur + speed + 'px';
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