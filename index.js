// Utility Functions
// var fps = 0;

// Getting FPS
var fps = {	
    startTime : 0,	
    frameNumber : 0,	
    getFPS : function(){		
        this.frameNumber++;		
        var d = new Date().getTime(),			
        currentTime = ( d - this.startTime ) / 1000,			
        result = Math.floor( ( this.frameNumber / currentTime ) );		
        if( currentTime > 1 ){			
            this.startTime = new Date().getTime();			
            this.frameNumber = 0;		
        }		
        return result;	
    }	
};

var init = true;
var score = 0;
var gameOverCheck = false;
var showHitBox = false;
var training = false;
var inGame = false;
var difficulty = 1;
var map = 'ocean';
var buttonNav = {
    page: 'home',
    next:1,
}

const Gravity = .9;

var mobile = document.getElementById('mobile')
var isMobile = window.getComputedStyle(mobile).display !== "none" ? true : false;

var container = document.getElementById("container");
var canvas = document.getElementById("canvas");
var floor = document.getElementById('floor');
var bgImg = document.getElementById('bgImg');
var ctx = canvas.getContext("2d");
var gameOverText = canvas.getContext("2d");
var ctx2 = floor.getContext("2d");

var jumpButton = document.getElementById("jumpButton");
var leftButton = document.getElementById("leftButton");
var rightButton = document.getElementById("rightButton");

var restartPage = document.getElementById("restartPage")
var restart = document.getElementById('restart');
var homeButton = document.getElementById('homeButton')

var menu = document.getElementById('menu');
var startButton = document.getElementById('start');
var settings = document.getElementById('settings');

var pausePage = document.getElementById('pausePage')
var pauseButton = document.getElementById('pauseCheckbox');
var pauseContainer = document.getElementById('pause')
var resumeBtn = document.getElementById('resume')
var exitGame = document.getElementById('exitGame')

var settingsPage = document.getElementById('settingsPage')
var showHitBoxBtn = document.getElementById('showHitBox')
var trainingBtn = document.getElementById('training')
var exitSetting = document.getElementById('exitSetting')

var difficultyPage = document.getElementById('difficultyPage')
// var difficultyUp = document.getElementById('difficultyUp')
// var difficultyDown = document.getElementById('difficultyDown')
var easyBtn = document.getElementById('easyBtn')
// var mediumBtn = document.getElementById('mediumBtn')
var difficultyBtn = document.getElementById('difficultyBtn')
var exitDifficulty = document.getElementById('exitDifficulty')

var trainingPage = document.getElementById('trainingPage')
var trainingDsp = document.getElementById('trainingBtn')
var exitTraining = document.getElementById('exitTraining')

var hitboxPage = document.getElementById('hitboxPage')
var exitHitbox = document.getElementById('exitHitbox') 
var hitbox = document.getElementById('hitbox') 

var signalIcon = document.getElementById('signalIcon') 

var backGround = {
    drawBG : function(){
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        bgImg.width = container.offsetWidth;
        bgImg.height = container.offsetHeight;
        bgImg.style.objectFit = '';


        // ctx.fillStyle = "#000000";
        // ctx.fillRect(0, 0, container.offsetWidth, container.offsetHeight);

        // ctx.drawImage(bgImg, 0, 0, 2304, 1296, 200, 100, container.offsetWidth, container.offsetHeight) 
        
        floor.width = container.offsetWidth;
        floor.height = '6';
        ctx2.fillStyle = "brown";
        // ctx2.fillRect(0, 0, floor.offsetWidth, floor.offsetHeight);
    },

    gameOver : function(){
        gameOverText.font = "50px Arial";
        gameOverText.textAlign = 'center';
        gameOverText.fillText("GAME OVER", container.offsetWidth/2, container.offsetHeight/2)
        gameOverText.font = "30px Arial";
        gameOverText.fillText("SCORE: "+ score, container.offsetWidth/2, container.offsetHeight/2+50);
        closePause()

    },

    clearBG: function(){
        gameOverText.clearRect(0,0,container.offsetWidth, container.offsetHeight)
    }
}
backGround.drawBG()



var stage = {
    home(){
        document.body.style.backgroundImage = "url('Ocean_2/2.png')"
        ctx2.clearRect(0,0,container.offsetWidth, container.offsetHeight)

        
    },
    ocean(box1){
        // document.body.style.backgroundImage = "url('Ocean_2/2.png')"
        
        bgImg.src = "Ocean_2/3.png"
        
        ctx.drawImage(bgImg, 0, 0, 2304, 1296, 200, 100, container.offsetWidth, container.offsetHeight) 
        ctx2.fillRect(0, 0, floor.offsetWidth, floor.offsetHeight);
        
        box1 = new Circle(0, 60, 128, 130, container.offsetWidth/2 - 65, container.offsetHeight/2, 128, 128);
        box1.speedX = 0
        
        obs = new Box(0,0,128,128,10,-100,
            isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
            isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
            'Fire_Spirit/Idle.png',
            6,
            hitBoxOffSet={
                mobile: [37, 70, -75, -100],
                desktop: [145, 150, -300, -220]
            },
            'fall',
            'obstacle2',
            'box'
        )
        obs2 = new Box(0,0,128,128,-1000,
            isMobile ? container.offsetHeight*.8 : container.offsetHeight*.7,
            isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
            isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
            'Fire_Spirit/Walk.png',
            7,
            hitBoxOffSet={
                mobile: [37, 70, -75, -50],
                desktop: [160, 125, -305, -230]
            },
            'dash',
            'obstacle2',
            'box'
        )
        
    },
}




// LAYOUT FUNCTIONS
// Display Game Settings Page
function showSettings(){
    settingsPage.style.display = 'flex'

    menu.style.display = 'none'
    restartPage.style.display = 'none'
    closeDifficulty()
}

function closeSettings(){
    settingsPage.style.display = 'none'
}

// Show home page
function showHome(){
    menu.style.display = 'flex'
    
    pauseContainer.style.display = 'none'
    settingsPage.style.display = 'none'
    restartPage.style.display = 'none'
    hitboxPage.style.display = 'none'
    trainingPage.style.display = 'none'
    closeDifficulty()
    stage.home()
    signalIcon.src = ''
}

