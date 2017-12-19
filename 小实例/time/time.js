var time = class Time{
	constructor(){
		this.init();
	}
	drawLines(wrap, total, translateX){			//绘制刻度线
		var gap = 360/total;
		for(var i=0;i<total;i++){
			var li = document.createElement('li');
			this.addcss(li,`transform:rotate(${i*gap}deg) translate(${translateX}px,-50%)`);
			wrap.append(li);
		}
	}
	drawNumbers(wrap){							//绘制数字时间
		var r = wrap.offsetHeight/2;
		var child = '';
		for(var i=1;i<=12;i++){
			var  angle = (i-3)/6*Math.PI;
			var myX = r + r*Math.cos(angle),  // x=r+rcos(θ)
			myY = r + r*Math.sin(angle);     // y=r+rsin(θ)
			child+=`<li style="left:${myX}px;top:${myY}px;">${i}</li>`;
		}
		wrap.innerHTML = child;
	}
	init(){
		this.drawLines(this.getclass('.line-min'), 60, 85);
		this.drawLines(this.getclass('.line-hour'), 12, 80);
		this.drawNumbers(this.getclass('.number'));
		this.move();
	}
	addcss(obj,mycss){
		obj.style.cssText = mycss;
	}
	move(){
		var h = this.getclass('.hour'),
		m = this.getclass('.min'),
		s = this.getclass('.sec');
		setInterval(function(){
			var now = new Date(),
			hour = now.getHours(),
			min = now.getMinutes(),   
			sec = now.getSeconds();
			var hangle = 30*hour + 0.5*min -90,
			mangle = 6*min + 0.1*sec -90,
			sangle = 6*sec -90;
			this.addcss(h,`transform:rotate(${hangle}deg)`);
			this.addcss(m,`transform:rotate(${mangle}deg)`);
			this.addcss(s,`transform:rotate(${sangle}deg)`);
		}.bind(this),1000);
	}
	getclass(cls){
		return document.querySelector(cls);
	}
}
new time();

	// 3:x:2r,y:r; 	0	0     sin 0	  cos 1
	// 6:x:r,y:2r;	90	π/2   sin 1   cos 0
	// 9:x:0,y:r;	180	π     sin 0   cos -1
	// 12:x:r,y:0;	270 3π/2  sin -1  cos 0
	// 3 = 0;		3-3 = 0		/6			(num-3)/6 * π
	// 6 = 1/2;		6-3 = 3		/6
	// 9 = 1;		9-3 = 6		/6
	// 12 = 3/2;	12-3 = 9	/6