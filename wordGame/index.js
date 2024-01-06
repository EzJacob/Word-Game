

const wordsArray = [
    "AMBER", "APPLE", "ARROW", "BACON", "BAGEL", "BASIL", "BEACH", "BERRY", "BINGO", "BLACK",
    "BLAZE", "BLINK", "BLISS", "BLOOM", "BLUSH", "BRICK", "BROTH", "BROWN", "BRUSH", "BUNNY",
    "BURST", "CACAO", "CACTI", "CAMEL", "CANDY", "CHAIR", "CHARM", "CHIME", "CHIRP", "CHIVE",
    "CLIMB", "CLOUD", "CLOWN", "CORAL", "CREEK", "CRISP", "CROWN", "CRUNCH", "CRUST", "CUBES",
    "DANCE", "DANDY", "DARTS", "DAZED", "DEALT", "DECAL", "DELVE", "DEMON", "DICEY", "DINGO",
    "DIVER", "DODGE", "DONUT", "DROWN", "EAGLE", "EARTH", "EASEL", "EATEN", "EJECT", "ELBOW",
    "EMBER", "EMPTY", "ENJOY", "EQUIP", "FAIRY", "FANCY", "FERAL", "FERNS", "FIZZY", "FLAME",
    "FLARE", "FLASH", "FLORA", "FLOUR", "FLUTE", "FOCAL", "FORGE", "FUNGI", "FUNNY", "FURRY",
    "FUSED", "GEARS", "GLIDE", "GLOBE", "GLOW", "GNOME", "GRAPE", "GRASS", "GREEN", "GREET",
    "GRIND", "HAPPY", "HAUNT", "HAZEL", "HIKER", "HINGE", "HONEY", "HORSE", "HOTEL", "HOUND",
    "HOUSE", "HUMAN", "HUMOR", "IGLOO", "IMAGE", "INFER", "IVORY", "JELLY", "JOINT", "JOLLY",
    "JUDGE", "JUMPS", "KNACK", "LATCH", "LEAFY", "LEASH", "LEMON", "LIGHT", "LIMES", "LINED",
    "LONER", "LUNCH", "MANGO", "MAPLE", "MIRTH", "MOCHA", "MOOSE", "MUSIC", "NAILS", "NECTAR",
    "NIFTY", "NIGHT", "NINJA", "NOISE", "OLIVE", "ONION", "ORBIT", "OWLRY", "PAINT", "PANDA",
    "PEACH", "PEARL", "PETAL", "PICKY", "PIZZA", "PLAID", "PLUM", "PLUSH", "PRISM", "QUACK",
    "QUEEN", "QUIRK", "RABBIT", "RADAR", "RADII", "RAINY", "RANCH", "RAZOR", "REBEL", "REDOX",
    "REEFY", "RELIC", "RHINO", "RHYME", "RIVER", "ROBIN", "ROCKY", "ROOST", "ROYAL", "RUBY",
    "SABLE", "SAILS", "SAUCE", "SAVOR", "SCALY", "SCARE", "SCATTER", "SCOOP", "SCREW", "SEIZE",
    "SHACK", "SHADOW", "SHAKE", "SHAKY", "SHRED", "SILLY", "SIREN", "SKIES", "SKIRT", "SLICE",
    "SMILE", "SNAIL", "SNAKE", "SOAPY", "SPACE", "SPARK", "SPIKE", "SPINY", "SPIRAL", "SPIRE",
    "SPLAT", "SPORK", "SPRIG", "SQUID", "STAIN", "STALK", "STEER", "STOMP", "STONE", "STUMP",
    "SUNNY", "SWEET", "SWIFT", "SWIRL", "SWORD", "TABLE", "TAILS", "TASTY", "TEASE", "TEDDY",
    "TENSE", "THORN", "TIDES", "TIGER", "TOAST", "TONGS", "TORCH", "TORNADO", "TRAIL", "TRAMP",
    "TRANQ", "TRIBE", "TRICK", "TRILL", "TROOP", "TROUT", "TUNIC", "TWIST", "UMBRA", "UNICORN",
    "UNITY", "URBAN", "URGE", "USHER", "VALLEY", "VIPER", "VITAL", "VOICE", "VULCAN", "WAGON",
    "WANDS", "WATCH", "WATER", "WEAVE", "WHALE", "WHARF", "WHEAL", "WHISK", "WHITE", "WIDGET",
    "WILDS", "WITTY", "WOMAN", "WOVEN", "WRAPS", "YACHT", "YAPPY", "YEARN", "YELLS", "YOGIC",
    "YOUNG", "YUMMY", "ZEBRA", "ZESTY", "ZIGZAG", "ZINGS", "ZIPPER", "ZIPPY", "ZOINK", "ZOOMS"
  ];


