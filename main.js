const container = document.querySelector('.container');
let bookName = document.querySelector('#book_name');
let authorName = document.querySelector('#author');
let pagesName = document.querySelector('#pages');
let readName = document.querySelector('#select');
let button = document.querySelector('#post');
let list = document.querySelector('.list');
let showForm = document.querySelector('.newBook')
let form = document.querySelector('#form')


let z = 0;




let myLibrary = [];




class Book {
constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
    info =  () => {

        return (`BOOK: ${this.name} AUTHOR: ${this.author} PAGES: ${this.pages} READ: ${this.read}`);
    }

}

function addBookToLibrary() {
    let books = new Book(bookName.value, authorName.value, pagesName.value, readName.value)
    myLibrary.push(books)
    LibraryPost()
    console.log(myLibrary)

}
function LibraryPost() {
    const removeBooks = document.querySelectorAll('.book')
    for (let i = 0; i < removeBooks.length; i++) { 
        removeBooks[i].remove(); 
    } 
    let index = 0
     myLibrary.forEach(thing => {

        const book = document.createElement('div')
        book.classList.add('book')
        book.textContent = thing.info()
        list.appendChild(book)

        let deletButton = document.createElement('button')
        deletButton.classList.add('deleteButton')
        deletButton.textContent = 'X'

        deletButton.dataset.linkedArray = index;
        book.appendChild(deletButton)

        deletButton.addEventListener('click', removeBookfromLibrary)
        function removeBookfromLibrary() {
            let specificBook = deletButton.dataset.linkedArray
            myLibrary.splice(parseInt(specificBook), 1)
            book.remove()
            LibraryPost()
        }

        const readStatusButton = document.createElement("button");
        readStatusButton.classList.add("read-status-button");
        readStatusButton.textContent = "Toggle Read Status";

        // Link the data attribute of the toggle read button to the array and card
        readStatusButton.dataset.linkedArray = index;
        book.appendChild(readStatusButton);

        // Create event listener/toggle logic for array objects prototype for read status change
        readStatusButton.addEventListener("click", toggleReadStatus);

        function toggleReadStatus() {
            let retrieveBookToToggle = readStatusButton.dataset.linkedArray
            Book.prototype = Object.create(Book.prototype);
            const toggleBook = new Book()


            // Run check to see what read value is present to toggle from
            if (myLibrary[parseInt(retrieveBookToToggle)].read == "Yes") {
                toggleBook.read = "No";
                myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;

            } else if (myLibrary[parseInt(retrieveBookToToggle)].read == "No") {
                toggleBook.read = "Yes";
                myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
            }
            LibraryPost();
        }

        index++
    })





}
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    if (validateForm()) {
      // Form is valid, submit it
    //   submitForm();
       addBookToLibrary()
      
       bookName.value = ''
     authorName.value = ''
       pagesName.value = ''
      
    
    }
  });

  function validateForm() {
    let isValid = true;

    if (bookName.value.trim() === '') {
      isValid = false;
      bookName.classList.add('error');
    } else {
      bookName.classList.remove('error');
    }

    if (authorName.value.trim() === '') {
      isValid = false;
      authorName.classList.add('error');
    } else {
      authorName.classList.remove('error');
    }

    if (pagesName.value === '' || pagesName.value <= 0) {
      isValid = false;
      pagesName.classList.add('error');
    } else {
      pagesName.classList.remove('error');
    }

    if (readName.value === '') {
      isValid = false;
      readName.classList.add('error');
    } else {
      readName.classList.remove('error');
    }

    return isValid;
  }

showForm.addEventListener('click', () => {
    form.style.display = 'block'
    showForm.style.display = 'none'

})
