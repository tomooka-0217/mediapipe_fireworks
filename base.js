// カメラからの映像と、結果を出力するためのcanvasを取得
const video = document.getElementById('input');
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');

const config = {
    locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
};
const hands = new Hands(config);

// カメラの設定
const camera = new Camera(video, {
    onFrame: async () => {
        await hands.send({ image: video });
    },
    width: 600,
    height: 400
});


// オプションの設定
hands.setOptions({
    selfieMode: true, //画像を左右反転
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});


// スタートボタンとストップボタンを有効化
document.getElementById('start')
    .addEventListener('click', () => camera.start());


document.getElementById('stop')
    .addEventListener('click', () => camera.stop());




hands.onResults(results => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);


    if (results.multiHandLandmarks) {

        results.multiHandLandmarks.forEach(marks => {


            // 緑色の線で骨組みを可視化
            drawConnectors(ctx, marks, HAND_CONNECTIONS, { color: '#0f0' });

            // 赤色でランドマークを可視化
            drawLandmarks(ctx, marks, { color: '#f00' });

        })
    }
});