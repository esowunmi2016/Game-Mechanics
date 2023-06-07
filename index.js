const Gravity = .9;

var container = document.getElementById("container");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var floor = document.getElementById('floor');
var ctx2 = floor.getContext("2d");

var backGround = {
    drawBG : function(){
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, container.offsetWidth, container.offsetHeight);
        
        floor.width = container.offsetWidth;
        floor.height = '5';
        ctx2.fillStyle = "green";
        ctx2.fillRect(0, 0, floor.offsetWidth, floor.offsetHeight);
    },
}

class Box {
    constructor(height, width){
        this.height = height;
        this.width = width;
    }

    draw(){
        var box = document.getElementById("box");
        var ctx3 = box.getContext("2d");
        ctx3.beginPath();
        ctx3.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx3.stroke();
    }

    
}

class Circle {
    constructor(radius, x, y, ){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = Gravity;
        this.gravitySpeed = 0;
        this.box = document.getElementById("box");
        this.box.height = container.offsetHeight;
        this.box.width = container.offsetWidth;
        this.ctx = box.getContext("2d");
        this.draw = function(){
            this.ctx.beginPath();
            this.ctx.arc(95, 50, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fillStyle = "white";
            this.ctx.fill()
        };
        this.clear = function() {
            this.ctx.clearRect(0, 0, this.box.width, this.box.height);
        };
        this.newPos = function() {
            if(this.x > container.offsetWidth-20){
                this.speedX = 0
                this.x = container.offsetWidth-20
            }else if(this.x < 20){
                this.speedX = 0
                this.x = 20
            }else{
                this.x += this.speedX;
            }
            
            
            //Gravity Update
            if(this.y === container.offsetHeight - floor.height*4){
                this.gravitySpeed = 0
            }
            
            
            this.hitTop();
            this.gravitySpeed += this.gravity;
            this.y += this.speedY + this.gravitySpeed;
            this.hitBottom();
        };
        this.hitBottom = function() {
            var rockbottom = container.offsetHeight - floor.height*4;
            if (this.y > rockbottom) {
              this.y = rockbottom;
              this.speedY = 0;
            }
        };
        this.hitTop = function() {
            var top = 20;
            if (this.y < top) {
              this.y = top;
              this.speedY = 0;
              this.gravitySpeed = 0;
            }
        };
        this.update = function(){
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.fillStyle = "white";
            this.ctx.fill()
            
        };
        this.keypress = function(key){
            switch(key){
                case(' '):
                    this.speedY += -15;
                    break;
                case('ArrowLeft'):
                    this.speedX -= 15;
                    break;
                case('ArrowRight'):
                    this.speedX += 15;
                    break;
            }
        };
        this.keyup = function(key){
            // console.log(key)
            switch(key){
                case('ArrowLeft'):
                    const myInterval = setInterval(()=>{
                        if(this.speedX < 0){
                            this.speedX += 3;
                        }else{
                            clearInterval(myInterval);
                        };
                    }, 100);
                    break;
                case('ArrowRight'):
                    const myInterval2 = setInterval(()=>{
                        if(this.speedX > 0){
                            this.speedX -= 3;
                        }else{
                            clearInterval(myInterval2)
                        };
                    }, 100);
                    break;
            }
        };
    }
}



function start(){
    document.addEventListener('keydown', function(event){box1.keypress(event.key)});
    document.addEventListener('keyup', function(event){box1.keyup(event.key)});

    backGround.drawBG();
    let box1 = new Circle(20, container.offsetWidth/2, container.offsetHeight/2);
    box1.draw();
    
    setInterval(update, 20);
    
    function update(){
        box1.clear();
        box1.newPos();
        box1.update();
    }
}

start();