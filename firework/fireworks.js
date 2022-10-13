import { Fireworks } from 'https://cdn.skypack.dev/fireworks-js';

const container = document.querySelectorAll('.fireworks_container');


function createFirework(container){
    let fireworks = new Fireworks(container,{
        autoresize: true,
        opacity: 0.2,
        acceleration: 1.01,
        friction: 0.96,
        gravity: 1.7,
        particles: 50,
        traceSpeed: 1,
        explosion: 5,
        intensity: 7,
        flickering: 50,
        lineStyle: 'round',
        hue: {
            min: 17,
            max: 28
        },
        delay: {
            min: 25,
            max: 55
        },
        rocketsPoint: {
            min: 50,
            max: 50
        },
        lineWidth: {
            explosion: {
                min: 1,
                max: 3
            },
            trace: {
                min: 2.7,
                max: 5.2
            }
        },
        brightness: {
            min: 45,
            max: 80
            },
        decay: {
            min: 0.008,
            max: 0.025
        },
        mouse: {
            click: false,
            move: false,
            max: 1
        }
        
    });

    return fireworks;
}

// fireworks.start();

export {createFirework};