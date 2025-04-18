//<-----Preloader------------>

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.visibility = "hidden";
    loader.style.pointerEvents = "none";
  }, 1000); // 2 seconds delay after page load
});




//<---------------------Nav Bar-------------------------->

    // Hamburger Toggle for Mobile Navigation
    const hamburger = document.querySelector("#hamburger");
    const navLinks = document.querySelector("#nav-links");

    hamburger.addEventListener("click", () => {
        // Toggle the 'active' class to show/hide navigation links on mobile
        navLinks.classList.toggle("active");
    });

    // Close mobile nav when any navigation link is clicked
    document.querySelectorAll("#nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });


// <-----------------Hero Section-------------------->

//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// <-------------------SKILLS SECTION----------------------->

document.addEventListener('DOMContentLoaded', () => {

  // Pre-defined sub-skills
  const subSkillsData = {
    "Gaming": { "Accuracy": 40, "FPS": 60, "PvP": 60 },
    "Coding": { "HTML/CSS": 85, "JavaScript": 80, "Python": 75 },
    "Video Editing": { "Cutting": 80, "Transitions": 85, "Effects": 75 },
    "Other": { "Communication": 90, "Problem Solving": 80, "Creativity": 85 }
  };

  // Radii must match the r in your SVG circles
  const radii = { outer: 50, middle: 40, inner: 30 };

  // Helper to get circumference of a circle
  const circumference = (r) => 2 * Math.PI * r;

  // Animate each skill card's circular progress rings
  document.querySelectorAll('.skill-card').forEach(card => {
    const skillName = card.getAttribute('data-skill');
    const subSkills = subSkillsData[skillName];
    if (!subSkills) return;
    
    // get the sub-skill values
    const values = Object.values(subSkills);
    // average
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    
    // get SVG elements
    const svg = card.querySelector('svg');
    const textEl = svg.querySelector('.progress-text');
    const outerRing = svg.querySelector('.progress-ring.outer');
    const middleRing = svg.querySelector('.progress-ring.middle');
    const innerRing = svg.querySelector('.progress-ring.inner');

    // set the dasharray
    outerRing.setAttribute('stroke-dasharray', circumference(radii.outer));
    middleRing.setAttribute('stroke-dasharray', circumference(radii.middle));
    innerRing.setAttribute('stroke-dasharray', circumference(radii.inner));

    // initially hide the ring
    outerRing.style.strokeDashoffset = circumference(radii.outer);
    middleRing.style.strokeDashoffset = circumference(radii.middle);
    innerRing.style.strokeDashoffset = circumference(radii.inner);

    // animate after a short delay
    setTimeout(() => {
      const updateRing = (ring, value, rad) => {
        const circ = circumference(rad);
        const offset = circ * (1 - value / 100);
        ring.style.strokeDashoffset = offset;
      };
      
      updateRing(outerRing, values[0], radii.outer);
      updateRing(middleRing, values[1], radii.middle);
      updateRing(innerRing, values[2], radii.inner);

      textEl.textContent = avg + '%';
    }, 200);

    // On click => open modal with sub-skill details
    card.addEventListener('click', () => openModal(skillName));
  });

  /* Modal functionality */
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalButton = document.getElementById('closeModal');
  const modalSkillTitle = document.getElementById('modalSkillTitle');
  const subSkillsContainer = document.getElementById('subSkillsContainer');
  const chartNumber = document.getElementById('chartNumber');
  const chartProgressEl = document.querySelector('.chart-progress');

  function openModal(skillName) {
    const subSkills = subSkillsData[skillName];
    const entries = Object.entries(subSkills);

    // Clear existing sub-skill items
    subSkillsContainer.innerHTML = '';

    let total = 0;
    entries.forEach(([name, val]) => {
      total += val;
      // Create sub-skill item
      const subSkillDiv = document.createElement('div');
      subSkillDiv.className = 'sub-skill';

      const label = document.createElement('div');
      label.className = 'sub-skill-title';
      label.textContent = `${name}: ${val}%`;

      const progressBar = document.createElement('div');
      progressBar.className = 'sub-progress-bar';

      const progressFill = document.createElement('div');
      progressFill.className = 'sub-progress-fill';
      progressFill.setAttribute('data-progress', val);

      progressBar.appendChild(progressFill);
      subSkillDiv.appendChild(label);
      subSkillDiv.appendChild(progressBar);

      subSkillsContainer.appendChild(subSkillDiv);
    });

    const avg = Math.round(total / entries.length);
    // update modal skill title
    modalSkillTitle.textContent = skillName + ' Details';
    // reset the average chart offset
    const circ = 2 * Math.PI * 54; // r = 54 for the chart
    chartProgressEl.style.strokeDashoffset = circ;

    // Show modal
    modalOverlay.classList.add('active');
    // small delay for bar animations
    setTimeout(() => {
      document.querySelectorAll('.sub-progress-fill').forEach(fill => {
        const progVal = fill.getAttribute('data-progress');
        fill.style.width = progVal + '%';
      });
      // animate average circle
      const offset = circ * (1 - (avg / 100));
      chartProgressEl.style.strokeDashoffset = offset;
      chartNumber.textContent = avg + '%';
    }, 100);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    // reset sub-progress
    document.querySelectorAll('.sub-progress-fill').forEach(fill => {
      fill.style.width = '0';
    });
  }

  closeModalButton.addEventListener('click', closeModal);

  // Also close modal if clicking outside it
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
});

//<---------------------==Mission and vision section========--------------->

  // Scroll reveal animation for mission section
  document.addEventListener("DOMContentLoaded", () => {
    const missionSection = document.getElementById("mission-section");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            missionSection.classList.add("show");
            observer.unobserve(missionSection); // animate only once
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(missionSection);
  });
