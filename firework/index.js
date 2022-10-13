import { createFirework } from './fireworks.js';

// カメラからの映像と、結果を出力するためのcanvasを取得
const video = document.getElementById('input');
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');
const content_width = 1200;
const content_height = 800;
var fireworks_container = document.querySelectorAll('.fireworks_container');


// 花火用コンテナの数だけ関数名用の文字列を配列に追加
let functionArray = [];
// for(let i = 0; i<fireworks_container.length; i++){
//     functionArray[i] = 'fire' + i;
// }

// 花火用コンテナの数だけ関数を作成
for(let i=0; i<fireworks_container.length; i++){
    functionArray[i] = createFirework(fireworks_container[i]);
}


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

    if (results.multiHandLandmarks.length > 0) {
        var fireworks_container = document.querySelectorAll('.fireworks_container');

        if(results.multiHandLandmarks.length > fireworks_container.length){

            let el = document.createElement('div');
            el.classList.add('fireworks_container');
            document.body.appendChild(el);
            var fireworks_container = document.querySelectorAll('.fireworks_container');

            let num = fireworks_container.length-1
            functionArray[num] = 'fire' + num;
            functionArray[num] = createFirework(fireworks_container[num]);
            functionArray[num].start();
        }
        
        let num = 0;
        results.multiHandLandmarks.forEach(marks => {
            if (marks[0]['y'] - marks[9]['y'] <= 0.15 && marks[0]['y'] - marks[12]['y'] <= 0.15) {
                functionArray[num].start();
                fireworks_container[num].style.top = content_height * marks[9]['y']-600 + 'px';
                fireworks_container[num].style.left = content_width * marks[9]['x']-150 + 'px';

            }else{
                functionArray[num].waitStop(true);
            }

            // if(marks[0]['y'] <= 0.1 || marks[0]['y'] >= 0.9 || marks[0]['x'] <= 0.1 || marks[0]['x'] >= 0.9){
            //     functionArray[num].waitStop(true);
            //     functionArray.splice(num,1);
            //     if(fireworks_container.length > 1){
            //         fireworks_container[num].remove();
            //     }
            // }

            // 緑色の線で骨組みを可視化
            drawConnectors(ctx, marks, HAND_CONNECTIONS, { color: '#0f0' });
            num++;

        })
        
    }else{
        functionArray[0].waitStop(true);
        if(Array.isArray(fireworks_container) && fireworks_container.length > 1){
            for(let i=1; i<fireworks_container.length-1; i++){
                functionArray[i].waitStop(true);
                fireworks_container[i].remove();
                functionArray.splice(i,1);
            }
        }
        
    }
    
});