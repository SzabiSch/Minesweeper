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
createMap(0, 0);

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

   for (let mine = 0; mine < mine_num; mine++){
        mine_y = click_y;
        mine_x = click_x;
        while (mineMap[mine_x][mine_y] == 'M' || (mine_x == click_x && mine_y == click_y)){
            mine_x = Math.floor(Math.random() * width);
            mine_y = Math.floor(Math.random() * height);
        }
        mineMap[mine_x][mine_y] = 'M';


   }
 console.log(mineMap);

}