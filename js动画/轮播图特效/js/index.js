window.onload = function () {
    // 获取元素
    const slider = document.getElementById("slider");
    const slider_main = document.getElementById("slider_main");
    const slider_items = slider_main.children;
    
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");

    const slider_index = document.getElementById("slider_index");
    
    let iNode = 0;  //当前显示索引的坐标  
    // 动态创建索引
    [...slider_items].forEach((v,i)=>{
        let span = document.createElement("span");
        span.innerText = i+1;
        // 给索引添加类
        if(i === 0){
            span.className = "slider_index_icon current"
        }else{
            span.className = "slider_index_icon"
        }

        slider_index.appendChild(span);
    })
    // 让滚动元素归位
    let scroll_w = this.parseInt(getStyle(slider,'width'));
    // console.log(scroll_w);
    [...slider_items].forEach((item,i,arr)=>{
        if(i !== 0){
            item.style.left = scroll_w + "px";
        }
    });
    // 下一步按钮
    function autoPlay() { 
        // 1.将显示的图片向左移动
        startAnimation(slider_items[iNode],{
            "left":-scroll_w
        });
        // 将下一张图片放在中心盒子的右边
        iNode++;
        if(iNode >= slider_items.length){
            iNode = 0;
        }
        // console.log(slider_items[iNode].left);
        slider_items[iNode].style.left = scroll_w + "px";
        // console.log(slider_items[iNode].left);
        // 将下一张图片向左移动
        startAnimation(slider_items[iNode],{
            "left":0
        });
        
        updateIndex();
     }
    next.onclick = autoPlay;
    // 更新索引样式
    let slider_index_items = slider_index.children;
    function updateIndex() {
        // console.log(slider_index_items);
        [...slider_index_items].forEach((item,i)=>{
            if(i == iNode){
                item.className = "slider_index_icon current";
            }else{
                item.className = "slider_index_icon"
            }
        })
    }
    //  上一步按钮
    prev.onclick = function () {
        // 1.将该元素右移动
        startAnimation(slider_items[iNode],{
            "left":scroll_w
        })
        // 2.将上一个元素放在左边
        iNode--;
        if(iNode < 0){
            iNode += slider_items.length
        }
        slider_items[iNode].style.left = -scroll_w + "px";
        // 3.将上一个元素右移
        startAnimation(slider_items[iNode],{
            "left":0
        })
        // 更新下面索引
        updateIndex();
    };
    // 设置索引点击事件
    [...slider_index_items].forEach((item,i)=> {
        item.onmousedown = function () {
            // 1.判断点击的索引与当前索引关系
            if(iNode > i){  // 上一张图片效果
                startAnimation(slider_items[iNode],{
                    "left":scroll_w
                })
                
                slider_items[i].style.left = -scroll_w + "px";


            }else if(iNode < i){  // 下一张图片效果
                startAnimation(slider_items[iNode],{
                    "left":-scroll_w
                })
                
                slider_items[i].style.left = scroll_w + "px";

            }
            iNode = i;
            startAnimation(slider_items[iNode],{
                "left":0
            })
            updateIndex();
        }
    });;
    // 设置自动播放
    let timer = window.setInterval(autoPlay,2000);
    // 设置鼠标悬浮停止定时器，离开开启定时器
    slider.onmouseover = function () {
        clearInterval(timer);
    }
    slider.onmouseout = function () {
        timer = window.setInterval(autoPlay,2000);
    }
}