const sortedNames = [];
var sortedList = document.getElementById('sortedNames');
var nameInput = document.getElementById('nameInput');
var addNameButton = document.getElementById('addNameButton');
var downloadButton = document.getElementById('downloadButton');
var clearButton = document.getElementById('clearButton');

addNameButton.addEventListener('click', addName);
nameInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        
        var name = nameInput.value.trim();
        if (name) {
            sortedNames.push(name);
            nameInput.value = ''; 
            updateSortedList();
        }
    }
});

function addName() {
    var name = nameInput.value.trim();
    if (name) {
        sortedNames.push(name);
        nameInput.value = '';
        updateSortedList();
    }
}

var updateSortedList = () => {
    sortedList.innerHTML = '';
    sortedNames.sort((a, b) => a.localeCompare(b));
    sortedNames.forEach(name => {
        var listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = name;
        sortedList.appendChild(listItem);
    });
};

downloadButton.addEventListener('click', () => {
    var outputString = `Lista conține ${sortedNames.length} nume\n_ _ _ _ _ _ _ _ _ _ _\n${sortedNames.join('\n')}`;
    var blob = new Blob([outputString], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = url;
    link.download = 'nume_sortate.txt';
    link.click();
    window.URL.revokeObjectURL(url);
});

clearButton.addEventListener('click', () => {
    sortedNames.length = 0;
    updateSortedList();
});

updateSortedList();
