let happiness = 0;

var spriteSheet = document.querySelector('.dog_spritesheet');
var display = document.querySelector('.dog');
var dog = document.querySelector('.interactiveArea');
var happinessMeter = document.querySelector('#happiness');
var feed = document.querySelector('#feed');
const classStates = ["happiest", "happy", "neutral", "sad", "saddest"];

let smooch = new Audio('kiss.wav'); 

// default state based on happiness 
function setDefaultState() {
    spriteSheet.classList.remove(...classStates);
    switch(true) {
        case happiness >= 70: 
            spriteSheet.classList.add("happiest");
            break;
        case happiness < 70 && happiness >= 51: 
            spriteSheet.classList.add("happy");
            break;
        case happiness < 51 && happiness >= 0: 
            spriteSheet.classList.add("neutral");
            break;
        case happiness < 0 && happiness >= -50: 
            spriteSheet.classList.add("sad");
            break;
        case happiness < -50: 
            spriteSheet.classList.add("saddest");
            break;
    }
}

let previousX;
let previousY;
const threshold = 70; // Your desired distance threshold

// pet the dog increases happiness
dog.addEventListener('mousemove', (e) => {
    const currentX = e.clientX;
    const currentY = e.clientY;

    if (previousX !== undefined && previousY !== undefined) {
        const deltaX = currentX - previousX;
        const deltaY = currentY - previousY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance >= threshold) {
            addHappiness(0.2);
            addLove(e);
        } 
    }

    // Update the previous position for the next event
    previousX = currentX;
    previousY = currentY;
});

let timerDefault; 

// visual for petting the dog
dog.addEventListener('mouseover', (e) => {
    clearTimeout(timerDefault);
    spriteSheet.classList.remove(...classStates);
    spriteSheet.classList.add("happiest");
});

dog.addEventListener('mouseout', (e) => {
    timerDefault = setTimeout(function() {setDefaultState()}, 250);
});

dog.style.cursor = "grab";

// smooch the dog
dog.addEventListener('click', (e) => {
    clearTimeout(timerDefault);
    spriteSheet.classList.remove(...classStates);
    spriteSheet.classList.add("happiest");
    addHappiness(5);
    addHearts(e);
    addLove(e);
    smooch.load();
    smooch.play();
});

// feed the dog
feed.addEventListener('click', (e) => {
    dog.src = 'feed_dog.gif';
    addHappiness(20);
    setDefaultState();
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

function addHearts(e) {
    // Create a new animation element
    const heartFrame = document.createElement('div');
    const heartSpriteSheet = document.createElement('img');
    heartSpriteSheet.src = 'hearts.png';
    heartFrame.classList.add('heartFrame');
    heartSpriteSheet.classList.add('heartSpriteSheet');
    heartSpriteSheet.classList.add('heartSpriteSheet');
    heartFrame.appendChild(heartSpriteSheet);

    // Position the element at the cursor's coordinates
    heartFrame.style.left = `${(e.clientX) - 82}px`;
    heartFrame.style.top = `${(e.clientY) - 64}px`;

    // Append the element to the container
    display.appendChild(heartFrame);

    // Remove the element after the animation duration (e.g., 600ms for pulseEffect)
    setTimeout(() => {
        heartFrame.remove();
    }, 600);
}

function addLove(e) {
    // Create a new animation element
    const heartFrame = document.createElement('div');
    const heartSpriteSheet = document.createElement('img');
    heartSpriteSheet.src = 'hearts.png';
    heartFrame.classList.add('loveFrame');
    heartSpriteSheet.classList.add('loveSpriteSheet');
    heartSpriteSheet.classList.add('loveSpriteSheet');
    heartFrame.appendChild(heartSpriteSheet);

    // Append the element to the container
    display.appendChild(heartFrame);

    // Remove the element after the animation duration (e.g., 600ms for pulseEffect)
    setTimeout(() => {
        heartFrame.remove();
    }, 600);
}

// chat with the dog 
// give the dog a nap