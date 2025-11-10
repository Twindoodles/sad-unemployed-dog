let happiness = 20;

var spriteSheet = document.querySelector('.dog_spritesheet');
var display = document.querySelector('.dog');
var dog = document.querySelector('.interactiveArea');
var happinessMeter = document.querySelector('#happinessBar');
var heart = document.querySelector('.heartSpriteSheet');
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
            clearTimeout(timerHeart);
            addHappiness(0.2);
            addHeart();
        } 
    }

    // Update the previous position for the next event
    previousX = currentX;
    previousY = currentY;
});

let timerDefault; 
let timerHeart;

// visual for petting the dog
dog.addEventListener('mouseover', () => {
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
    clearTimeout(timerHeart);
    addHappiness(0.2);
    addSmooch(e);
    addHeart();
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
    heart.style.opacity = "1";
    // Remove the element after the animation duration (e.g., 600ms for pulseEffect)
    timerHeart = setTimeout(() => {
        heart.style.opacity = "0";
    }, 600);
}

function updateHappinessBar() {
  const happinessPercentage = (happiness / 100) * 100;
  happinessMeter.style.width = `${happinessPercentage}%`;
}

// chat with the dog 
const sales = [
    {
        action: "Salesman Chad wants to talk!",
        opt1: {
            text: "Tell him you're not interested",
            nextpoint: 1,
            happiness: 20,
        },
        opt2:  {
            text: "Hear him out",
            nextpoint: 2,
            happiness: 20,
        },
    },
    {
        action: "He has a rebuttal for that! 'Sir, a classy man like you needs this car!'",
        opt1: {
            text: "We're not even at a dealership!",
            nextpoint: 0,
            happiness: 20,
        },
        opt2: {
            text: "Ooo a new car",
            nextpoint: 2,
            happiness: 20,
        }
    },
    {
        action: "Ssssoooooooo, what kind of TV service do you have?",
        opt1: {
            text: "Tell him your landlord pays for it",
            nextpoint: 1,
            happiness: 20,
        },
        opt2: {
            text: "Tell him you don't watch much TV",
            nextpoint: 0,
            happiness: 20,
        }
    }
];

const state = {
  index: 0,
  data: sales,
  get current() {
    return this.data[this.index]
  }
};

const ui = {
  action: document.querySelector('#action-text'),
  left: document.querySelector('#option-1'),
  right: document.querySelector('#option-2')
};

const update = (nextpoint) => {
  state.index = nextpoint;
  render();
};

const render = () => {
  ui.action.innerText = state.current.action;
  ui.left.innerText = state.current.opt1.text;
  ui.right.innerText = state.current.opt2.text;
  happiness += parseFloat(state.current.happiness);
  console.log(parseFloat(state.current.happiness));
};

ui.left.addEventListener('click', () => update(state.current.opt1.nextpoint));
ui.right.addEventListener('click', () => update(state.current.opt2.nextpoint));

render();

