document.addEventListener('DOMContentLoaded', function() {
    
    // 延遲時間設定為 2.5 秒 (2500 毫秒)
    const DELAY_TIME_MS = 2500;
    
    // 頁面載入完成後，延遲 2.5 秒執行分數生成和顯示
    setTimeout(calculateAndDisplayScores, DELAY_TIME_MS);

    /**
     * 產生 20 到 100 之間的隨機分數
     * 註：修正了最低分從 30 變為 20 的範圍，以匹配您函式內的設定。
     * @returns {number} 隨機分數
     */
    function getRandomScore() {
        const MIN_SCORE = 20;
        const MAX_SCORE = 100;
        // Math.floor(Math.random() * (最大值 - 最小值 + 1)) + 最小值
        return Math.floor(Math.random() * (MAX_SCORE - MIN_SCORE + 1)) + MIN_SCORE; 
    }
    
    /**
     * 計算分數並顯示到頁面上
     */
    function calculateAndDisplayScores() {
        const scoreEmotion = getRandomScore();
        const scoreCareer = getRandomScore();
        const scoreEnergy = getRandomScore();

        // 2. 更新分數顯示
        document.getElementById('scoreEmotion').textContent = scoreEmotion;
        document.getElementById('scoreCareer').textContent = scoreCareer;
        document.getElementById('scoreEnergy').textContent = scoreEnergy;

        // 3. 視覺化顯示表情符號
        document.getElementById('emojiEmotion').innerHTML = generateEmojiDisplay(scoreEmotion, '❤️');
        document.getElementById('emojiCareer').innerHTML = generateEmojiDisplay(scoreCareer, '⭐');
        document.getElementById('emojiEnergy').innerHTML = generateEmojiDisplay(scoreEnergy, '⚡');
    }

    /**
     * 根據分數，使用五個單位 (每 20 分一個單位) 產生表情符號
     * @param {number} score 分數
     * @param {string} emoji 表情符號
     * @returns {string} 由表情符號組成的 HTML 字串
     */
    function generateEmojiDisplay(score, emoji) {
        // 1. 將分數除以 20，並四捨五入到最接近的整數單位
        // 確保 numUnits 至少為 1 (如果分數是 20，20/20=1)
        // 註：修正了 Math.max() 缺少參數的問題。
        let numUnits = Math.round(score / 20);

        // 由於最低分數是 20，numUnits 至少為 1。我們強制最低顯示為 1 個符號。
        numUnits = Math.max(1, numUnits);

        // 確保最多不超過 5 個單位 (100 / 20 = 5)
        if (numUnits > 5) {
            numUnits = 5;
        }
        
        // 視覺化邏輯：
        // 20-30 -> 1, 31-50 -> 2, 51-70 -> 3, 71-90 -> 4, 91-100 -> 5 個符號
        
        // 使用 repeat 方法產生表情符號字串
        return emoji.repeat(numUnits);
    }
});