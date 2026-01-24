const colors = ["#ff4d4d", "#4da6ff", "#7cff4d", "#ffd84d"];
const speed = 5;
const blur = "medium"; // light | medium | heavy

const container = document.getElementById("gradient-container");

const wrapper = document.createElement("div");
wrapper.className = `gradient-wrapper blur-${blur}`;
container.appendChild(wrapper);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createBlobs() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const size = Math.max(width, height);

  wrapper.innerHTML = "";

  colors.forEach(color => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const blobSize = size * random(0.5, 1.5);
    svg.setAttribute("width", blobSize);
    svg.setAttribute("height", blobSize);
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.classList.add("gradient-blob");

    svg.style.top = random(0, 50) + "%";
    svg.style.left = random(0, 50) + "%";
    svg.style.animationDuration = (1 / speed) * 40 + "s";

    svg.style.setProperty("--tx1", random(-1,1));
    svg.style.setProperty("--ty1", random(-1,1));
    svg.style.setProperty("--tx2", random(-1,1));
    svg.style.setProperty("--ty2", random(-1,1));
    svg.style.setProperty("--tx3", random(-1,1));
    svg.style.setProperty("--ty3", random(-1,1));
    svg.style.setProperty("--tx4", random(-1,1));
    svg.style.setProperty("--ty4", random(-1,1));

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "50");
    circle.setAttribute("fill", color);

    svg.appendChild(circle);
    wrapper.appendChild(svg);
  });
}

createBlobs();
window.addEventListener("resize", createBlobs);
