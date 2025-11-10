let happiness = 20;

var spriteSheet = document.querySelector('.dog_spritesheet');
var display = document.querySelector('.dog');
var dog = document.querySelector('.interactiveArea');
var happinessMeter = document.querySelector('#happinessBar');
var heart = document.querySelector('.heartSpriteSheet');
const classStates = ["happiest", "happy", "neutral", "sad", "saddest"];

let smooch = new Audio('kiss.wav'); 
let click = new Audio('click.wav');

// helper function to add happiness
function addHappiness(num) {
    if (happiness > 100) {
        happiness = 100;
    } else if (happiness < 0) {
        happiness = 0;
    } else {
        happiness += num;
    }
    updateHappinessBar();
}

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
  if (happinessPercentage > 100) happinessPercentage = 100;
  if (happinessPercentage < 0) happinessPercentage = 0;
  happinessMeter.style.width = `${happinessPercentage}%`;
}

// chat with the dog 
const sales = [
    {
        action: "",
        opt1: {
            text: "What's wrong lil dude?",
            nextpoint: 1,
            happiness: 0,
        },
        opt2:  {
            text: "",
            nextpoint: 1,
            happiness: 0,
        },
    },
    {
        action: `"Can't talk. Too busy applying."`,
        opt1: {
            text: "Are you getting a job?",
            nextpoint: 2,
            happiness: 0,
        },
        opt2: {
            text: "Why would a dog need a job?",
            nextpoint: 2,
            happiness: 0,
        }
    },
    {
        action: `"My treats aren't going to buy themselves."`,
        opt1: {
            text: "Even dogs have to work in this economy?",
            nextpoint: 5,
            happiness: 0,
        },
        opt2: {
            text: "Offer to adopt",
            nextpoint: 3,
            happiness: -20,
        }
    },
    {
        action: `"NOOOOOO!!!! I don't want to leave my hooman!!!!!"`,
        opt1: {
            text: "Well they sound like a bad hooman if they’re making you work",
            nextpoint: 4,
            happiness: 0,
        },
        opt2: {
            text: "",
            nextpoint: 0,
            happiness: 0,
        }
    },
    {
        action: `"They’ve been giving up their meals for me. I want to repay them."`,
        opt1: {
            text: "Oh...",
            nextpoint: 5,
            happiness: 0,
        },
        opt2: {
            text: "",
            nextpoint: 0,
            happiness: 0,
        }
    },
    {
        action: `"I want to be a taste tester, but no one is hiring me "`,
        opt1: {
            text: "(have they ever been?)",
            nextpoint: 6,
            happiness: 0,
        },
        opt2: {
            text: "Offer to help",
            nextpoint: 6,
            happiness: 10,
        }
    },
    {
        action: `"Here, you can review my resume"`,
        opt1: {
            text: "(Degree in being cute?!)",
            nextpoint: 7,
            happiness: 0,
        },
        opt2: {
            text: "(Won big back contest in 2017 against 50 other dogs?!)",
            nextpoint: 7,
            happiness: 0,
        }
    },
    {
        action: ``,
        opt1: {
            text: "(They really are qualified)",
            nextpoint: 8,
            happiness: 0,
        },
        opt2: {
            text: "",
            nextpoint: 8,
            happiness: 0,
        }
    },
    {
        action: `"I feel like I have no future "`,
        opt1: {
            text: "Continue",
            nextpoint: 9,
            happiness: -10,
        },
        opt2: {
            text: "",
            nextpoint: 9,
            happiness: 0,
        }
    },
    {
        action: `"I’ve been applying all year but there’s nothing…"`,
        opt1: {
            text: "Continue",
            nextpoint: 10,
            happiness: -10,
        },
        opt2: {
            text: "",
            nextpoint: 10,
            happiness: 0,
        }
    },
        {
        action: `"What am I going to tell my hooman?"`,
        opt1: {
            text: "I think your hooman…",
            nextpoint: 11,
            happiness: 0,
        },
        opt2: {
            text: "",
            nextpoint: 11,
            happiness: 0,
        }
    },
            {
        action: ``,
        opt1: {
            text: "Is going to say that they’re proud of you",
            nextpoint: 12,
            happiness: 20,
        },
        opt2: {
            text: "",
            nextpoint: 12,
            happiness: 0,
        }
    },
    {
        action: ``,
        opt1: {
            text: "And that they’ll love you no matter what",
            nextpoint: 13,
            happiness: 20,
        },
        opt2: {
            text: "",
            nextpoint: 12,
            happiness: 0,
        }
    },
    {
        action: `"Really?"`,
        opt1: {
            text: "Yeah. They'd be a monster if they didn't.",
            nextpoint: 14,
            happiness: 20,
        },
        opt2: {
            text: "",
            nextpoint: 12,
            happiness: 0,
        }
    },
        {
        action: ``,
        opt1: {
            text: "You've been a good dog.",
            nextpoint: 15,
            happiness: 40,
        },
        opt2: {
            text: "Pet the dog",
            nextpoint: 15,
            happiness: 40,
        }
    },
            {
        action: `The end :)`,
        opt1: {
            text: "",
            nextpoint: 14,
            happiness: 20,
        },
        opt2: {
            text: "",
            nextpoint: 14,
            happiness: 20,
        }
    },
    
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
};


ui.left.addEventListener('click', () => {
    let addedHappiness = parseInt(state.current.opt1.happiness);
    aniReaction(addedHappiness);
    addHappiness(addedHappiness);
    update(state.current.opt1.nextpoint);
    click.play();
});

ui.right.addEventListener('click', () => {
    let addedHappiness = parseInt(state.current.opt2.happiness);
    aniReaction(addedHappiness);
    addHappiness(addedHappiness);
    update(state.current.opt2.nextpoint);
    click.play();
});
ui.left.style.cursor = "pointer";
ui.right.style.cursor = "pointer";
render();

function aniReaction(addedHappiness) {
    if (addedHappiness > 0) {
        clearTimeout(timerDefault);
        addHeart();
        spriteSheet.classList.remove(...classStates);
        spriteSheet.classList.add("happiest");
        timerDefault = setTimeout(function() {setDefaultState()}, 600);
    } else if (addedHappiness < 0) {
        clearTimeout(timerDefault);
        spriteSheet.classList.remove(...classStates);
        spriteSheet.classList.add("saddest");
        timerDefault = setTimeout(function() {setDefaultState()}, 600);
    }
}