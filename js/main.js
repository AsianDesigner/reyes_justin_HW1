(() => {
    const charsCon = document.querySelector("#chars-ul");
    const infoTemplate = document.querySelector("#info-template");
    const detailsCon = document.querySelector("#details-con");
    const baseUrl = "https://swapi.dev/api/people/";

    function getChars() {
        fetch(`${baseUrl}?=people`)
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            const characters = response.results;
            const ul = document.createElement("ul");
            characters.forEach(character => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = character["name"];
                a.dataset.info = character["name"];
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
        fetch(`${baseUrl}?tt=${infoURL}`)
        .then(response => response.json())
        .then(function(response) {
            console.log(response.short.info.infoBody);
            const clone = infoTemplate.content.cloneNode(true);
            const infoDescription = clone.querySelector(".movie-desc");
            infoDescription.textContent = response.short.review.reviewBody;
            detailsCon.appendChild(clone);
        })
        .catch()
    }

    getChars();

})();