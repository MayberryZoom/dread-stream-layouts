// Update info
const runReplicant = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');

const categoryElement = document.getElementById('category');
const runnerNameElements = document.getElementsByClassName('runner-name');
const runnerPronounElements = document.getElementsByClassName('runner-pronouns');
const runnerTimerElements = document.getElementsByClassName('runner-time');
const commentatorElements = document.getElementsByClassName('commentator');

const formatRunnerNames = () => {
    for (const element of runnerNameElements) {
        let fontSize = parseInt(getComputedStyle(element).getPropertyValue('font-size'));
        const containerWidth = element.parentElement.parentElement.offsetWidth;

        while (element.parentElement.offsetWidth + element.parentElement.offsetHeight + 10 > containerWidth) element.style.fontSize = --fontSize + 'px';
    }
}

const formatTimers = () => {
    for (const element of runnerTimerElements) {
        element.style.right = element.parentElement.offsetWidth - element.offsetWidth - 10 + "px";
        element.style.top = element.parentElement.offsetHeight + "px";
    }
}

const formatCommentators = () => {
    for (const element of commentatorElements) {
        let fontSize = parseInt(getComputedStyle(element).getPropertyValue('font-size'));
        const parentStyles = getComputedStyle(element.parentElement);

        const containerWidth = element.parentElement.clientWidth
            - parseInt(parentStyles.getPropertyValue('padding-left'))
            - parseInt(parentStyles.getPropertyValue('padding-right'));

        while (element.offsetWidth > containerWidth) element.style.fontSize = --fontSize + 'px';
    }
}

runReplicant.on('change', (newValue) => {
    if (newValue) {
        categoryElement.textContent = newValue.category;
        for (let i = 0; i < runnerNameElements.length; i++) runnerNameElements[i].textContent = newValue.teams[i].players[0].name;
        for (let i = 0; i < runnerPronounElements.length; i++) runnerPronounElements[i].textContent = "(" + newValue.teams[i].players[0].pronouns + ")";
        for (let i = 0; i < runnerTimerElements.length; i++) runnerTimerElements[i].id = newValue.teams[i].id;
        for (let i = 0; i < commentatorElements.length; i++) commentatorElements[i].textContent = newValue.teams[i].players[1].name + " (" + newValue.teams[i].players[1].pronouns + ")";

        formatRunnerNames();
        formatTimers();
        formatCommentators();
    };
});

// Update timer
const timerReplicant = nodecg.Replicant('timer', 'nodecg-speedcontrol');

const mainTimerElement = document.getElementById('timer');

const calculatePlace = (finishTimes, id) => {
    const ids = Object.keys(finishTimes);
    ids.sort((a, b) => finishTimes[a].time > finishTimes[b].time);
    return ids.indexOf(id) + 1;
}

timerReplicant.on('change', (newValue) => {
    mainTimerElement.textContent = newValue.time;
    for (element of runnerTimerElements) {
        if (newValue.teamFinishTimes[element.id]) {
            const place = calculatePlace(newValue.teamFinishTimes, element.id);

            element.textContent = newValue.teamFinishTimes[element.id].time + ' #' + place;

            element.classList.remove('first-place');
            element.classList.remove('second-place');
            element.classList.add((place == 1 ? 'first' : 'second') + '-place');
            element.style.visibility = 'visible';
        }
        else {
            element.style.visibility = 'hidden';
        }
    }

    formatTimers();
});
