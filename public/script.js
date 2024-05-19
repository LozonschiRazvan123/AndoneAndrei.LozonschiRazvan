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

    if (addNameButton) {
        addNameButton.addEventListener('click', () => addNameHandler(nameInput));
    }
    if (nameInput) {
        nameInput.addEventListener('keypress', (event) => nameInputKeypressHandler(event));
    }
    if (downloadButton) {
        downloadButton.addEventListener('click', downloadButtonClickHandler);
    }
    if (clearButton) {
        clearButton.addEventListener('click', clearButtonClickHandler);
    }

    updateSortedList();
}


function addNameHandler(nameInput) {
    if (!nameInput) return;
    const name = nameInput.value.trim();
    if (name && !sortedNames.includes(name)) {
        sortedNames.push(name);
        nameInput.value = '';
        updateSortedList();
        showToast('Numele a fost adăugat.', 'success');
    } else {
        showToast('Numele este fie gol, fie deja introdus.', 'danger');
    }
}

function nameInputKeypressHandler(event) {
    if (!nameInput) return;
    if (event.keyCode === 13) {
        event.preventDefault();
        addNameHandler(nameInput);
    }
}

function downloadButtonClickHandler() {
    if (sortedNames.length === 0) {
        showToast('Nu există nume în listă pentru a descărca.', 'danger');
        return;
    }

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

    showToast('Lista a fost descărcată.', 'success');
}

function clearButtonClickHandler() {
    sortedNames.length = 0;
    updateSortedList();
    showToast('Toate numele au fost sterse.', 'danger');
}

function updateSortedList() {
    if (!sortedList) return;

    sortedList.innerHTML = '';
    const sorted = sortedNames.slice().sort((a, b) => a.localeCompare(b));
    sorted.forEach(name => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = name;
        sortedList.appendChild(listItem);
    });
}

function showToast(message, type) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        console.error("Elementul 'toast-container' nu a fost gssit în DOM.");
        return;
    }

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.style.minWidth = '300px';
    toast.style.marginTop = '10px';

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="ml-auto mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;

    toastContainer.appendChild(toast);

    const bootstrapToast = new bootstrap.Toast(toast, { delay: 3000 });
    bootstrapToast.show();

    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

module.exports = {
    initializeDOMElements,
    addNameHandler,
    nameInputKeypressHandler,
    downloadButtonClickHandler,
    clearButtonClickHandler,
    updateSortedList,
    showToast,
};
