function showModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.appendChild(modal);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modal.appendChild(modalContent);

  for (let i = 0; i < 10; i++) {

    const lorem = document.createElement('p');
    lorem.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    modalContent.appendChild(lorem);
  }
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', closeModal);
  modalContent.appendChild(closeBtn);

  modal.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  modal.style.display = 'block';

  function closeModal() {
    modal.remove();
  }
}

const toggleLangBtn = document.getElementById('toggle-lang-btn');
toggleLangBtn.addEventListener('click', toggleLang);

function toggleLang() {
  if (toggleLangBtn.textContent === 'English') {
    toggleLangBtn.textContent = 'Français';
  } else {
    toggleLangBtn.textContent = 'English';
  }
}

if (!localStorage.getItem("tourCompleted")) {
  // show modal
  document.getElementById("tour-modal").style.display = "block";

  // add event listeners to buttons
  document.getElementById("start-tour").addEventListener("click", startTour);
  document.getElementById("skip-tour").addEventListener("click", skipTour);
}

function startTour() {
  // Show 10 words of lorem ipsum in the tour modal
  const tourModalContent = document.querySelector("#tour-modal-content");
  tourModalContent.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  // Add the "top-row" class to all elements in the top row of the grid
  const topRowElements = document.querySelectorAll(".header:nth-child(-n+8)");
  topRowElements.forEach(element => element.classList.add("top-row"));

  const nextBtn = document.querySelector(".next-button");
  nextBtn.textContent = "Next";
  nextBtn.removeEventListener("click", startTour);
  nextBtn.addEventListener("click", stepTwo);


}

function stepTwo() {
  // remove top-row class from top row of grid
  const topRow = document.querySelectorAll(".header:nth-child(-n+8)");
  topRow.forEach((item) => {
    item.classList.remove("top-row");
  });

// add top-row class to left column of grid
  const leftColumn = document.querySelectorAll(".content:nth-child(8n+1)");
  leftColumn.forEach((item) => {
    item.classList.add("top-row");
  });

  const nextBtn = document.querySelector(".next-button");
  nextBtn.removeEventListener("click", stepTwo);
  nextBtn.addEventListener("click", stepThree)
}

function stepThree() {

// remove .top-row class from left column
  const leftColumn = document.querySelectorAll(".content:nth-child(8n+1)");
  leftColumn.forEach((item) => {
    item.classList.remove("top-row");
  });

// add .top-row class to element in 3rd row of column 6
  const element = document.querySelector(".content:nth-child(22)");
  element.classList.add("top-row");


  const nextBtn = document.querySelector(".next-button");
  nextBtn.removeEventListener("click", stepThree);
  nextBtn.addEventListener("click", stepFour)
}

function stepFour() {

// remove .top-row class to element in 3rd row of column 6
  const element = document.querySelector(".content:nth-child(22)");
  element.classList.remove("top-row");


  document.querySelector("#toggle-lang-btn").classList.add("top-row");
  document.querySelector("#skip-tour").remove();
  document.querySelector("#start-tour").textContent = "End";
  document.querySelector(".tour-buttons").style.justifyContent = "center";

  const nextBtn = document.querySelector(".next-button");
  nextBtn.removeEventListener("click", stepFour);
  nextBtn.addEventListener("click", finishTour);


  document.querySelector("#toggle-lang-btn").style.boxShadow = "0 0 0 1em white";
}

function finishTour() {


  document.querySelector("#toggle-lang-btn").style.boxShadow = "none";

  // set localStorage key
  localStorage.setItem("tourCompleted", true);

  // close modal
  document.getElementById("tour-modal").style.display = "none";

}

function skipTour() {
  // set localStorage key
  localStorage.setItem("tourCompleted", true);

  // close modal
  document.getElementById("tour-modal").style.display = "none";
}
