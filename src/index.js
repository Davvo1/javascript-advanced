const submit = document.querySelector("#submit");
const bookList = document.querySelector("#book-list");
submit.addEventListener("click", submitForm);

function submitForm(e) {
    const bookGenre = document.querySelector("#input").value;
    console.log(bookGenre);
    e.preventDefault();
        async function contactApi() {
            let response = await fetch(`https://openlibrary.org/subjects/${bookGenre}.json`);
            let json = await response.json();
            let obj = JSON.stringify(json);
            let obj2 = JSON.parse(obj)
            console.log(obj2.works);
            for (let i = 0; i < obj2.works.length; i++) {
                console.log(obj2.works[i]);
                
                const bookItem = document.createElement("div");               
                bookItem.innerHTML = `
                <img class="image-item" src="/src/read.ico">
                <span>${obj2.works[i].title}</span>`
                bookItem.classList.add("container-item");
                bookList.append(bookItem);
            }
            

        }
    contactApi();
  } 

