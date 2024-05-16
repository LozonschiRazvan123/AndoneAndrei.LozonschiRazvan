let sortedNames = [];
let sortedList = null;
let nameInput = null;
let addNameButton = null;
let downloadButton = null;
let clearButton = null;
let formatSelect = null;

function initializeDOMElements() {
    sortedList = document.getElementById('sortedNames');
    nameInput = document.getElementById('nameInput');
    addNameButton = document.getElementById('addNameButton');
    downloadButton = document.getElementById('downloadButton');
    clearButton = document.getElementById('clearButton');
    formatSelect = document.getElementById('formatSelect');

    addNameButton.addEventListener('click', () => addNameHandler(nameInput));
    nameInput.addEventListener('keypress', (event) => nameInputKeypressHandler(event));
    downloadButton.addEventListener('click', downloadButtonClickHandler);
    clearButton.addEventListener('click', clearButtonClickHandler);

    updateSortedList();
}

function addNameHandler(nameInput) {
    if (!nameInput) return;
    const name = nameInput.value.trim();
    if (name) {
        sortedNames.push(name);
        nameInput.value = '';
        updateSortedList();
    }
}

function nameInputKeypressHandler(event) {
    if (!nameInput) return;
    if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        addNameHandler(nameInput);
    }
}

function downloadButtonClickHandler() {
    const format = formatSelect.value;
    let outputString = '';
    let blob;

    if (format === 'txt') {
        outputString = `Lista conține ${sortedNames.length} nume\n_ _ _ _ _ _ _ _ _ _ _\n${sortedNames.join('\n')}`;
        blob = new Blob([outputString], { type: 'text/plain' });
    } else if (format === 'csv') {
        outputString = `Nume\n${sortedNames.join('\n')}`;
        blob = new Blob([outputString], { type: 'text/csv' });
    } else if (format === 'json') {
        blob = new Blob([JSON.stringify(sortedNames, null, 2)], { type: 'application/json' });
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nume_sortate.${format}`;
    link.click();
    window.URL.revokeObjectURL(url);
}

function clearButtonClickHandler() {
    sortedNames.length = 0;
    updateSortedList();
}

function updateSortedList() {
    if (!sortedList) return;

    sortedList.innerHTML = '';
    sortedNames.sort((a, b) => a.localeCompare(b));
    sortedNames.forEach(name => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = name;
        sortedList.appendChild(listItem);
    });
}

function resetGlobals() {
    sortedNames = [];
    sortedList = null;
    nameInput = null;
    addNameButton = null;
    downloadButton = null;
    clearButton = null;
    formatSelect = null;
}

document.addEventListener('DOMContentLoaded', initializeDOMElements);

module.exports = {
    initializeDOMElements,
    addNameHandler,
    nameInputKeypressHandler,
    downloadButtonClickHandler,
    clearButtonClickHandler,
    updateSortedList,
    resetGlobals,
    sortedNames,
    sortedList,
    nameInput,
    addNameButton,
    downloadButton,
    clearButton,
    formatSelect
};
