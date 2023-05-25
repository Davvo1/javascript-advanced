const submit = document.querySelector("#submit");
const bookList = document.querySelector("#book-list");
submit.addEventListener("click", submitForm);
let key;
const popUp = document.querySelector("#popup");
const bookDescription = document.querySelector("#book-desc");


function submitForm(e) {
    const bookGenre = document.querySelector("#input").value.toLowerCase();
    e.preventDefault();

    const loadingElement = document.querySelector("#loading");
    loadingElement.style.display = "block";
        async function contactApi() {
            let response = await fetch(`https://openlibrary.org/subjects/${bookGenre}.json`);
            let obj2 = await response.json();
            bookList.innerHTML = '';
            for (let i = 0; i < obj2.works.length; i++) {
                key = obj2.works[i].key;
                const bookItem = document.createElement("div");               
                bookItem.innerHTML = `
                <img class="image-item" src="https://covers.openlibrary.org/b/id/${obj2.works[i].cover_id}-M.jpg?default=false">
                <span class="span-item" id="my-span">${obj2.works[i].title}</span>
                <span class="author">${obj2.works[i].authors[0].name}</span>`
                bookItem.classList.add("container-item");
                bookList.append(bookItem);
            }
            loadingElement.style.display = "none";

            return obj2.works;
        }
    
        contactApi().then(works => {
            anotherFunction(works);
        });
    }
function anotherFunction(works) {
       let keys = works.map(work => work.key);
        const spanItems = document.querySelectorAll(".span-item");
        for(let i = 0; i < works.length; i++) {
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
        console.log(json.description.value || json.description);
        bookDescription.innerHTML = `
        <img src="src/x-icon.png" class="close" onclick="closePopUp()">
        <p>${json.description.value || json.description}</p>`
        popUp.className = "popup";

    }

    function closePopUp() {
        bookDescription.innerHTML = '';
        popUp.classList.remove("popup");
    }