const words = wordsArray;
let wordToGuess = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(wordToGuess.length).fill('_');
let attempts = 0;

function displayWord() {
    const wordToGuess = document.getElementById('wordToGuess');
    wordToGuess.style.fontSize = '64px'; // Adjust the font size as needed
    wordToGuess.innerText = guessedWord.join(' ');
}


function createButtons() {
    const buttonsContainer = document.getElementById('buttonsContainer');

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');

        // Set a unique id for each button by appending the letter to a base id
        button.id = 'button-' + letter;

        button.innerText = letter;
        button.onclick = function () {
            if (document.getElementById('guessInput').value.length < 5)
                document.getElementById('guessInput').value += letter;
        };
        buttonsContainer.appendChild(button);
    }
}

function deleteCharacter() {
    const guessInput = document.getElementById('guessInput');
    const currentInput = guessInput.value;
    guessInput.value = currentInput.substring(0, currentInput.length - 1);
}



function displayGuessHistory(guess) {
    const guessHistory = document.getElementById('guessHistory');
    const guessDiv = document.createElement('div');

    for (let i = 0; i < guess.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.style.color = getColors(guess, wordToGuess)[i];
        charSpan.style.fontSize = '64px'; // Adjust the font size as needed

        charSpan.textContent = guess[i];
        guessDiv.appendChild(charSpan);
    }

    guessHistory.appendChild(guessDiv);
}

function getColors(guessInput, givenWord) {
    let colors = ['red', 'red', 'red', 'red', 'red'];
    for (let i = 0; i < guessInput.length; i++) {
        for (let j = 0; j < givenWord.length; j++) {
            if (guessInput[i] == givenWord[j] && i == j) {
                colors[i] = 'green';
                guessedWord[i] = givenWord[j];
                break;
            }
            if (guessInput[i] == givenWord[j]) {
                colors[i] = 'orange';
            }
        }
    }
    return colors;
}

function checkGuess() {
    const userGuess = document.getElementById('guessInput').value.toUpperCase();

    if (userGuess.length === wordToGuess.length && /^[a-zA-Z]+$/.test(userGuess)) {
        
        attempts++
        displayGuessHistory(userGuess);

        checkLetterInWord()

        displayWord();

    } 
    else {
        displayMessage(`Please enter a valid 5-letter guess.`);
    }

    if (guessedWord.join('') === wordToGuess) {
        displayMessage(`Congratulations! You guessed the word in ${attempts} attempts.`);
        disableInputAndButtons();
    } else if (attempts === 6) {
        displayMessage(`Sorry, you've run out of attempts. The correct word was ${wordToGuess}.`);
        disableInputAndButtons();
    }
}

function displayMessage(message) {
    alert(message);
}

function disableInputAndButtons() {
    document.getElementById('guessInput').disabled = true;
    // Disable all buttons except the reset button
    document.querySelectorAll('button:not(#restartButton)').forEach(button => button.disabled = true);
}


function checkLetterInWord() {
    // Get the guess input value and the given word
    const guessInput = document.getElementById('guessInput').value.toUpperCase();
    const givenWord = wordToGuess;
    let color;

    // Iterate through each letter in the guessInput and compare it to the corresponding letter in the given word
    for (let i = 0; i < guessInput.length; i++) {
        color = document.getElementById(`button-${guessInput[i]}`).style.backgroundColor;
        if (color == 'green' || color == 'red') {
            continue;
        }
        for (let j = 0; j < givenWord.length; j++) {
            if (guessInput[i] == givenWord[j] && i == j) {
                color = 'green';
                guessedWord[i] = givenWord[j];
                break;
            }
            else if (guessInput[i] == givenWord[j]) {
                color = 'orange';
            } 
        }
        if (color != 'green' && color != 'orange') {
            paintButton(guessInput[i], 'red');
        }
    }
}

// Function to paint the button with the specified color
function paintButton(letter, color) {
    // Modify this function to update the color of the button in your HTML
    // You need to have appropriate HTML elements with IDs to select and update
    // You can use classes, inline styles, or manipulate the DOM as per your setup
    const buttonElement = document.getElementById(`button-${letter}`);
    buttonElement.style.backgroundColor = color;
}

// Add an event listener to the input field
guessInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    checkGuess();
  }
});

function restartGame() {
    location.reload();
}

// Display the initial state of the word and create buttons
displayWord();
createButtons();
