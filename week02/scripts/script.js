// Select DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Load saved chapters from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedChapters = JSON.parse(localStorage.getItem('chapters'));
    if (savedChapters) {
        savedChapters.forEach(chapter => addChapterToList(chapter));
    }
});

// Add event listener for the Add Chapter button
button.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if the input is not blank
    const chapter = input.value.trim();
    if (chapter === '') {
        alert('Please enter a valid chapter.');
        input.focus(); // Return focus to the input field
        return;
    }

    // Validate input format (e.g., "Book Chapter")
    const isValidFormat = /^[a-zA-Z]+\s+\d+$/.test(chapter);
    if (!isValidFormat) {
        alert('Please enter a valid chapter in the format "Book Chapter" (e.g., "Alma 5").');
        input.focus();
        return;
    }

    // Limit the number of chapters to 10
    if (list.children.length >= 10) {
        alert('You can only add up to 10 chapters.');
        input.focus();
        return;
    }

    // Add the chapter to the list
    addChapterToList(chapter);

    // Save the updated list to localStorage
    saveChaptersToLocalStorage();

    // Clear the input value and focus back on the input field
    input.value = '';
    input.focus();
});

/**
 * Adds a chapter to the list dynamically.
 * @param {string} chapter - The chapter text to add.
 */
function addChapterToList(chapter) {
    // Create a new list item (li)
    const li = document.createElement('li');

    // Create a span to hold the chapter text
    const span = document.createElement('span');
    span.textContent = chapter;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Remove ${chapter}`);
    deleteButton.classList.add('delete'); // Add a class for styling

    // Append the span and delete button to the list item
    li.append(span, deleteButton);

    // Append the list item to the unordered list
    list.append(li);
}

/**
 * Saves the current list of chapters to localStorage.
 */
function saveChaptersToLocalStorage() {
    const chapters = Array.from(list.children).map(li => li.querySelector('span').textContent);
    localStorage.setItem('chapters', JSON.stringify(chapters));
}

// Handle delete button clicks using Event Delegation
list.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const li = event.target.parentElement; // Get the parent <li> element
        list.removeChild(li); // Remove the <li> from the list

        // Save the updated list to localStorage
        saveChaptersToLocalStorage();

        // Focus back on the input field
        input.focus();
    }
});