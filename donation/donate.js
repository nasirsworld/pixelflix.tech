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
  