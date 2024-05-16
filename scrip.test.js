const fs = require('fs');
const path = require('path');
const {
    initializeDOMElements,
    addNameHandler,
    nameInputKeypressHandler,
    downloadButtonClickHandler,
    clearButtonClickHandler,
    updateSortedList,
    //resetGlobals,
    sortedNames,
    sortedList,
    nameInput,
    addNameButton,
    downloadButton,
    clearButton,
    formatSelect
} = require('./public/script');


const html = fs.readFileSync(path.resolve(__dirname, 'public/index.html'), 'utf8');

describe('Testare funcții', () => {
    beforeEach(() => {
        document.body.innerHTML = html;
        //resetGlobals();
        initializeDOMElements();
    });

    test('initializeDOMElements event listeners', () => {
        const addNameButton = document.getElementById('addNameButton');
        const nameInput = document.getElementById('nameInput');
        const downloadButton = document.getElementById('downloadButton');
        const clearButton = document.getElementById('clearButton');
        
        const spyAddName = jest.spyOn(addNameButton, 'addEventListener');
        const spyNameInput = jest.spyOn(nameInput, 'addEventListener');
        const spyDownload = jest.spyOn(downloadButton, 'addEventListener');
        const spyClear = jest.spyOn(clearButton, 'addEventListener');

        initializeDOMElements();

        expect(spyAddName).toHaveBeenCalledWith('click', expect.any(Function));
        expect(spyNameInput).toHaveBeenCalledWith('keypress', expect.any(Function));
        expect(spyDownload).toHaveBeenCalledWith('click', expect.any(Function));
        expect(spyClear).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('addNameHandler function', () => {
        const nameInput = document.getElementById('nameInput');
        nameInput.value = 'Test Name';

        addNameHandler(nameInput);

        expect(sortedNames).toContain('Test Name');
        expect(sortedList.children.length).toBe(1);
        expect(sortedList.children[0].textContent).toBe('Test Name');
    });

    test('nameInputKeypressHandler when I press enter', () => {
        const nameInput = document.getElementById('nameInput');
        nameInput.value = 'Another Test Name';
        const event = new KeyboardEvent('keypress', { keyCode: 13 });

        nameInputKeypressHandler(event);

        expect(sortedNames).toContain('Another Test Name');
        expect(sortedList.children.length).toBe(1);
        expect(sortedList.children[0].textContent).toBe('Another Test Name');
    });

    test('downloadButtonClickHandler download', () => {
        sortedNames.push('Name1', 'Name2');
        const formatSelect = document.getElementById('formatSelect');
        formatSelect.value = 'txt';

        const createObjectURL = jest.fn();
        window.URL.createObjectURL = createObjectURL;
        const revokeObjectURL = jest.fn();
        window.URL.revokeObjectURL = revokeObjectURL;

        downloadButtonClickHandler();

        expect(createObjectURL).toHaveBeenCalledTimes(1);
        expect(revokeObjectURL).toHaveBeenCalledTimes(1);
    });

    test('clearButtonClickHandler delete', () => {
        sortedNames.push('Name1', 'Name2');

        clearButtonClickHandler();

        expect(sortedNames).toHaveLength(0);
        expect(sortedList.children.length).toBe(0);
    });
});
