(() => {
    const charsCon = document.querySelector("#chars-ul");
    const infoTemplate = document.querySelector("#info-template");
    const detailsCon = document.querySelector("#details-con");
    const baseUrl = "https://swapi.dev/api/";

    function getChars() {
        fetch(`${baseUrl}people`)
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            const characters = response.results;
            const ul = document.createElement("ul");
            characters.forEach(character => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = character["name"];
                const firstFilmURL = character.films[0];
                a.dataset.info = firstFilmURL;
                li.appendChild(a);
                ul.appendChild(li);
            })
            charsCon.appendChild(ul);
        })
        .then(function() {
            const links = document.querySelectorAll("#chars-ul li a");
            links.forEach(function(link){
                link.addEventListener("click", getFilms)
            })
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    function getFilms(e) {
        const filmURL = e.currentTarget.dataset.info;
        detailsCon.innerHTML = "";
        fetch(filmURL)
            .then(response => response.json())
            .then(function(film) {
            console.log(film.results);
            const clone = infoTemplate.content.cloneNode(true);
            const filmTitle = clone.querySelector(".movie-title");
            const filmDescription = clone.querySelector(".movie-desc");
            filmTitle.textContent = film.title
            filmDescription.textContent = film.opening_crawl
            detailsCon.appendChild(clone);
        })
        .catch()
    }

    getChars();

})();