// Show restart page
function showRestart(){

    buttonNav.page = 'restart'
    // buttonNav.next = 1
    restartPage.style.display = 'flex'
    
    pauseContainer.style.display = 'none'
    settingsPage.style.display = 'none'
    menu.style.display = 'none'
    closeDifficulty()

}

// Show Difficulty Page
function showDifficulty(){
    difficultyPage.style.display = 'flex';
    // closeSettings()
    pauseContainer.style.display = 'none'
    settingsPage.style.display = 'none'
    menu.style.display = 'none'
}

function closeDifficulty(){
    difficultyPage.style.display = 'none';
}

// show pause page
function showPause(){
    pausePage.style.display = 'flex';

}

function closePause(){
    pausePage.style.display = 'none';
}
closePause()

hitbox.onclick=()=>{
     if(showHitBox){
        hitbox.innerHTML = 'HIDDEN'
    }else{
        hitbox.innerHTML = 'VISIBLE'
    }
    showHitBox = !showHitBox
}

showHitBoxBtn.onclick=()=>{
    // if(showHitBox){
    //     showHitBoxBtn.innerHTML = 'SHOW HITBOX';
    // }else{
    //     showHitBoxBtn.innerHTML = 'HIDE HITBOX';
    // }
    // showHitBox = !showHitBox
    closeSettings()
    hitboxPage.style.display = 'flex'

}

trainingBtn.onclick=()=>{
    // !training ? trainingBtn.innerHTML='OFF': trainingBtn.innerHTML ='ON'
    closeSettings()
    trainingPage.style.display = 'flex'
    // console.log('test');
    // training = !training
}

exitTraining.onclick=()=>{
    buttonNav.page = 'settings'
    buttonNav.next = 3
    trainingPage.style.display = 'none'
    showSettings()
}

trainingDsp.onclick=()=>{
    !training ? trainingDsp.innerHTML='ON': trainingDsp.innerHTML ='OFF'
    training = !training
}
    


difficultyBtn.onclick =()=>{
    buttonNav.page = 'difficulty'
    buttonNav.next = 1
    showDifficulty()
    closeSettings()
}

exitDifficulty.onclick =()=>{
    showSettings()
    closeDifficulty()
    buttonNav.page = 'settings'
    buttonNav.next = 2
}

exitHitbox.onclick =()=>{
    buttonNav.page = 'settings'
    buttonNav.next = 1
    hitboxPage.style.display = 'none'
    showSettings()
}

// Obstacles
class Box {
    constructor(sx, sy, swidth, sheight, x, y, width, height, src, frames, hitBoxOffSet, motion, imgId){
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.gravitySpeed = 0;
        this.box = document.getElementById('box');
        this.ctx = this.box.getContext('2d');
        this.rockbottom = container.offsetHeight - floor.height*15;
        this.img = document.getElementById(imgId);
        this.src = src;
        this.action = ['idle', 1];
        this.showHitBox = showHitBox;
        this.frames = frames;
        this.hbo = hitBoxOffSet;
        this.motion = motion;
    }

    draw(){
        this.img.src = this.src;
        if(this.showHitBox){
            isMobile ? 
            this.ctx.strokeRect(this.x+this.hbo.mobile[0],this.y+this.hbo.mobile[1],this.width+this.hbo.mobile[2],this.height+this.hbo.mobile[3]) : 
            this.ctx.strokeRect(this.x +this.hbo.desktop[0],this.y +this.hbo.desktop[1],this.width+this.hbo.desktop[2],this.height+this.hbo.desktop[3])
            this.ctx.strokeStyle = 'blue';
            this.ctx.lineWidth = 5;
        }
        switch (this.action[0]) {
            case 'idle':
                if(this.sx == 0){
                    this.ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height);
                    this.action = ['idle', 2]
                }else if(this.sx >= 766){
                    this.ctx.drawImage(this.img,this.sx+128,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height);
                    this.action = ['idle', 1]
                }else{
                    
                    this.ctx.drawImage(this.img,this.sx+128,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height);
                    this.action = ['idle', this.action[1]+1]
                }
                break;
        
            default:
                this.ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height);
                this.action = ['idle', 2]
                break;
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.box.width, this.box.height);
    }

    update(){
        switch (this.motion) {
            case 'fall':
                // Gravity Update
                this.gravitySpeed += Gravity;
                this.y += this.gravitySpeed;
        
                // Respawn at Top
                if(this.y > container.offsetHeight){
                    this.y = -100;
                    this.x = Math.floor(Math.random() * container.offsetWidth - this.width)
                    this.gravitySpeed = 0
                    score += 1;
                }
                break;
            case'dash':
                this.img.src = this.src;
                this.draw()

                // Position Update (speed)
                this.x += 14

                // Respawn at Side
                if(this.x >= container.offsetWidth){
                    this.x = -200;
                    score += 1;
                }
                break;
        }
        // Frame Motion Update
        this.sx >= 766 ? this.sx = 0 : this.sx += 128
    }
}

