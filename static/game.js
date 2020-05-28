let socket = io();

socket.on('message', function(data) {
    console.log(data);
})


let movement = {
    up: false,
    down: false,
    rigt: false,
    left: false
}

document.addEventListener('keydown',function(event) {
    switch(event.keyCode) {
        case 87: //W
        case 38: //Arrow Up
            movement.up = true;
            break;
        case 65: //A
        case 37: //Arrow Left
            movement.left = true;
            break;
        case 83: //S
        case 40: //Arrow Down
            movement.down = true;
            break;
        case 68: //D
        case 39: //Arrow Right
            movement.right = true;
            break;
    }
})

document.addEventListener('keyup',function(event) {
    switch(event.keyCode) {
        case 87: //W
        case 38: //Arrow Up
            movement.up = false;
            break;
        case 65: //A
        case 37: //Arrow Left
            movement.left = false;
            break;
        case 83: //S
        case 40: //Arrow Down
            movement.down = false;
            break;
        case 68: //D
        case 39: //Arrow Right
            movement.right = false;
            break;
    }
})

socket.emit('prisoner joined')
setInterval(function() {
socket.emit('movement', movement)
}, 1000 / 60)

let canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 500;
let context = canvas.getContext('2d');
let sprite = new Image();
let tile1 = new Image();
let tile2 = new Image();
let wallpaper = new Image();

socket.on('state', function(prisoners) {
    context.clearRect(0,0,800,600);
    for (let id in prisoners) {
        let prisoner = prisoners[id];
        context.beginPath();
        context.drawImage(wallpaper,0,0,500,500);
        context.fill();
        context.beginPath();
        //context.rect(0,0,500,500);

        context.fill();
        context.beginPath();
        context.drawImage(sprite,prisoner.x,prisoner.y,100,100);
        context.fill();
    }
})
sprite.src = '/static/sprite.png';
tile1.src = '/static/BGTile (3).png';
tile2.src = '/static/BGTile (4).png';
wallpaper.src = '/static/Background.png';