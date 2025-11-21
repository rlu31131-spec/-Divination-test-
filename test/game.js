document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const startButton = document.getElementById('start-button');
    const clickCountDisplay = document.getElementById('click-count');
    const timerDisplay = document.getElementById('timer-display');
    const totalTiles = 20;

    let tiles = [];
    let currentNumber = 1;
    let startTime;
    let timerInterval;
    let gameStarted = false;

    /**
     * 初始化遊戲格子
     */
    function initializeTiles() {
        gameContainer.innerHTML = ''; // 清空舊格子
        tiles = [];
        const numbers = Array.from({ length: totalTiles }, (_, i) => i + 1);
        
        // 隨機打亂數字
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        // 生成格子 DOM 元素
        numbers.forEach(number => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = number;
            tile.dataset.number = number;
            
            // 只有數字 1 初始為活躍狀態
            if (number === 1) {
                tile.classList.add('active');
            }
            
            tile.addEventListener('click', handleTileClick);
            gameContainer.appendChild(tile);
            tiles.push(tile);
        });
        
        // 重置顯示
        clickCountDisplay.textContent = '0';
        timerDisplay.textContent = '0.000';
    }

    /**
     * 處理點擊事件
     * @param {Event} event 點擊事件對象
     */
    function handleTileClick(event) {
        if (!gameStarted) return; 

        const clickedTile = event.target;
        const number = parseInt(clickedTile.dataset.number);

        if (number === currentNumber) {
            // 點擊正確
            clickedTile.classList.remove('active');
            clickedTile.classList.add('clicked');

            currentNumber++;
            clickCountDisplay.textContent = currentNumber - 1;

            // 遊戲結束檢查
            if (currentNumber > totalTiles) {
                endGame(true);
                return;
            }

            // 尋找下一個要點擊的數字並設置為 active
            const nextTile = tiles.find(t => parseInt(t.dataset.number) === currentNumber);
            if (nextTile) {
                nextTile.classList.add('active');
            }

        } else if (number > currentNumber) {
            // 點擊錯誤
            endGame(false);
        }
        // 如果點擊了已經點過的（clicked 狀態）或數字小於 currentNumber，則忽略，因為 pointer-events: none; 已經處理了 clicked 狀態
    }

    /**
     * 開始計時器
     */
    function startTimer() {
        startTime = performance.now();
        timerInterval = setInterval(() => {
            const elapsedTime = performance.now() - startTime;
            timerDisplay.textContent = (elapsedTime / 1000).toFixed(3);
        }, 10); // 每 10 毫秒更新一次
    }

    /**
     * 停止計時器
     */
    function stopTimer() {
        clearInterval(timerInterval);
    }

    /**
     * 啟動遊戲
     */
    function startGame() {
        if (gameStarted) {
            endGame(false); // 如果已經開始，重新點擊視為重置
        }
        
        initializeTiles();
        currentNumber = 1;
        gameStarted = true;
        startButton.textContent = '進行中...';
        startButton.disabled = true;

        startTimer();
    }

    /**
     * 結束遊戲
     * @param {boolean} success 是否成功完成所有點擊
     */
    function endGame(success) {
        stopTimer();
        gameStarted = false;
        startButton.disabled = false;
        startButton.textContent = '重新開始';

        const finalTime = timerDisplay.textContent;

        if (success) {
            alert(`恭喜您！🎉 成功點擊 20 個格子！您的反應時間是 ${finalTime} 秒！`);
        } else {
            alert(`遊戲失敗！❌ 您點錯了格子。請點擊「重新開始」再試一次。`);
        }
    }

    // 綁定開始按鈕事件
    startButton.addEventListener('click', startGame);

    // 頁面載入時先初始化格子（顯示靜態 1-20，等待點擊開始）
    initializeTiles();
    
    // 讓所有格子在遊戲未開始時不能點擊
    gameContainer.style.pointerEvents = 'none';
    startButton.addEventListener('click', () => {
        gameContainer.style.pointerEvents = 'auto'; // 遊戲開始後啟用
    });
});