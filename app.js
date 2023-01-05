const input = document.querySelector("#input");
const grid = document.querySelector(".grid");

window.addEventListener("DOMContentLoaded", dayNightMode);
input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") loadImg();
});
document
  .querySelector(".fa-magnifying-glass")
  .addEventListener("click", loadImg);

function loadImg() {
  removeImages();
  const url = `https://api.unsplash.com/search/photos?query=${input.value}&per_page=30&client_id=KTGGeLQ9xbM5j2yqcS5LywMSmWC7BmSbtOzwK6FVGd8`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert(response.status);
      }
    })
    .then((data) => {
      const imageNodes = [];
      for (let i = 0; i < data.results.length; i++) {
        imageNodes[i] = document.createElement("div");
        imageNodes[i].className = "img";
        imageNodes[
          i
        ].style.backgroundImage = `url(${data.results[i].urls.raw})`;
        imageNodes[i].addEventListener("dblclick", () => {
          window.open(data.results[i].links.download, "_blank");
        });
        grid.appendChild(imageNodes[i]);
      }
    });
}

function removeImages() {
  grid.innerHTML = "";
}

function dayNightMode() {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 7 && hour <= 19) {
    document.body.style.backgroundColor = "whitesmoke";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }
}
