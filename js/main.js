(() => {
    const charsCon = document.querySelector("#chars-ul");
    const infoTemplate = document.querySelector("#info-template");
    const detailsCon = document.querySelector("#details-con");
    const baseUrl = "https://swapi.dev/api/";
    const imagesMap = {
        "https://swapi.dev/api/films/1/": "images/sw_1_poster.jpg",
        "https://swapi.dev/api/films/2/": "images/sw_2_poster.jpg",
        "https://swapi.dev/api/films/3/": "images/sw_3_poster.jpg",
        "https://swapi.dev/api/films/4/": "images/sw_4_poster.jpg",
        "https://swapi.dev/api/films/5/": "images/sw_5_poster.jpg",
        "https://swapi.dev/api/films/6/": "images/sw_6_poster.jpg"
    };

    function getChars() {
        const loader = document.querySelector('#loader');
        loader.classList.toggle('hidden');
        console.log(loader)
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
                a.dataset.films = character["films"].join(' ');
                li.appendChild(a);
                ul.appendChild(li);
            })
            loader.classList.toggle('hidden');
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

    getChars();


    function getFilms(e) {
        e.preventDefault();
        const filmsURL = e.currentTarget.dataset.films.split(' ');
        console.log(filmsURL)
        detailsCon.innerHTML = "";
        filmsURL.forEach(film => {
            fetch(film)
            .then(response => response.json())
            .then(function(response) {
                console.log(response.title);
                const clone = infoTemplate.content.cloneNode(true);
                const movieTitle = clone.querySelector(".movie-title");
                const introCrawl = clone.querySelector(".movie-desc");
                const poster = document.createElement("img");
                poster.src = imagesMap[film];
                poster.classList.add('poster')
                introCrawl.textContent = response.opening_crawl;
                movieTitle.textContent = response.title;
                detailsCon.appendChild(poster);
                detailsCon.appendChild(clone);
            })
            .catch()
        })
    }
})();