/* DEFAULT DIFFICULTY TIMERS */
const EASY_TIMER = 180;
const MEDIUM_TIMER = 150;
const HARD_TIMER = 120;
const EXTREME_TIMER = 90;
const IMPOSSIBLE_TIMER = 60;

/* DEFAULT DIFFICULTY LIST */
const EASY_LIST = 10;
const MEDIUM_LIST = 15;
const HARD_LIST = 20;
const EXTREME_LIST = 25;
const IMPOSSIBLE_LIST = 30;

/* DIFFICULTY NAMES */
const difficultyOptions = ["Easy", "Medium", "Hard", "Extreme", "Impossible"];

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

const checkGeneration = (generation: string) => {
    let arr: number[];
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
            arr = [1, 152];
            break;
    }
    return arr;
};

const checkDifficulty = (difficulty: string, time: boolean = false): number => {
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
const getRandomArray = (selectedDifficulty: string, selectedGeneration: string) => {
    const pokemonIds = new Set<number>();

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

const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

/* HANDLE TIME */
const transformTime = (timeInSeconds: number) => {
    let min = Math.floor(timeInSeconds / 60);
    let sec = timeInSeconds - min * 60;
    let minHelper: string, secHelper: string;

    if (min < 10 && min > 0) {
        minHelper = "0" + (min);
    } else if (min === 0) {
        minHelper = "00";
    } else {
        minHelper = String(min)
    }

    if (sec < 10 && sec > 0) {
        secHelper = "0" + (sec);
    } else if (sec === 0) {
        secHelper = "00";
    } else {
        secHelper = String(sec)
    }

    return `${minHelper} : ${secHelper} ${min < 1 ? " s" : " m"}`;
};

export { checkDifficulty, getRandomArray, shuffleArray, difficultyOptions, transformTime }