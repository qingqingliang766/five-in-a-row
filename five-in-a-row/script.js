
const boardSize = 15;
let currentPlayer = 'black';
let gameOver = false;
let boardState = Array.from({ length: boardSize }, () => 
  Array.from({ length: boardSize }, () => null)
);

const boardElement = document.querySelector('.board');
const statusElement = document.querySelector('.status');

// 初始化棋盘
function initBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }
  updateStatus();
}

// 处理点击事件
function handleCellClick(event) {
  if (gameOver) return;
  
  const cell = event.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  
  if (boardState[row][col]) return;
  
  boardState[row][col] = currentPlayer;
  cell.classList.add(currentPlayer);
  
  if (checkWin(row, col)) {
    gameOver = true;
    statusElement.textContent = `${currentPlayer === 'black' ? '黑' : '白'}方获胜！`;
    resetButton.style.display = 'block';
    return;
  }
  
  currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
  updateStatus();
}

// 更新状态显示
function updateStatus() {
  statusElement.textContent = `当前玩家：${currentPlayer === 'black' ? '黑' : '白'}方`;
}

// 检查是否获胜
function checkWin(row, col) {
  const directions = [
    [1, 0],   // 垂直
    [0, 1],   // 水平
    [1, 1],   // 对角线
    [1, -1]   // 反对角线
  ];

  for (const [dx, dy] of directions) {
    let count = 1;
    
    // 正向检查
    let x = row + dx;
    let y = col + dy;
    while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && 
           boardState[x][y] === currentPlayer) {
      count++;
      x += dx;
      y += dy;
    }
    
    // 反向检查
    x = row - dx;
    y = col - dy;
    while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && 
           boardState[x][y] === currentPlayer) {
      count++;
      x -= dx;
      y -= dy;
    }
    
    if (count >= 5) return true;
  }
  
  return false;
}

const resetButton = document.querySelector('.reset-button');

// 重置游戏
function resetGame() {
  boardState = Array.from({ length: boardSize }, () => 
    Array.from({ length: boardSize }, () => null)
  );
  currentPlayer = 'black';
  gameOver = false;
  initBoard();
  resetButton.style.display = 'none';
  updateStatus();
}

// 初始化游戏
initBoard();

// 添加重置按钮点击事件
resetButton.addEventListener('click', resetGame);
