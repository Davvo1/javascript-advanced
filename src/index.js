const submit = document.querySelector("#submit");
const bookList = document.querySelector("#book-list");
const popUp = document.querySelector("#popup");
const bookDescription = document.querySelector("#book-desc");
const body = document.querySelector("BODY");
const description = document.querySelector("#description-shadow");
const title = document.querySelector("#title");
const textbox = document.querySelector("#textbox");



submit.addEventListener("click", submitForm);

function submitForm(e) {
    const bookGenre = document.querySelector("#input").value.toLowerCase();
    e.preventDefault();

    const loadingElement = document.querySelector("#loading");
    loadingElement.style.display = "block";

    const warningMessage = document.querySelector("#warning-element");
    warningMessage.textContent = '';
    warningMessage.classList.remove("warning-message");

    async function bookFetch() {
            bookList.innerHTML = '';
            let response = await fetch(`https://openlibrary.org/subjects/${bookGenre}.json`);
            if (!response.ok) {
                throw new Error("Error fetching data.");
            }

            let obj2 = await response.json();


            if (obj2.works.length === 0) {
                throw new Error("Error fetching works.")
            }


            for (let i = 0; i < obj2.works.length; i++) {
                const bookItem = document.createElement("div");
                bookItem.innerHTML = `
                <img class="image-item" src="https://covers.openlibrary.org/b/id/${obj2.works[i].cover_id}-M.jpg?default=false">
                <span class="span-item" id="my-span">${obj2.works[i].title}</span>
                <span class="author">${obj2.works[i].authors[0].name}</span>`
                bookItem.classList.add("container-item");
                bookList.append(bookItem);
                description.remove();

            }

            return obj2.works;
    }

    bookFetch().then(works => {
        worksArray(works);
    }).catch((error) => {
        console.log(error);
        warningMessage.textContent = "Error fetching data. Please try again later.";
        warningMessage.classList.add("warning-message");
        bookList.innerHTML = '';
        return [];
    }).finally(() => loadingElement.style.display = "none");
}

function worksArray(works) {
    let keys = works.map(work => work.key);
    const spanItems = document.querySelectorAll(".span-item");
    for (let i = 0; i < works.length; i++) {
        const mySpan = spanItems[i];
        const key = keys[i];

        mySpan.addEventListener("click", () => {
            fetchUrl(key);
        });
    }
}

async function fetchUrl(key) {
    let response = await fetch(`https://openlibrary.org${key}.json`);
    let json = await response.json();
    console.log(json)
    bookDescription.innerHTML = `
        <img src="src/x-icon.png" class="close" onclick="closePopUp()">
        <h2>${json.title}</h2>
        <p>${json.description?.value || json.description || "Description not available."}</p>`
    popUp.className = "popup";
    title.classList.add("opacity");
    textbox.classList.add("opacity")
    bookList.classList.add("invisible");

}

function closePopUp() {
    bookDescription.innerHTML = '';
    popUp.classList.remove("popup");
    title.classList.remove("opacity");
    textbox.classList.remove("opacity");
    bookList.classList.remove("invisible");
}

body.addEventListener("click", closePopUp);