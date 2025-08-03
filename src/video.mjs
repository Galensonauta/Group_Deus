// src/video.mjs
export function renderVideoCarousel(videos, container, header) {
  const carrousel = [];
  let contIndex = 0;

  videos.forEach(vid => {
    const video = document.createElement("iframe");
    video.classList.add("video");
    video.setAttribute("src", `https://www.youtube.com/embed/${vid.key}`);
    video.style.width = "90vw";
    video.style.height = "45vw";
    carrousel.push(video);
  });

  function show(index) {
    container.innerHTML = "";
    container.appendChild(carrousel[index]);
  }

  function next() {
    contIndex = (contIndex + 1) % carrousel.length;
    show(contIndex);
  }

  function prev() {
    contIndex = (contIndex - 1 + carrousel.length) % carrousel.length;
    show(contIndex);
  }

  if (!carrousel.length) {
    console.log("Sin videos");
    header.style.display = "none";
    header.appendChild(container);
    return;
  }

  header.style.display = "flex";

  const nextBtn = document.createElement("img");
  nextBtn.src = base64NextBtn;
  nextBtn.classList.add("nextBtn");
  nextBtn.addEventListener("click", next);

  const prevBtn = document.createElement("img");
  prevBtn.src = base64PrevBtn;
  prevBtn.classList.add("prevBtn");
  prevBtn.addEventListener("click", prev);

  show(contIndex);
  header.appendChild(nextBtn);
  header.appendChild(prevBtn);
  header.appendChild(container);
}
