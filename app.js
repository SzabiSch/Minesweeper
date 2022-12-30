//Dom
const board = document.querySelector('main');
const display_mines = document.getElementById('mines');
const display_start = document.getElementById('start');
const display_flags = document.getElementById('flags');

//Unicode 
const code_smile = '&#128516';
const code_lost = '&#128531';
const code_win = '&#128525';
const code_bomb = '&#128163';
const code_flag = '&#127988';

//Variables
let height = 10;
let width = 10;
let mine_num = 10;
let flags = 0;
let mineMap = [];
let game_over = true;


createView();
display_start.addEventListener('click', createView);

function createView() {
    board.innerHTML = '';
    display_mines.innerHTML = mine_num;
    display_start.innerHTML = code_smile;
    flags = 0;
    display_flags.innerHTML = flags;
    for (let x = 0; x < width; x++) {
        let col_div = document.createElement('div');
        col_div.setAttribute('class', 'col');
        for (let y = 0; y < height; y++) {
            let field = document.createElement('div');
            field.setAttribute('class' ,'field available ');
            field.setAttribute('id', x+'_'+y);
            field.addEventListener('click', clickField);
            //field.addEventListener('contextmenu', flagField);
            col_div.append(field);
        }
        board.append(col_div); 
}
}

function createMap(click_x, click_y){
   //Build MapArray
   for (let x = 0; x < width; x++){
    mineMap[x] = [];
     for (let y = 0; y <height; y++) {
        mineMap[x][y]= 0;
     }
   }
//Da werden die Minen und ihre Pleatze generiert
   for (let mine = 0; mine < mine_num; mine++){
        mine_y = click_y;
        mine_x = click_x;
        while (mineMap[mine_x][mine_y] == 'M' || (mine_x == click_x && mine_y == click_y)){
            mine_x = Math.floor(Math.random() * width);
            mine_y = Math.floor(Math.random() * height);
        }
        mineMap[mine_x][mine_y] = 'M';
        //set the numbers around the Mines
        for (let x = mine_x - 1; x <= mine_x + 1; x++){
            for (let y = mine_y - 1; y <= mine_y + 1; y++){
                if (x >= 0 && y >= 0 && x < width && y < height) {
                    if (mineMap[x][y] != 'M') {
                        mineMap[x][y]++;
                    }
                }
            }   
        }


   }

 game_over = false;
 showField(click_x, click_y);

}

function clickField(e) {
let id = e.target.id
let x = Number(id.split('_')[0]);
let y = Number(id.split('_')[1]);

if (game_over) {
    createMap(x,y);
    } 
    else {
        showField(x,y);
    }
}

function showField(cord_x, cord_y) {
    field = document.getElementById(cord_x+'_'+cord_y);
    if(field.classList.contains('available')) { 
        field.classList.remove('available');
        if (mineMap[cord_x][cord_y] == 'M') {
            //LOSE
        }
        else if (mineMap[cord_x][cord_y] == 0){
            //Rekursion
        }
        else {
            field.innerHTML = mineMap[cord_x][cord_y];
            //WIN
        }
    }
}