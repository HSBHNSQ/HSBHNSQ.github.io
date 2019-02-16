window.onload=function(){
	//获取元素
	var music=document.getElementById("music");
	var audio=document.getElementsByTagName("audio")[0];
 
	//当音乐播放停止时候,自动停止光盘旋转效果
	audio.addEventListener("ended",function(event){
		music.setAttribute("class","");
		//music.style.animationPlayState
	},false);
 
	//点击音乐图标,控制音乐播放效果
	// music.onclick=function(){
	// 	if(audio.paused){
	// 		audio.play();
	// 		this.setAttribute("class","play");
	// 		//this.style.animationPlayState="running";
	// 	}else{
	// 		audio.pause();
	// 		this.setAttribute("class","");
	// 		//this.style.animationPlayState="paused";
	// 	};
	// };
	music.addEventListener("touchstart",function(event){
		if(audio.paused){
			audio.play();
			this.setAttribute("class","play");
		//this.style.animationPlayState="running";
		}else{
			audio.pause();
			this.setAttribute("class","");
		//this.style.animationPlayState="paused";
		};
	},false);
 
	
	
	//点击屏幕 开始好运2017
	page1.addEventListener("click",function(event){
		page1.style.display="none";
		page2.style.display="block";
		page3.style.display="block";
		page3.style.top="100%";
		setTimeout(function() {
			page2.setAttribute("class","page fadeOut");
			page3.setAttribute("class","page fadeIn");
			page3.style.display="block";
		},5500);
	},false);
	
	
// 	function audioAutoPlay(id){
// 		setTimeout(function(){
// 			var audio = document.getElementById(id),  
// 			play = function(){  
// 				audio.play();  
// 				document.removeEventListener("touchstart",play, false);  
// 			};  
// 			audio.play();  
// 			document.addEventListener("WeixinJSBridgeReady", function () {  
// 				play();  
// 			}, false);  
// 			document.addEventListener('YixinJSBridgeReady', function() {  
// 				play();  
// 			}, false);  
// 			document.addEventListener("touchstart",play, false);  
// 		},3000);
// 	}
// 	function play(){
// 		audio.play();
// 	}
// 	audioAutoPlay('Jaudio'); 
};