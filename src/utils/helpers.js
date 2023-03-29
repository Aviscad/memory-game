/* DEFAULT DIFFICULTY TIMERS */
const EASY_TIMER = 240;
const MEDIUM_TIMER = 210;
const HARD_TIMER = 180;
const EXTREME_TIMER = 150;
const IMPOSSIBLE_TIMER = 90;

/* DEFAULT DIFFICULTY LIST */
const EASY_LIST = 10;
const MEDIUM_LIST = 20;
const HARD_LIST = 30;
const EXTREME_LIST = 40;
const IMPOSSIBLE_LIST = 50;

/* DIFFICULTY NAMES */
const difficultyOptions = ["Easy", "Medium", "Hard", "Extreme", "Impossible"];

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

const checkGeneration = (generation) => {
    let arr;
    switch (generation) {
        case "i":
            arr = [1, 152];
            break;
        case "ii":
            arr = [152, 252];
            break;
        case "iii":
            arr = [252, 387];
            break;
        case "iv":
            arr = [387, 494];
            break;
        case "v":
            arr = [494, 650];
            break;
        case "vi":
            arr = [650, 722];
            break;
        case "vii":
            arr = [722, 810];
            break;
        case "viii":
            arr = [810, 905];
            break;
        default:
            arr = [];
            break;
    }
    return arr;
};

const checkDifficulty = (difficulty, time = false) => {
    let listSize, difficultyTimer;
    switch (difficulty) {
        case "EASY":
            listSize = EASY_LIST;
            difficultyTimer = EASY_TIMER;
            break;
        case "MEDIUM":
            listSize = MEDIUM_LIST;
            difficultyTimer = MEDIUM_TIMER;
            break;
        case "HARD":
            listSize = HARD_LIST;
            difficultyTimer = HARD_TIMER;
            break;
        case "EXTREME":
            listSize = EXTREME_LIST;
            difficultyTimer = EXTREME_TIMER;
            break;
        case "IMPOSSIBLE":
            listSize = IMPOSSIBLE_LIST;
            difficultyTimer = IMPOSSIBLE_TIMER;
            break;
        default:
            listSize = EASY_LIST;
            difficultyTimer = EASY_TIMER;
            break;
    }
    return time ? difficultyTimer : listSize;
};

/* GET POKEMON NUMBERS */
const getRandomArray = (selectedDifficulty, selectedGeneration) => {
    const pokemonIds = new Set();

    const pokemonNumberRange = checkGeneration(selectedGeneration);
    const gameDifficulty = checkDifficulty(selectedDifficulty);
    const start = pokemonNumberRange[0];
    const end = pokemonNumberRange[1];

    for (let i = 0; i < gameDifficulty; i++) {
        let n = getRandomInt(start, end);

        while (pokemonIds.has(n)) {
            n = getRandomInt(start, end);
        }
        pokemonIds.add(n);
    }

    return pokemonIds;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

/* HANDLE TIME */
const transformTime = (timeInSeconds) => {
    let min = Math.floor(timeInSeconds / 60);
    let sec = timeInSeconds - min * 60;

    if (min < 10 && min > 0) {
        min = "0" + min;
    } else if (min === 0) {
        min = "00";
    }

    if (sec < 10 && sec > 0) {
        sec = "0" + sec;
    } else if (sec === 0) {
        sec = "00";
    }

    return `${min} : ${sec} ${min < 1 ? " s" : " m"}`;
};

export { checkDifficulty, getRandomArray, shuffleArray, difficultyOptions, transformTime }