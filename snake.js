function init(){
    canvas=document.getElementById("mycanvas");
    W = H = canvas.width=canvas.height=1000;
    pen=canvas.getContext("2d");
    cs=66;
    gameover=false;
    score=0;

    food_img=new Image();
    food_img.src= "Assets/apple.png";

    trophy=new Image();
    trophy.src= "Assets/trophy.png"


    food=getRandomFood();

    snake={
        init_len : 5,
        color : "blue",
        cells: [],
        direction: "right",

        createsnake: function(){
            for(var i=this.init_len-1;i>=0;i--)
            {
                this.cells.push({x:i,y:0});
            }
        },

        drawsnake: function(){
            for(var i=0;i<this.cells.length;i++)
            {
                pen.fillStyle=this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },

        updatesnake: function(){
            //this.cells.pop();
            var headx=this.cells[0].x;
            var heady=this.cells[0].y;

            if(headx==food.x && heady==food.y)
            {
                food=getRandomFood();
                score++;
            }
            else
            {
                this.cells.pop();
            }

            var nextx,nexty;

            if(this.direction=="right")
            {
                nextx=headx+1;
                nexty=heady;
            }
            else if(this.direction=="left")
            {
                nextx=headx-1;
                nexty=heady
            }
            else if(this.direction=="up")
            {
                nextx=headx;
                nexty=heady-1;
            }
            else if(this.direction=="down")
            {
                nextx=headx;
                nexty=heady+1;
            }

            this.cells.unshift({x:nextx,y:nexty});

            var lastx=Math.round(W/cs);
            var lasty=Math.round(H/cs);

            if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>lastx || this.cells[0].y>lasty)
            {
                gameover=true;
            }
        }

    };
    snake.createsnake();

    function keypressed(e){

        //console.log("Key Pressed",e);

        if(e.key=="ArrowRight")
        {
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft")
        {
            snake.direction="left";
        }
        else if(e.key=="ArrowUp")
        {
            snake.direction="up";
        }
        else if(e.key=="ArrowDown")
        {
            snake.direction="down";
        }
        console.log(snake.direction);
    }

    document.addEventListener('keydown',keypressed);
}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawsnake();

    pen.fillStyle=food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);
}
function update(){
    snake.updatesnake();
}
function getRandomFood(){
    var foodx = Math.round(Math.random()*(W-cs)/cs);
    var foody = Math.round(Math.random()*(H-cs)/cs);

    food={
        x:foodx,
        y:foody,
        color: "red",
    }

    return food;
}
function gameloop(){
    if(gameover==true)
    {
        clearInterval(f);
        alert("Game Over!");
        return;
    }
    draw();
    update();
}

init();
var f=setInterval(gameloop,100);