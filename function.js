let snakebox = document.getElementById("snakebox");
let snakespeed = 15;
let lasttime = 0;
let snakeloc = [
    {x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 25) }
];
let food = {x: Math.floor(Math.random() * 24), y: Math.floor(Math.random() * 24)};
let inputdir = { x: 0, y: 0};
let score = 0;
// let snakeloc = [
//     {x: 12, y: 13 }
// ]
// let food = {x: 2, y: 5}

gamefunction = function(){


    //when snake collapses

    function snakecollapse(snakeloc){
        for(let i=1; i<snakeloc.length; i++){
            if(snakeloc[0].x == snakeloc[i].x && snakeloc[0].y == snakeloc[i].y){
                return true;
            }
        }
        return false; 
    } 

    if(snakecollapse(snakeloc)){
         inputdir = {x: 0, y: 0 };
        alert('game over, press key to play again');
        snakeloc = [
            {x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 25) }
        ];
        food = {x: Math.floor(Math.random() * 24), y: Math.floor(Math.random() * 24)};
        score = 0;
    }

    //when snake eats food
    if(snakeloc[0].y == food.y && snakeloc[0].x == food.x){
         score+=1;
         snakeloc.unshift({x: snakeloc[0].x + inputdir.x, y: snakeloc[0].y + inputdir.y}) ;
         food = {x: Math.floor(Math.random() * 24), y: Math.floor(Math.random() * 24)};
         console.log(snakeloc.length);

    } 

    //for boundaries
    switch(snakeloc[0].x){
        case 0: 
            snakeloc[0].x =25;
            break;
        case 26:
            snakeloc[0].x =1;
            break;
    }

    switch(snakeloc[0].y){
        case 0: 
            snakeloc[0].y =25;
            break;
        case 26:
            snakeloc[0].y =1;
            break;
    }
    console.log(snakeloc[0].x+ ' ' + snakeloc[0].y);
    
    //to move snake
    for(let i = snakeloc.length-2; i>=0; i--){
        snakeloc[i+1] = {...snakeloc[i]}; 
    }
    snakeloc[0].x +=inputdir.x;
    snakeloc[0].y +=inputdir.y;

    snakebox.innerHTML='';
    snakeloc.forEach((e, index)=>{
        addsnakelen = document.createElement('div');
        addsnakelen.style.gridRowStart = e.y;
        addsnakelen.style.gridColumnStart = e.x; 
        // console.log(index);
        if( index === 0){
            addsnakelen.classList.add('snakehead');
            // 
        }
        else{addsnakelen.classList.add('snake');}
        snakebox.appendChild(addsnakelen); 
    })
    addfood = document.createElement('div');
    addfood.style.gridRowStart = food.y;
    addfood.style.gridColumnStart = food.x;
    addfood.classList.add('food'); 
    snakebox.appendChild(addfood);

}

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lasttime)/1000 < 1/snakespeed){
        // console.log(ctime);
        return;
    } 
    lasttime = ctime ;
    gamefunction(); 
}
window.requestAnimationFrame(main); 
window.addEventListener('keydown', e=>{
    //  inputdir.y = 1;
    switch(e.key){
        case 'ArrowUp':
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case 'ArrowDown':
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case 'ArrowRight':
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        case 'ArrowLeft':
            inputdir.x = -1;
            inputdir.y = 0;
            break;

         default :
            break;
    }

});