// player
// the draw attribute doesnt use the proper x coordinate, use the update attribute
class Circle {
    constructor(sx, sy, swidth, sheight, x, y, width, height, hitStun){
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.action = ["idle", 1];
        this.xdir = 'right';
        this.airborne = 'false';
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = Gravity;
        this.gravitySpeed = 0;
        this.box = document.getElementById("box");
        this.box.height = container.offsetHeight;
        this.box.width = container.offsetWidth;
        this.ctx = box.getContext("2d");
        this.img = document.getElementById("player1");
        this.showHurtBox = showHitBox;
        this.boxColor = 'white';
        this.jumps = 2;
       
        this.clear = function() {
            this.ctx.clearRect(0, 0, this.box.width, this.box.height);
        };
        this.newPos = function() {
            // Collision Detection & Speed Update
            if(this.x > container.offsetWidth-75){
                this.speedX = 0
                this.x = container.offsetWidth-75
            }else if(this.x < -50){
                this.speedX = 0
                this.x = -50
            }else{
                this.x += this.speedX;
            }

            // Frame Update
            switch (this.action[0]) {
                case 'idle':
                    this.sx >= 768 ? this.sx = 0 : this.sx += 128
                    break;
                case 'run':
                    this.sx >= 1024 ? this.sx = 0 : this.sx += 128
                    break;
                case 'jumpUp':
                    this.sx >= 679 ? this.sx = 0 : this.sx += 128
                    break;
                case 'jumpDown':
                    this.sx >= 661 ? this.sx = 0 : this.sx += 128
                    break;
                case 'jumpRecovery':
                    this.sx >= 916 ? this.sx = 0 : this.sx += 128
                    break;
            }
                
            //Gravity Update
            if(this.y === container.offsetHeight - floor.height*13.5){
                this.gravitySpeed = 0
            }
            // Collision Detection (Celing)
            this.hitTop();
            this.gravitySpeed += this.gravity;
            this.y += this.speedY + this.gravitySpeed;
            // Collision Detection (Floor)
            this.hitBottom();
        };
        // Collision Dtetction (Floor)
        this.hitBottom = function() {
            var rockbottom = container.offsetHeight - floor.height*13.5;
            if (this.y > rockbottom) {
              this.y = rockbottom;
              this.speedY = 0;
              switch (difficulty) {
                case 1:
                    this.jumps = 2
                    break;
                case 2:
                    this.jumps = 2
                    break;
                case 3:
                    this.jumps = 1
                    break;
              
                default:
                    break;
              }
              hitStun ? this.hitStun() : []
              if(this.speedX > 0){
                    this.img.src = 'Homeless_1/Run.png'
                    this.action = ['run', 1]
              }else if(this.speedX < 0){
                this.img.src = 'Homeless_1/Run2.png'
                this.action = ['run', 1]
              }else if(this.xdir == 'right'){
                this.img.src = 'Homeless_1/Idle.png'
                this.action = ['idle', 1]
              }else if(this.xdir == 'left'){
                this.img.src = 'Homeless_1/Idle2.png'
                this.action = ['idle', 1]
              }
            }
        };
        // Collision Dtection (Celing)
        this.hitTop = function() {
            var top = 20;
            if (this.y < top) {
              this.y = top;
              this.speedY = 0;
              this.gravitySpeed = 0;
            }
        };
        this.update = function(){
            if(this.showHurtBox){
                this.ctx.lineWidth = 1;
                if(this.speedX > 0){
                    this.ctx.strokeStyle = this.boxColor;
                    this.ctx.strokeRect(this.x+30,this.y,this.swidth-100,this.sheight - 50)
                }else if(this.speedX < 0){
                    this.ctx.strokeStyle = this.boxColor;
                    this.ctx.strokeRect(this.x+70,this.y,this.swidth-100,this.sheight - 50)
                }else{
                    this.ctx.strokeStyle = this.boxColor;
                    this.ctx.strokeRect(this.x+50,this.y,this.swidth-100,this.sheight - 50)
                }
            }
            switch (this.action[0]) {
                case('idle'):
                switch (this.action[1]) {
                    case 1:
                        this.ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                        this.action = ["idle", 2]
                        break;
                        case 2:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["idle", 3]
                        break;
                        case 3:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["idle", 4]
                        break;
                        case 4:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["idle", 5]
                            
                        break;
                        case 5:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["idle", 6]
                            
                        break;
                        case 6:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["idle", 1]
                        break;
                    
                        default:
                            break;
                    }
                break;
                case('run'):
                    switch (this.action[1]) {
                        case 1:
                            this.ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["run", 2]
                            break;
                        case 2:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["run", 3]
                            break;
                        case 3:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["run", 4]
                            break;
                        case 4:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["run", 5]
                            break;
                        case 5:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["run", 6]
                            break;
                        case 6:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["run", 7]
                            break;
                        case 7:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["run", 8]
                            break;
                        case 8:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["idle", 1]
                            break;
                    
                        default:
                            break;
                    }
                break;
                case('jumpUp'):
                    switch (this.action[1]) {
                        case 1:
                            this.ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpUp", 2]
                            break;
                        case 2:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpUp", 3]
                            break;
                        case 3:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpUp", 4]
                            break;
                        case 4:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpUp", 5]
                            break;
                        case 5:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            // this.speedY > 0 ? (this.action = ["jumpUp", 5]) : ( 
                            //     this.xdir = 'right' ? (
                            //         this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/JumpDown.png'
                            //         ):(
                            //             this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/JumpDown2.png'
                            //             )
                            // ) 
                            this.action = ['jumpDown', 1]
                            break;
                    }
                break;
                case('jumpDown'):
                    switch (this.action[1]) {
                        case 1:
                            this.ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpDown", 2]
                            break;
                        case 2:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpDown", 3]
                            break;
                        case 3:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpDown", 4]
                            break;
                        case 4:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpDown", 5]
                            break;
                        case 5:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ['jumpRecovery', 1]
                            break;
                    }
                break;
                case ('jumpRecovery'):
                    switch (this.action[1]) {
                        case 1:
                            this.ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpRecovery", 2]
                            break;
                        case 2:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpRecovery", 3]
                            break;
                        case 3:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpRecovery", 4]
                            break;
                        case 4:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpRecovery", 5]
                            break;
                        case 5:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpRecovery", 6]
                            break;
                        case 6:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            this.action = ["jumpRecovery", 7]
                            break;
                        case 7:
                            this.ctx.drawImage(this.img, this.sx + 128, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                            
                            break;
                    }
                break;
                default:
                    this.ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight,this.x, this.y, this.width, this.height);
                    this.action = ["idle", 1]
                    break;
            }
        };
        this.keypress = function(key){
            switch(key){
                case(' '):
                // console.log(this.jumps);
                    switch (this.jumps) {
                        case 1:
                            this.speedY += -15 ;
                            this.jumps = 0
                            break;
                        case 2:
                            this.speedY += -10 ;
                            this.jumps = 1
                            break;
                    
                        default:
                            break;
                    }

                    // this.action = ['jumpUp', 1]
                    // this.xs = 0;
                    // this.airborne = true
                    // if(this.xdir == 'left'){
                    //     this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/Jump2.png'
                    // }else{
                    //     this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/Jump.png'
                    // }
                   
                    break;
                case('ArrowUp'):
                    this.speedY += -15 ;
                    this.airborne = true

                    // this.action = ['jump', 1]
                    // if(this.xdir == 'left'){
                    //     this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/Jump2.png'
                    // }else{
                    //     this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/Jump.png'
                    // }
                   
                    break;
                case('ArrowLeft'):
                    this.speedX -= 15;
                    this.xdir = 'left'
                    this.img.src = 'Homeless_1/Run2.png'
                    this.action = ['run', 1]
                    this.speedX < 15 ? this.speedX = -15 : this.speedX = this.speedX
                    break;
                case('ArrowRight'):
                    this.speedX += 15;
                    this.xdir = 'right'
                    this.img.src = 'Homeless_1/Run2.png'
                    this.action = ['run', 1]
                    this.speedX > 15 ? this.speedX = 15 : this.speedX = this.speedX

                    break;
            }
            
        };
        this.keyup = function(key){
            switch(key){
                case('ArrowLeft'):
                    const myInterval = setInterval(()=>{
                        if(this.speedX < 0){
                            this.speedX += 3;
                            this.airborne ? this.img.src = 'Homeless_1/Run2.png' : this.img.src = 'Homeless_1/Run2.png'
                        }else{
                            clearInterval(myInterval);
                            this.img.src = 'Homeless_1/Idle2.png'
                        };
                    }, 100);
                    break;
                case('ArrowRight'):
                    const myInterval2 = setInterval(()=>{
                        if(this.speedX > 0){
                            this.speedX -= 3;
                            this.airborne ? this.img.src = 'Homeless_1/Run.png' : this.img.src = 'Homeless_1/Run.png'
                        }else{
                            clearInterval(myInterval2)
                            this.img.src = 'Homeless_1/Idle.png'
                        };
                    }, 100);
                    break;
                case(' '):
                    // if(this.speedY > 0){
                    //     this.xdir == 'right' ? this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/JumpUp.png' : this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/JumpUp2.png'
                    //     // this.action = ['jumpUp', 1]
                    // }else if(this.speedY < 0){
                    //     this.xdir == 'right' ? this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/JumpDown.png' : this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/JumpDown2.png'
                    //     // this.action = ['jumpDown', 1]
                    // }else if(this.speedY == 0 && this.airborne == true){
                    //     this.airborne = false;
                    //     this.xdir == 'right' ? this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/JumpRecovery.png' : this.img.src = '/Users/esowunmi/Downloads/craftpix-net-920580-free-homeless-character-sprite-sheets-pixel-art/Homeless_1/JumpRecoveryLeft.png'
                    //     this.action = ['idle', 1]
                    // }
                break;
            }
        };
    }
}

