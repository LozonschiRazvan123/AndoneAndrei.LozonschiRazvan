const {
    initializeDOMElements,
    addNameHandler,
    nameInputKeypressHandler,
    downloadButtonClickHandler,
    clearButtonClickHandler,
    updateSortedList,
    showToast,
} = require('./public/script');

describe('DOM Elements Initialization', () => {
    let mockNameInput;
    let mockAddNameButton;
    let mockDownloadButton;
    let mockClearButton;
    let mockFormatSelect;
    let mockSortedList;
    let mockToastContainer;

    beforeEach(() => {

        mockNameInput = document.createElement('input');
        mockNameInput.id = 'nameInput';

        mockAddNameButton = document.createElement('button');
        mockAddNameButton.id = 'addNameButton';

        mockDownloadButton = document.createElement('button');
        mockDownloadButton.id = 'downloadButton';

        mockClearButton = document.createElement('button');
        mockClearButton.id = 'clearButton';

        mockFormatSelect = document.createElement('select');
        mockFormatSelect.id = 'formatSelect';
        const optionTxt = document.createElement('option');
        optionTxt.value = 'txt';
        optionTxt.text = 'TXT';
        mockFormatSelect.appendChild(optionTxt);
        const optionCsv = document.createElement('option');
        optionCsv.value = 'csv';
        optionCsv.text = 'CSV';
        mockFormatSelect.appendChild(optionCsv);
        const optionJson = document.createElement('option');
        optionJson.value = 'json';
        optionJson.text = 'JSON';
        mockFormatSelect.appendChild(optionJson);

        mockSortedList = document.createElement('ul');
        mockSortedList.id = 'sortedNames';

        mockToastContainer = document.createElement('div');
        mockToastContainer.id = 'toast-container';

        document.body.appendChild(mockNameInput);
        document.body.appendChild(mockAddNameButton);
        document.body.appendChild(mockDownloadButton);
        document.body.appendChild(mockClearButton);
        document.body.appendChild(mockFormatSelect);
        document.body.appendChild(mockSortedList);
        document.body.appendChild(mockToastContainer);
    });

    afterEach(() => {
        // Remove mocked elements after each test
        document.body.innerHTML = '';
    });

    test('DOM elements are initialized correctly', () => {
        initializeDOMElements();

        expect(mockAddNameButton.onclick).toEqual(expect.any(Function));
        expect(mockNameInput.onkeypress).toEqual(expect.any(Function));
        expect(mockDownloadButton.onclick).toEqual(expect.any(Function));
        expect(mockClearButton.onclick).toEqual(expect.any(Function));
    });

    test('Add name handler works as expected', () => {
        initializeDOMElements();

        mockNameInput.value = 'John Doe';

        mockAddNameButton.click();

        expect(mockSortedList.innerHTML).toContain('John Doe');
    });
});
