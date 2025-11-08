let happiness = -100;

var dog = document.querySelector('img');
var happinessMeter = document.querySelector('#happiness');
var feed = document.querySelector('#feed');

let previousX;
let previousY;
const hThreshold = 53; // Your desired distance threshold
const iThreshold = 2; // Your desired distance threshold

//pet the dog
dog.addEventListener('mousemove', (e) => {
    const currentX = e.clientX;
    const currentY = e.clientY;

    if (previousX !== undefined && previousY !== undefined) {
        const deltaX = currentX - previousX;
        const deltaY = currentY - previousY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance >= hThreshold) {
            addHappiness(1);
        } 
    }

    // Update the previous position for the next event
    previousX = currentX;
    previousY = currentY;
});

// smooch the dog
dog.addEventListener('click', (e) => {
    addHappiness(5);
});

// feed the dog
feed.addEventListener('click', (e) => {
    dog.src = 'feed_dog.gif';
    addHappiness(20);
});

// helper function to add happiness
function addHappiness(num) {
    if (happiness > 100) {
        happiness = 100;
    } else {
        happiness += num;
    }
    happinessMeter.textContent = happiness;
}

// chat with the dog 
// give the dog a nap