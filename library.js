// Array to store all the books
const myLibrary = [];

// Constructor function for Book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Method to toggle the read status of a book
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Function to display all books in the library
function displayBooks() {
    const libraryEl = document.getElementById('library');
    libraryEl.innerHTML = ''; // Clear existing display

    myLibrary.forEach((book, index) => {
        const bookEl = document.createElement('div');
        bookEl.classList.add('book');
        bookEl.setAttribute('data-index', index);
        
        bookEl.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleRead(${index})">Toggle Read</button>
        `;

        libraryEl.appendChild(bookEl);
    });
}

// Function to remove a book from the library
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// Function to toggle the read status of a book
function toggleRead(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

// Get DOM elements
const newBookBtn = document.getElementById('newBookBtn');
const bookDialog = document.getElementById('bookDialog');
const bookForm = document.getElementById('bookForm');

// Event listener for the "NEW BOOK" button
newBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
});

// Event listener for the book form submission
bookForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting to a server
    
    // Get values from form inputs
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    // Add the new book to the library
    addBookToLibrary(title, author, pages, read);
    
    // Refresh the display
    displayBooks();

    // Close the dialog and reset the form
    bookDialog.close();
    bookForm.reset();
});

// Initial display of books (if any are added manually)
displayBooks();

// Optional: Add some sample books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("1984", "George Orwell", 328, true);

// Refresh the display to show the sample books
displayBooks();