let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let fire1 = document.getElementById("fire1");
let fire2 = document.getElementById("fire2");

// cvs.style.backgroundColor = "skyblue";

let frames = 0;
// for game states
var state = {
    currentState: 0,
    readyState: 0,
    gamePlayState: 1,
    gameOverState: 2
}
// click event
document.addEventListener("click",function()
{
    switch (state.currentState) {
        case state.readyState:
            state.currentState = state.gamePlayState;
            swooshing.play();
            break;
        case state.gamePlayState:
            bird.move();
            flap.play();
            break;
        default:
            state.currentState = state.readyState;
            pipes.reset();
            ball.reset();
            score.reset();
            break;
    }
})

var img = new Image();
img.src = "images/img.png";

var ballImg = new Image();
ballImg.src = "images/ball.png";

var die = new Audio();
die.src = "audio/die.wav";
var flap = new Audio();
flap.src = "audio/flap.wav";
var hit = new Audio();
hit.src = "audio/hit.wav";
var swooshing = new Audio();
swooshing.src = "audio/swooshing.wav";

var cloud = {
    sx: 0,
    sy: 0,
    sWidth: 276,
    sHeight: 228,
    dx: 0,
    dy: cvs.height - 228,
    dWidth: 276,
    dHeight: 220,

    draw: function () 
    {
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx,this.dy,this.dWidth,this.dHeight); 
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+2*this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+3*this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+4*this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+5*this.dWidth,this.dy,this.dWidth,this.dHeight);
    }
}

var field = {
    sx: 276,
    sy: 0,
    sWidth: 224,
    sHeight: 110,
    dx: 0,
    dy: cvs.height - 110,
    dWidth: 224,
    dHeight: 110,

    draw: function () 
    {
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+2*this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+3*this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+4*this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+5*this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+6*this.dWidth,this.dy,this.dWidth,this.dHeight);
        ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx+7*this.dWidth,this.dy,this.dWidth,this.dHeight);
    },

    update: function ()
    {
        if(state.currentState == state.gamePlayState)
        {
            this.dx = this.dx - 3;
            if(this.dx%80 === 0){
                this.dx = 0;
            }
        }
    }
}

var bird = {
    birds:
    [
        {sx: 276,sy: 114},
        {sx: 276,sy: 140},
        {sx: 276,sy: 166},
        {sx: 276,sy: 140}
    ],
    sWidth: 34,
    sHeight: 24,
    dx: 50,
    dy: 150,
    dWidth: 34,
    dHeight: 24,
    frame : 0,
    periods : 4,

    speed: 0,
    gravity: 0.2,
    jump: 4.6,

    draw: function()
    {
        let currentBird = this.birds[this.frame];
        ctx.drawImage(img,currentBird.sx,currentBird.sy,this.sWidth,this.sHeight,this.dx,this.dy,this.dWidth,this.dHeight);
    },

    update: function ()
    {
        this.periods = state.currentState===state.readyState?10:5;
        frames++;
        this.frame = this.frame + (frames % this.periods===0 ? 1 : 0); 
        this.frame = this.frame % this.birds.length;
        if(state.currentState === state.readyState)
        {
            this.dy = 150;
        } else 
        {
            this.dy = this.dy + this.speed;
            this.speed = this.speed + this.gravity;
        }
        
        if(this.dy+this.sHeight > field.dy)
        {
            this.speed = 0;
            this.frame = 0;
            if(state.currentState === state.gamePlayState)
            {
                die.play();
            }
            state.currentState = state.gameOverState;
        }
    },

    move: function()
    {
        this.speed = - this.jump;
    }
}

var getReady = {
    sx: 0,
    sy: 228,
    sWidth: 174,
    sHeight: 160,
    dx: (cvs.width-174)/2,
    dy: (cvs.height - 160)/2,
    dWidth: 174,
    dHeight: 160,

    draw: function () 
    {
        if(state.currentState === state.readyState)
        {
            ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx,this.dy,this.dWidth,this.dHeight); 
            fire1.style.display = "none";
            fire2.style.display = "none";
        }
    }
}

var gameOver = {
    sx: 174,
    sy: 228,
    sWidth: 226,
    sHeight: 200,
    dx: (cvs.width-226)/2,
    dy: (cvs.height - 200)/2,
    dWidth: 226,
    dHeight: 200,

    draw: function () 
    {
        if(state.currentState === state.gameOverState)
        {
            ctx.drawImage(img,this.sx,this.sy,this.sWidth,this.sHeight,this.dx,this.dy,this.dWidth,this.dHeight); 
            fire1.style.display = "block";
            fire2.style.display = "block";
        }    
    }
}

