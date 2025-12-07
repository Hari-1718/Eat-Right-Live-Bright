// app.js — small helpers for responsive nav and interactions
document.addEventListener('DOMContentLoaded', function(){
  // simple nav toggle (works on all pages)
  var toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      document.documentElement.classList.toggle('nav-open');
    });
  });

  // close nav when clicking outside or when a link is clicked
  document.addEventListener('click', function(e){
    var nav = document.querySelector('.nav-actions');
    var toggle = document.querySelector('.nav-toggle');
    var isNavOpen = document.documentElement.classList.contains('nav-open');
    
    // Close if clicking outside the nav menu
    if (isNavOpen && nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
      document.documentElement.classList.remove('nav-open');
    }
    
    // Close nav when a link is clicked and add smooth transition
    if(e.target.matches('.nav-actions a')){
      var href = e.target.getAttribute('href');
      
      // Only add transition for internal links
      if(href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto:')){
        e.preventDefault();
        
        // Add fade out effect
        document.body.classList.add('page-transition');
        
        // Close menu immediately
        document.documentElement.classList.remove('nav-open');
        
        // Navigate after transition
        setTimeout(function(){
          window.location.href = href;
        }, 400); // Medium speed transition (400ms)
      } else {
        document.documentElement.classList.remove('nav-open');
      }
    }
  });

  // Remove transition class on page load for fade in
  window.addEventListener('pageshow', function(){
    document.body.classList.remove('page-transition');
  });

  // Close nav on escape key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      document.documentElement.classList.remove('nav-open');
    }
  });

  // basic lazy loading for images (optional enhancement)
  var lazyImgs = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
  if('IntersectionObserver' in window && lazyImgs.length){
    let io = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(e){
        if(e.isIntersecting){
          let img = e.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          obs.unobserve(img);
        }
      });
    }, {rootMargin: '50px 0px', threshold: 0.01});
    lazyImgs.forEach(function(i){ io.observe(i); });
  }
});
