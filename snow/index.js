// カメラからの映像と、結果を出力するためのcanvasを取得
const video = document.getElementById('input');
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');



// 雪だるま画像読み込み
const img = new Image(); // Imageオブジェクトの作成

img.onload = function () { }; // 読み込み成功
img.onerror = function () { }; // 読み込み失敗

img.src = "./snowman.png";




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

        // console.log(results.multiHandLandmarks[0]);
        results.multiHandLandmarks.forEach(marks => {

            if (marks[0]['y'] - marks[9]['y'] <= 0.15 && marks[0]['y'] - marks[12]['y'] <= 0.15) {
                ctx.drawImage(img, 600 * marks[9]['x']-img.naturalWidth / 16, 400 * marks[9]['y']-img.naturalHeight / 8, img.naturalWidth / 8, img.naturalHeight / 8);
            }

            // 緑色の線で骨組みを可視化
            // drawConnectors(ctx, marks, HAND_CONNECTIONS, { color: '#0f0' });

            // 赤色でランドマークを可視化
            // drawLandmarks(ctx, marks, { color: '#f00' });

        })
    }
});