var pipes = {
    topSx: 554,
    bottomSx: 502,
    sy:0,
    sWidth: 52,
    sHeight: 400,
    position: [],
    dWidth: 52,
    dHeight: 400,
    maxYPosition: -150,
    gap: 150,
    speed: 3,
    draw: function()
    {
        for (let i = 0; i < this.position.length; i++) {
            const p = this.position[i];
            const bottomYPosition = p.dy + this.sHeight + this.gap;
            // top pipe
            ctx.drawImage(img,this.topSx,this.sy,this.sWidth,this.sHeight,p.dx,p.dy,this.dWidth,this.dHeight);
            // bottom pipe
            ctx.drawImage(img,this.bottomSx,this.sy,this.sWidth,this.sHeight,p.dx,bottomYPosition,this.dWidth,this.dHeight);
        }
        
    },
    update: function()
    {
        // update pipes when in game play state
        if(state.currentState === state.gamePlayState)
        {
            //add a pipe
            if(frames % 100 === 0){
                this.position.push(
                    {
                        dx: cvs.width,
                        dy: this.maxYPosition*(Math.random()+1)
                    }
                )
            }

            for (let i = 0; i < this.position.length; i++) {
                // move pipes to right to left
                const p = this.position[i];
                p.dx = p.dx-this.speed;
                // romoving pipes
                if(p.dx+this.sWidth < 0)
                {
                    this.position.shift();
                    score.value++;
                    score.best = Math.max(score.best, score.value);
                    localStorage.setItem("best",score.best);
                }
    
                // check if collision
                // top pipe
                if(bird.dx+bird.dWidth>p.dx && bird.dx<p.dx+this.dWidth && bird.dy<p.dy+this.dHeight){
                    state.currentState = state.gameOverState;
                    hit.play();
                }
                // bottom pipe
                const bottomYPosition = p.dy + this.sHeight + this.gap;
                if(bird.dx+bird.dWidth>p.dx && bird.dx<p.dx+this.dWidth && bird.dy>bottomYPosition){
                    state.currentState = state.gameOverState;
                    hit.play();
                }
            }
        }
    },
    reset: function()
    {
        this.position = [];
    }
}

var ball = {
    sx: 240,
    sy:240,
    sWidth: 1760,
    sHeight: 1760,
    position: [],
    dWidth: 30,
    dHeight: 30,
    speed: 4,
    
    draw: function()
    {
        for (let i = 0; i < this.position.length; i++) {
            const p = this.position[i];
            ctx.drawImage(ballImg,this.sx,this.sy,this.sWidth,this.sHeight,p.dx,p.dy,this.dWidth,this.dHeight);
        }
        
    },
    update: function()
    {
        // update balls when in game play state
        if(state.currentState === state.gamePlayState)
        {
            if(frames%100 === 0)
            {
                this.position.push(
                    {
                        dx: cvs.width,
                        dy: Math.random()*400
                    }
                )
            }
            for (let i = 0; i < this.position.length; i++) {
                // move balls to right to left
                const p = this.position[i];
                p.dx = p.dx - this.speed;
                // romoving balls
                if(p.dx+this.sWidth < 0)
                {
                    this.position.shift();
                }
    
                // check if collision
                if(bird.dx+bird.dWidth>p.dx && bird.dx<p.dx+this.dWidth && bird.dy<p.dy+this.dHeight && bird.dy+bird.dHeight>p.dy){
                    state.currentState = state.gameOverState;
                    hit.play();
                }
            }
        }
    },
    reset: function()
    {
        this.position = [];
    }
}

const score ={
    value: 0,
    best: parseInt(localStorage.getItem("best")) || 0,
    draw: function()
    {
        ctx.fillStyle = "#000000";
        if(state.currentState === state.gamePlayState)
        {
            ctx.font = "50px serif";
            ctx.fillText(this.value, cvs.width/2, 100);
        }
        if(state.currentState === state.gameOverState)
        {
            ctx.font = "35px serif";
            ctx.fillText(this.value, cvs.width/2 + 65, 365);
            ctx.font = "35px serif";
            ctx.fillText(this.best, cvs.width/2 + 65, 408);
        }
    },
    reset: function()
    {
        this.value = 0;
    }
}

// img.onload =function(){
//     cloud.draw();
//     field.draw();
// }


function loop() {
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0,0,cvs.width,cvs.height)
    cloud.draw();
    pipes.draw();
    pipes.update();
    ball.draw();
    ball.update();
    field.draw();
    field.update();
    bird.draw();
    bird.update();
    getReady.draw();
    gameOver.draw();
    score.draw();
    requestAnimationFrame(loop);
}
loop();