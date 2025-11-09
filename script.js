let happiness = 20;

var spriteSheet = document.querySelector('.dog_spritesheet');
var display = document.querySelector('.dog');
var dog = document.querySelector('.interactiveArea');
var happinessMeter = document.querySelector('#happinessBar');
var feed = document.querySelector('#feed');
const classStates = ["happiest", "happy", "neutral", "sad", "saddest"];

let smooch = new Audio('kiss.wav'); 

// default state based on happiness 
function setDefaultState() {
    spriteSheet.classList.remove(...classStates);
    switch(true) {
        case happiness >= 90: 
            spriteSheet.classList.add("happiest");
            break;
        case happiness < 90 && happiness >= 75: 
            spriteSheet.classList.add("happy");
            break;
        case happiness < 75 && happiness >= 50: 
            spriteSheet.classList.add("neutral");
            break;
        case happiness < 50 && happiness >= 20: 
            spriteSheet.classList.add("sad");
            break;
        case happiness < 20: 
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
            addHeart();
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
    timerDefault = setTimeout(function() {setDefaultState()}, 600);
});

dog.style.cursor = "grab";

// smooch the dog
dog.addEventListener('click', (e) => {
    clearTimeout(timerDefault);
    addHappiness(0.2);
    addSmooch(e);
    addHeart();
    smooch.load();
    smooch.play();
});

// feed the dog
feed.addEventListener('click', (e) => {
    dog.src = 'feed_dog.gif';
    addHappiness(20);
    setDefaultState();
    smooch.load();
    smooch.play();
});

// helper function to add happiness
function addHappiness(num) {
    if (happiness > 100) {
        happiness = 100;
    } else {
        happiness += num;
    }
    updateHappinessBar();
}

function addSmooch(e) {
    // Create a new animation element
    const smoochFrame = document.createElement('div');
    const smoochSpriteSheet = document.createElement('img');
    smoochSpriteSheet.src = 'smooch.png';
    smoochFrame.classList.add('smoochFrame');
    smoochSpriteSheet.classList.add('smoochSpriteSheet');
    smoochSpriteSheet.classList.add('pixelart');
    smoochFrame.style.position = 'absolute';
    smoochFrame.appendChild(smoochSpriteSheet);

    // Position the element at the cursor's coordinates
    smoochFrame.style.left = `${(e.pageX)}px`;
    smoochFrame.style.top = `${(e.pageY)}px`;

    // Append the element to the container
    document.body.appendChild(smoochFrame);

    // Remove the element after the animation duration (e.g., 600ms for pulseEffect)
    setTimeout(() => {
        smoochFrame.remove();
    }, 600);
}

function addHeart() {
    // Create a new animation element
    const heartFrame = document.createElement('div');
    const heartSpriteSheet = document.createElement('img');
    heartSpriteSheet.src = 'hearts.png';
    heartFrame.classList.add('heartFrame');
    heartSpriteSheet.classList.add('heartSpriteSheet');
    heartSpriteSheet.classList.add('pixelart');
    heartFrame.appendChild(heartSpriteSheet);

    // Position the element at the cursor's coordinates
    heartFrame.style.left = '160px';
    heartFrame.style.top = '40px';

    // Append the element to the container
    display.appendChild(heartFrame);

    // Remove the element after the animation duration (e.g., 600ms for pulseEffect)
    setTimeout(() => {
        heartFrame.remove();
    }, 600);
}

function updateHappinessBar() {
  const happinessPercentage = (happiness / 100) * 100;
  happinessMeter.style.width = `${happinessPercentage}%`;
}

// chat with the dog 
// give the dog a nap