const container = document.querySelector('.container');
const video = document.querySelector('#input');
const canvas = document.querySelector('#output');


canvas.style.width = 800 + 'px';
canvas.style.height = 600 + 'px';

var img01 = new Image();
img01.src = "../image/bell.png";

const ctx = canvas.getContext('2d');

//元イメージの座標(50, 50)から幅100高さ50の範囲を使用して、座標(10, 10)の位置に、サイズ200×50でイメージを表示
context.drawImage(img01, 50, 50, 100, 50, 10, 10, 200, 50);

const config = {
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
}

const hands = new Hands(config);

const camera = new Camera(video, {
    onFrame: async () => {
        await hands.send({ image: video });
    },
    width: 800,
    height: 600
});

hands.setOptions({
    selfieMode: true,
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
});

document.querySelector('#start').addEventListener('click', () => camera.start());
document.querySelector('#stop').addEventListener('click', () => camera.stop());



hands.onResults((results) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);


    if (results.multiHandLandmarks) {
        results.multiHandLandmarks.forEach((marks) => {

            // 赤の丸点
            // drawLandmarks(ctx,marks,{color:'red'});
            drawConnectors(ctx, marks, HAND_CONNECTIONS, { color: 'white' });

            // drawCircle(marks[8].x*300, marks[8].y*150);
            drawMark(5 * 300, 10 * 150);

            marks.forEach((mark => {
                drawCircle(mark.x * 300, mark.y * 150);
            }))

        });
    }
});



const drawCircle = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2, false);
    ctx.fillstyle = "blue";
    ctx.fill();
}



camera.start();