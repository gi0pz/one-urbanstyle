const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;


//Slider: 

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});




//Second section:

const projects = document.querySelector(".projects");
const preview = document.querySelector(".preview");
const previewImg = document.querySelector(".preview-img");



let isInside = false;

const bgPositions = {
  p1: "0 0",
  p2: "0 25%",
  p3: "0 50%",
  p4: "0 75%",
  p5: "0 100%",
};

const moveStuff = (e) => {
  const mouseInside = isMouseInsideContainer(e);

  if (mouseInside != isInside) {
    isInside = mouseInside;
    if(isInside) {
      gsap.to(preview, 0.3, {
        scale: 1,
      });
    } else {
      gsap.to(preview, 0.3, {
        scale: 0,
      });
    }
  }
};

const moveProject = (e) => {
  const previewRect = preview.getBoundingClientRect();
  const offsetX = previewRect.width / 2;
  const offsetY = previewRect.height / 2;

  preview.style.left =  e.pageX - offsetX + "px";
  preview.style.top = e.pageY - offsetY + "px";
};

const moveProjectImg = (project) => {
  const projectId = project.id;
  gsap.to(previewImg, 0.4, {
    backgroundPosition: bgPositions[projectId] || "0 0",
  });
};

const isMouseInsideContainer = (e) => {
  const containerRect = projects.getBoundingClientRect();
  return (
    e.pageX >= containerRect.left &&
    e.pageX <= containerRect.right &&
    e.pageY >= containerRect.top &&
    e.pageY <= containerRect.bottom
  ); 
};

window.addEventListener("mousemove", moveStuff);

Array.from(projects.children).forEach((project) => {
  project.addEventListener("mousemove", moveProject);
  project.addEventListener("mousemove", moveProjectImg.bind(null, project));
});