function start(){
    // Show Game Over Page
    function gameOver(){
        gameOverCheck = true;
        showRestart()
        backGround.gameOver()
        closePause()
    }

    // Render Background
    // backGround.drawBG();
    showHome()

    let box1 = new Circle(0, 60, 128, 130, container.offsetWidth/2 - 65, container.offsetHeight/2, 128, 128);

    obs = new Box(0,0,128,128,10,-100,
        isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
        isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
        'Fire_Spirit/Idle.png',
        6,
        hitBoxOffSet={
            mobile: [37, 70, -75, -100],
            desktop: [145, 150, -300, -220]
        },
        'fall',
        'obstacle2',
        'box'
    )
    
    obs2 = new Box(0,0,128,128,0,
        isMobile ? container.offsetHeight*.8 : container.offsetHeight*.7,
        isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
        isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
        'Fire_Spirit/Walk.png',
        7,
        hitBoxOffSet={
            mobile: [37, 70, -75, -50],
            desktop: [160, 125, -305, -230]
        },
        'dash',
        'obstacle2',
        'box'
    )
    
    // document.addEventListener('keydown', function(event){console.log(event.key)});
    var keyboardBtnNav = function(event){
        // console.log(event.key)
        // box1.keypress(event.key)
        if(event.key == 'ArrowDown'){
            switch (buttonNav.page) {
                case ('settings'):
                    switch (buttonNav.next) {
                        case 1:
                            showHitBoxBtn.classList.remove('main')
                            difficultyBtn.classList.add('main')

                            buttonNav.next = 2
                            break;
                        case 2:
                            difficultyBtn.classList.remove('main')
                            trainingBtn.classList.add('main')

                            buttonNav.next = 3

                            break;
                        case 3:
                            trainingBtn.classList.remove('main')
                            exitSetting.classList.add('main')

                            buttonNav.next = 4
                            break;
                        case 4:
                            exitSetting.classList.remove('main')
                            showHitBoxBtn.classList.add('main')

                            buttonNav.next = 1
                            break;
                        // case 1:
                        //     showHitBoxBtn.classList.remove('main')
                        //     difficultyBtn.classList.add('main')
                        //     break;
                      
                        
                        default:
                            break;
                    }
                    break;
            
                case('hitbox'):
                    switch (buttonNav.next) {
                        case 1:
                            exitHitbox.classList.add('main')
                            hitbox.classList.remove('main')

                            buttonNav.next = 2
                            break;
                        case 2:
                            hitbox.classList.add('main')
                            exitHitbox.classList.remove('main')
                            buttonNav.next = 1
                            break;
                    
                        default:
                            break;
                    }
                break;
            
                case('training'):
                    switch (buttonNav.next) {
                        case 1:
                            exitTraining.classList.add('main')
                            trainingDsp.classList.remove('main')
                            buttonNav.next = 2
                            break;
                        case 2:
                            trainingDsp.classList.add('main')
                            exitTraining.classList.remove('main')
                            buttonNav.next = 1
                            break;
                    
                        default:
                            break;
                    }
                break;
               
                case('difficulty'):
                // console.log('mana');
                    switch (buttonNav.next) {
                        case 2:
                            easyBtn.classList.add('main')
                            exitDifficulty.classList.remove('main')
                            buttonNav.next = 1
                            break;
                        case 1:
                            exitDifficulty.classList.add('main')
                            easyBtn.classList.remove('main')
                            buttonNav.next = 2
                            break;
                    
                        default:
                            break;
                    }
                break;
           
                default:
                    break;
            }
        }
        if(event.key == 'ArrowUp'){
            switch (buttonNav.page) {
                case ('settings'):
                    switch (buttonNav.next) {
                        case 1:
                            exitSetting.classList.add('main')
                            showHitBoxBtn.classList.remove('main')

                            buttonNav.next = 4
                            break;
                        case 2:
                            showHitBoxBtn.classList.add('main')
                            difficultyBtn.classList.remove('main')

                            buttonNav.next = 1

                            break;
                        case 3:
                            difficultyBtn.classList.add('main')
                            trainingBtn.classList.remove('main')

                            buttonNav.next = 2
                            break;
                        case 4:
                            trainingBtn.classList.add('main')
                            exitSetting.classList.remove('main')

                            buttonNav.next = 3
                            break;
                        default:
                            break;
                    }
                    break;
                
                case('hitbox'):
                    switch (buttonNav.next) {
                        case 1:
                            exitHitbox.classList.add('main')
                            hitbox.classList.remove('main')

                            buttonNav.next = 2

                            break;
                        case 2:
                            hitbox.classList.add('main')
                            exitHitbox.classList.remove('main')
                            
                            buttonNav.next = 1
                            break;
                    
                        default:
                            break;
                    }
                break;
                
                case('training'):
                    switch (buttonNav.next) {
                        case 1:
                            exitTraining.classList.add('main')
                            trainingDsp.classList.remove('main')
                            buttonNav.next = 2
                            break;
                        case 2:
                            trainingDsp.classList.add('main')
                            exitTraining.classList.remove('main')
                            buttonNav.next = 1
                            break;
                    
                        default:
                            break;
                    }
                break;
               
                case('difficulty'):
                // console.log('mana');
                    switch (buttonNav.next) {
                        case 2:
                            easyBtn.classList.add('main')
                            exitDifficulty.classList.remove('main')
                            buttonNav.next = 1
                            break;
                        case 1:
                            exitDifficulty.classList.add('main')
                            easyBtn.classList.remove('main')
                            buttonNav.next = 2
                            break;
                    
                        default:
                            break;
                    }
                break;

                default:
                    break;
            }
        }
        if(event.key == ' '){
            switch (buttonNav.page) {
                case ('settings'):
                    switch (buttonNav.next) {
                        case 1:
                            closeSettings()
                            hitboxPage.style.display = 'flex'
                            hitbox.classList.add('main')
                            exitHitbox.classList.remove ('main')

                            buttonNav.page = 'hitbox'
                            buttonNav.next = 1

                            break;
                        case 2:
                            closeSettings()
                            showDifficulty()

                            buttonNav.page = 'difficulty'
                            buttonNav.next = 1
                            break;
                        case 3:
                            closeSettings()
                            trainingPage.style.display = "flex"
                            trainingDsp.classList.add('main')
                            exitTraining.classList.remove('main')


                            buttonNav.next = 1
                            buttonNav.page = 'training'
                            break;
                        case 4:
                            buttonNav.page = 'home'
                            buttonNav.next = 2

                            showHitBoxBtn.classList.add('main')
                            exitSetting.classList.remove('main')

                            !pauseButton.checked ? showHome() : {}
                            !pauseButton.checked ? pauseButton.checked = !pauseButton.checked : {}
                            break;
                        default:
                            break;
                    }
                    break;
                    
                    case('hitbox'):
                        switch (buttonNav.next) {
                            case 1:
                                if(showHitBox){
                                    hitbox.innerHTML = 'HIDDEN'
                                }else{
                                    hitbox.innerHTML = 'VISIBLE'
                                }
                                showHitBox = !showHitBox
                                break;

                                case 2:
                                    buttonNav.page = 'settings'
                                    buttonNav.next = 1
                                    hitboxPage.style.display = 'none'
                                    // exitTraining.classList.remove('main')
                                    showSettings()
                                break;
                        
                            default:
                                break;
                        }
                    break;
               
                    case('training'):
                        switch (buttonNav.next) {
                            case 1:
                                !training ? trainingDsp.innerHTML='ON': trainingDsp.innerHTML ='OFF'
                                training = !training
                                break;

                            case 2:
                                buttonNav.page = 'settings'
                                buttonNav.next = 3
                                trainingPage.style.display = 'none'
                                showSettings()
                                break;
                        
                            default:
                                break;
                        }
                    break;
               
                    case 'difficulty':
                        switch (buttonNav.next) {
                            case 1:
                                switch (difficulty) {
                                    case 1:
                                        easyBtn.innerHTML = `
                                        MEDIUM
                                        <img src="Skull 004 16x161.png" alt="skull">
                                        <img src="Skull 004 16x161.png" alt="skull">
                                        `
                                        difficulty = 2
                                        break;
                                    case 2:
                                        easyBtn.innerHTML = `
                                        HARD
                                        <img src="Skull 004 16x161.png" alt="skull">
                                        <img src="Skull 004 16x161.png" alt="skull">
                                        <img src="Skull 004 16x161.png" alt="skull">
                                        `
                                        difficulty = 3
                                        break;
                                    case 3:
                                        easyBtn.innerHTML = `
                                        EASY
                                        <img src="Skull 004 16x161.png" alt="skull">
                                        `
                                        difficulty = 1
                                        break;
                                }
                                break;
                            case 2:
                                showSettings()
                                closeDifficulty()
                                buttonNav.page = 'settings'
                                buttonNav.next = 2
                                break;

                        
                            default:
                                break;
                        }
                        break;

                    default:
                    break;
            }
        }
    }

    var keyboardHomeNav = function(event){
        box1.keypress(event.key)
        switch (event.key) {
            case 'ArrowDown':
                switch (buttonNav.page) {
                    case 'home':
                        switch (buttonNav.next) {
                            case 1:
                                if(!inGame){
                                    startButton.classList.remove('main')
                                    settings.classList.add('main')
                                    buttonNav.next = 2
                                }
                                break;
                            case 2:
                                if(!inGame){
                                    startButton.classList.add('main')
                                    settings.classList.remove('main')
                                    buttonNav.next = 1
                                }
                                break;
                        
                            default:
                                break;
                        }
                        break;
                    
                    case 'restart':
                        switch (buttonNav.next) {
                            case 1:
                                if(!inGame){
                                    restart.classList.remove('main')
                                    homeButton.classList.add('main')
                                    buttonNav.next = 2
                                }
                                break;
                            case 2:
                                if(!inGame){
                                    restart.classList.add('main')
                                    homeButton.classList.remove('main')
                                    buttonNav.next = 1
                                }
                                break;
                        
                            default:
                                break;
                        }
                        break;
                    
                    default:
                        break;
                }
                break;
            
            case 'ArrowUp':
                switch (buttonNav.page) {
                    case 'home':
                        switch (buttonNav.next) {
                            case 1:
                                if(!inGame){
                                    startButton.classList.remove('main')
                                    settings.classList.add('main')
                                    buttonNav.next = 2
                                }
                                break;
                            case 2:
                                if(!inGame){
                                    startButton.classList.add('main')
                                    settings.classList.remove('main')
                                    buttonNav.next = 1
                                }
                                break;
                        
                            default:
                                break;
                        }
                        break;
                    
                    case 'restart':
                        switch (buttonNav.next) {
                            case 1:
                                if(!inGame){
                                    restart.classList.remove('main')
                                    homeButton.classList.add('main')
                                    buttonNav.next = 2
                                }
                                break;
                            case 2:
                                if(!inGame){
                                    restart.classList.add('main')
                                    homeButton.classList.remove('main')
                                    buttonNav.next = 1
                                }
                                break;
                        
                            default:
                                break;
                        }
                        break;
                    
                    
                    default:
                        break;
                }
                break;
            
            case ' ':
                switch (buttonNav.page) {
                    case 'home':
                        switch (buttonNav.next) {
                            case 1:
                                if(!inGame){
                                    switch (map) {
                                        case 'ocean':
                                            stage.ocean(box1)
                                            break;
                                    
                                        default:
                                            break;
                                    }

                                    stage
                                    buttonNav.page = 'home'
                                    buttonNav.next = 1
                                    
                                    inGame = true;
                                    score = 0
                                    menu.style.display = 'none'
                                    pauseContainer.style.display = 'block'
                                    box1 = new Circle(0, 60, 128, 130, container.offsetWidth/2 - 65, container.offsetHeight/2, 128, 128);
                                    box1.speedX = 0
        
                                        obs = new Box(0,0,128,128,10,-100,
                                            isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
                                            isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
                                            'Fire_Spirit/Idle.png',
                                            6,
                                            hitBoxOffSet={
                                                mobile: [37, 70, -75, -100],
                                                desktop: [145, 150, -300, -220]
                                            },
                                            'fall',
                                            'obstacle2',
                                            'box'
                                        )
                                        obs2 = new Box(0,0,128,128,-1000,
                                            isMobile ? container.offsetHeight*.8 : container.offsetHeight*.7,
                                            isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
                                            isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
                                            'Fire_Spirit/Walk.png',
                                            7,
                                            hitBoxOffSet={
                                                mobile: [37, 70, -75, -50],
                                                desktop: [160, 125, -305, -230]
                                            },
                                            'dash',
                                            'obstacle2',
                                            'box'
                                        )
        
                                    if(init){
                                    init = false
                                    setInterval(update, 20)
                                }
                            }
                                break;
                            case 2:
                                if(!inGame){
                                    buttonNav.page = 'settings'
                                    buttonNav.next = 1
                                    showSettings()
                                    pauseButton.checked = !pauseButton.checked
                                }
                            break;
                            default:
                                break;
                        }
                        break;
                    
                    case 'restart':
                        switch (buttonNav.next) {
                            case 1:
                                if(!inGame){
                                    inGame = true
                                    restartPage.style.display = 'none'
                                    backGround.drawBG()
                                    score = 0
                                    box1 = new Circle(0, 60, 128, 130, container.offsetWidth/2 - 65, container.offsetHeight/2, 128, 128);
                                    switch (map) {
                                        case 'ocean':
                                            stage.ocean(box1)
                                            break;
                                    
                                        default:
                                            break;
                                    }
                                //     obs = new Box(0,0,128,128,10,-100,
                                //         isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
                                //         isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
                                //         'Fire_Spirit/Idle.png',
                                //         6,
                                //         hitBoxOffSet={
                                //             mobile: [37, 70, -75, -100],
                                //             desktop: [145, 150, -300, -220]
                                //         },
                                //         'fall',
                                //         'obstacle2',
                                //         'box'
                                //     )
                                //     obs2 = new Box(0,0,128,128,-0,
                                //     isMobile ? container.offsetHeight*.8 : container.offsetHeight*.7,
                                //     isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
                                //     isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
                                //     'Fire_Spirit/Walk.png',
                                //     7,
                                //     hitBoxOffSet={
                                //         mobile: [37, 70, -75, -50],
                                //         desktop: [160, 125, -305, -230]
                                //     },
                                //     'dash',
                                //     'obstacle2',
                                //     'box'
                                // )
                                }
                                break;
                            case 2:
                                if(!inGame){
                                    buttonNav.page = 'home'
                                    // buttonNav.next = 1

                                    box1 = new Circle();
                                    obs = new Box(0,0,128,128,1000,-100,
                                        isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
                                        isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
                                        '',
                                        6,
                                        hitBoxOffSet={
                                            mobile: [37, 70, -75, -100],
                                            desktop: [145, 150, -300, -220]
                                        },
                                        'fall',
                                        'obstacle2',
                                        'box'
                                    )
                                    obs2 = new Box(0,0,128,128,-1000,-1000,
                                        // isMobile ? container.offsetHeight*.8 : container.offsetHeight*.7,
                                        isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
                                        isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
                                        'Fire_Spirit/Walk.png',
                                        7,
                                        hitBoxOffSet={
                                            mobile: [37, 70, -75, -50],
                                            desktop: [160, 125, -305, -230]
                                        },
                                        'dash',
                                        'obstacle2',
                                        'box'
                                    )
                                    backGround.drawBG()
                                    showHome()
                                }
                                break;
                        
                            default:
                                break;
                        }
                        break;
                    
                    
                    default:
                        if(!inGame){
                            inGame = true
                            restartPage.style.display = 'none'
                            backGround.drawBG()
                            score = 0
                            box1 = new Circle(0, 60, 128, 130, container.offsetWidth/2 - 65, container.offsetHeight/2, 128, 128);
                            obs = new Box(0,0,128,128,10,-100,
                                isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
                                isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
                                'Fire_Spirit/Idle.png',
                                6,
                                hitBoxOffSet={
                                    mobile: [37, 70, -75, -100],
                                    desktop: [145, 150, -300, -220]
                                },
                                'fall',
                                'obstacle2',
                                'box'
                            )
                            obs2 = new Box(0,0,128,128,-0,
                            isMobile ? container.offsetHeight*.8 : container.offsetHeight*.7,
                            isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
                            isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
                            'Fire_Spirit/Walk.png',
                            7,
                            hitBoxOffSet={
                                mobile: [37, 70, -75, -50],
                                desktop: [160, 125, -305, -230]
                            },
                            'dash',
                            'obstacle2',
                            'box'
                        )
                        }
                        break;
                }
                break;
            
            default:
                break;
        }
        
    }

    document.addEventListener('keydown', function(event){!pauseButton.checked ? keyboardBtnNav(event) : keyboardHomeNav(event)});

    
    document.addEventListener('keyup', function(event){!pauseButton.checked ? {} : box1.keyup(event.key)});
    jumpButton.addEventListener("click", function(){!pauseButton.checked ? {} : box1.keypress(' ')});
    jumpButton.addEventListener("click", function(){!pauseButton.checked ? {} : box1.keypress('ArrowUp')});
    leftButton.addEventListener("click", function(){!pauseButton.checked ? {} : box1.keypress('ArrowLeft')});
    rightButton.addEventListener("click", function(){!pauseButton.checked ? {} : box1.keyup('ArrowRight')});

    // difficultyUp.addEventListener("click", function(){
    //     switch (difficulty) {
    //         case 1:
    //             easyBtn.innerHTML = `
    //             MEDIUM
    //             <img src="Skull 004 16x161.png" alt="skull">
    //             <img src="Skull 004 16x161.png" alt="skull">
    //             `
    //             difficulty = 2
    //             break;
    //         // case 2:
    //         //     easyBtn.innerHTML = `
    //         //     Hard
    //         //     <img src="Skull 004 16x161.png" alt="skull">
    //         //     <img src="Skull 004 16x161.png" alt="skull">
    //         //     <img src="Skull 004 16x161.png" alt="skull">
    //         //     `
    //         //     difficulty = 3
    //         //     break;
    //         default:
    //             break;
    //     }
    // });
    // difficultyDown.addEventListener("click", function(){
    //     switch (difficulty) {
    //         case 2:
    //             easyBtn.innerHTML = `
    //             Easy
    //             <img src="Skull 004 16x161.png" alt="skull">
    //             `
    //             difficulty = 1
    //             break;
    //         case 3:
    //             easyBtn.innerHTML = `
    //             Medium
    //             <img src="Skull 004 16x161.png" alt="skull">
    //             <img src="Skull 004 16x161.png" alt="skull">
    //             `
    //             difficulty = 2
    //             break;
    //         default:
    //             break;
    //     }
    // });

    settings.addEventListener("click", function(){
        // console.log(true)
        buttonNav.page = 'settings'
        buttonNav.next = 1
        showSettings()
        pauseButton.checked = !pauseButton.checked
    });
    exitSetting.addEventListener("click", function(){
        buttonNav.page = 'home'
        buttonNav.next = 1
        !pauseButton.checked ? showHome() : {}
        !pauseButton.checked ? pauseButton.checked = !pauseButton.checked : {}
        
    });

    // exitGame.addEventListener("click", function(){
    //     !pauseButton.checked ? pauseButton.checked = !pauseButton.checked : {}
    //     closePause()
    //     box1 = new Circle();
    //     obs = new Box(0,0,128,128,1000,-100,
    //         isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
    //         isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
    //         '',
    //         6,
    //         hitBoxOffSet={
    //             mobile: [37, 70, -75, -100],
    //             desktop: [145, 150, -300, -220]
    //         },
    //         'fall',
    //         'obstacle2',
    //         'box'
    //     )
    //     backGround.drawBG()
    //     showHome()
    // })

    homeButton.addEventListener('click', function(){
        buttonNav.page = 'home'
        buttonNav.next =1
        box1 = new Circle();
        obs = new Box(0,0,128,128,1000,-100,
            isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
            isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
            '',
            6,
            hitBoxOffSet={
                mobile: [37, 70, -75, -100],
                desktop: [145, 150, -300, -220]
            },
            'fall',
            'obstacle2',
            'box'
        )
        obs2 = new Box(0,0,128,128,-1000,-1000,
            // isMobile ? container.offsetHeight*.8 : container.offsetHeight*.7,
            isMobile ? container.offsetWidth/4 : container.offsetWidth/4,
            isMobile ? container.offsetHeight/4 : container.offsetHeight/2,
            'Fire_Spirit/Walk.png',
            7,
            hitBoxOffSet={
                mobile: [37, 70, -75, -50],
                desktop: [160, 125, -305, -230]
            },
            'dash',
            'obstacle2',
            'box'
        )
        backGround.drawBG()
        showHome()
    })  

    startButton.addEventListener('click', ()=> {
        inGame = true;
        score = 0
        menu.style.display = 'none'
        pauseContainer.style.display = 'block'

        switch (map) {
            case 'ocean':
                stage.ocean(box1)
                break;
        
            default:
                break;
        }
        
        
        if(init){
            init = false
            setInterval(update, 20 )
        }
       
    });

    restart.addEventListener('click', function(){
        buttonNav.next = 1
        inGame = true
        restartPage.style.display = 'none'
        backGround.drawBG()
        score = 0
        switch (map) {
            case 'ocean':
                stage.ocean(box1)
                break;
        
            default:
                break;
        }
    })  

    showHitBoxBtn.addEventListener('click', ()=> {
        buttonNav.page = 'hitbox'
        buttonNav.next = 1

        box1.showHurtBox = showHitBox;
        obs.showHitBox = showHitBox;
        obs2.showHitBox = showHitBox;
    });

    document.addEventListener('keydown', (event)=>{event.key == 'Shift' ? inGame ? pause() : {} : {}})
    resumeBtn.addEventListener('click', ()=>pause())
    // easyBtn.addEventListener('click', ()=>difficulty = 1)
    // mediumBtn.addEventListener('click', ()=>difficulty = 2)

    easyBtn.addEventListener('click', function(){
        switch (difficulty) {
            case 1:
                easyBtn.innerHTML = `
                MEDIUM
                <img src="Skull 004 16x161.png" alt="skull">
                <img src="Skull 004 16x161.png" alt="skull">
                `
                difficulty = 2
                break;
            case 2:
                easyBtn.innerHTML = `
                HARD
                <img src="Skull 004 16x161.png" alt="skull">
                <img src="Skull 004 16x161.png" alt="skull">
                <img src="Skull 004 16x161.png" alt="skull">
                `
                difficulty = 3
                break;
            case 3:
                easyBtn.innerHTML = `
                EASY
                <img src="Skull 004 16x161.png" alt="skull">
                `
                difficulty = 1
                break;
        }
    })

   
    var pause = function(){
        pauseButton.checked ? showPause() : closePause()
        pauseButton.checked = !pauseButton.checked
        // showPause()
    }
    var updateObjectFrame =()=> {
        // backGround.drawBG()


        box1.clear()
        obs.clear()
        if(difficulty > 1){
            obs2.clear()
        }

        box1.newPos()
        box1.update()
        obs.update()
        if(difficulty > 1){
            obs2.update()
        }
        
        obs.draw()
        if(difficulty > 1){
            obs2.draw()
        }
    } 

    // box1.update();
    // setInterval(update, 20);

    function update(){

        // console.log(fps.getFPS());
        if(fps.getFPS() <= 15){
            signalIcon.src = 'signalLow.png'
        }else if(fps.getFPS() > 15 && fps.getFPS() <= 30){
            signalIcon.src = 'signalMid.png'
        }else if(fps.getFPS() > 30 && fps.getFPS() <= 40){
            signalIcon.src = 'signalMid-high.png'
        }else{
            signalIcon.src = 'signalHigh.png'
        }

        // if not paused Apply collision detection and update 
        if(pauseButton.checked){
            closeSettings()
            if( 
                (
                    // Collision detection adjustment for right movement
                    box1.speedX > 0 &&
                    isMobile ? 
                    obs.x+obs.hbo.mobile[0] <= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.mobile[0] + obs.width+obs.hbo.mobile[2] >= box1.x+30 && obs.y + obs.height >= box1.y + 15 :
                    obs.x+obs.hbo.desktop[0] <= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.desktop[0] + obs.width+obs.hbo.desktop[2]>= box1.x+30 && obs.y+obs.hbo.desktop[1] + obs.height+obs.hbo.desktop[3] >= box1.y + 15 && obs.y+obs.hbo.desktop[1] <= box1.y + box1.sheight - 20
            
                    // Collision detection adjustment for left movement
                    || 
                    box1.speedX < 0 &&
                    isMobile ? 
                    obs.x+obs.hbo.mobile[0] <= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.mobile[0] + obs.width+obs.hbo.mobile[2] >= box1.x+70 && obs.y + obs.height >= box1.y + 15 :
                    obs.x+obs.hbo.desktop[0]<= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.desktop[0] + obs.width+obs.hbo.desktop[2] >= box1.x+70 && obs.y+obs.hbo.desktop[1] + obs.height+obs.hbo.desktop[3] >= box1.y + 15 && obs.y+obs.hbo.desktop[1] <= box1.y + box1.sheight - 20 
            
                    // standing still (no adjustment)
                    ||
                    isMobile ? 
                    obs.x+obs.hbo.mobile[0] <= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.mobile[0] + obs.width+obs.hbo.mobile[2] >= box1.x+50 && obs.y + obs.height >= box1.y + 15 :
                    obs.x+obs.hbo.desktop[0] <= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.desktop[0] + obs.width+obs.hbo.desktop[2] >= box1.x+50 && obs.y+obs.hbo.desktop[1] + obs.height+obs.hbo.desktop[3] >= box1.y + 15 && obs.y+obs.hbo.desktop[1] <= box1.y + box1.sheight - 20
                )
            ){
                if(!training){
                    inGame = false
                    // box1.clear();
                    // box1.update();
                    obs.draw();
                    gameOver()
                }else{
                    // box1.hitStun()
                    box1.boxColor = 'red'
                    updateObjectFrame()
                    // console.log('collision')

                }
                
            }else if( 
                box1.speedX > 0 &&
                isMobile ? 
                obs2.x+obs2.hbo.mobile[0] <= box1.x+50 + box1.swidth-100 && obs2.x+obs2.hbo.mobile[0] + obs2.width+obs2.hbo.mobile[2] >= box1.x+30 && obs2.y + obs2.height >= box1.y + 15 :
                obs2.x+obs2.hbo.desktop[0]+10 <= box1.x+50 + box1.swidth-100 && obs2.x+obs2.hbo.desktop[0] + obs2.width+obs2.hbo.desktop[2] >= box1.x+60 && obs2.y+obs2.hbo.desktop[1] + 30 <= box1.y+box1.sheight 
    
                // || 
                // box1.speedX < 0 &&
                // isMobile ? 
                // obs.x+obs.hbo.mobile[0] <= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.mobile[0] + obs.width+obs.hbo.mobile[2] >= box1.x+70 && obs.y + obs.height >= box1.y + 15 :
                // obs.x+obs.hbo.desktop[0]<= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.desktop[0] + obs.width+obs.hbo.desktop[2] >= box1.x+70 && obs.y+obs.hbo.desktop[1] + obs.height+obs.hbo.desktop[3] >= box1.y + 15 && obs.y+obs.hbo.desktop[1] <= box1.y + box1.sheight - 20 
    
                // ||
                // isMobile ? 
                // obs.x+obs.hbo.mobile[0] <= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.mobile[0] + obs.width+obs.hbo.mobile[2] >= box1.x+50 && obs.y + obs.height >= box1.y + 15 :
                // obs.x+obs.hbo.desktop[0] <= box1.x+50 + box1.swidth-100 && obs.x+obs.hbo.desktop[0] + obs.width+obs.hbo.desktop[2] >= box1.x+50 && obs.y+obs.hbo.desktop[1] + obs.height+obs.hbo.desktop[3] >= box1.y + 15 && obs.y+obs.hbo.desktop[1] <= box1.y + box1.sheight - 20
    
            ){
                if(!training){
                    inGame = false
                    // box1.clear();
                    // box1.update();
                    obs2.draw();
                    gameOver()
                }else{
                    box1.boxColor = 'red'
                    updateObjectFrame()
                    score = 0
                }
            }else{
                training ? box1.boxColor = 'white' : ()=>{}
                updateObjectFrame()
            }
        }else{
            // showSettings()
        }

   
    }

    
}

start();