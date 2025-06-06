// index.js

// Callbacks
const handleClick = (ramen) => {
    const detailImg = document.querySelector("#ramen-detail > .detail-image");
    const detailName = document.querySelector("#ramen-detail > .name");
    const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");
  
    detailImg.src = ramen.image;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailsRating.textContent = ramen.rating;
    detailsComment.textContent = ramen.comment;
  };
  
  const addSubmitListener = () => {
    const form = document.getElementById('new-ramen');
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const newRamen = {
        name: document.getElementById('new-name').value,
        restaurant: document.getElementById('new-restaurant').value,
        image: document.getElementById('new-image').value,
        rating: document.getElementById('new-rating').value,
        comment: document.getElementById('new-comment').value
      };
  
      const ramenMenu = document.getElementById('ramen-menu');
      const newImg = document.createElement('img');
      newImg.src = newRamen.image;
      
      newImg.addEventListener('click', () => handleClick(newRamen));
      
      ramenMenu.appendChild(newImg);
      form.reset();
    });
  };
  
  const displayRamens = () => {
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
        const ramenMenu = document.getElementById('ramen-menu');
        
        ramens.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.addEventListener('click', () => handleClick(ramen));
          ramenMenu.appendChild(img);
        });
      })
      .catch(error => console.error('Erreur:', error));
  };
  
  const main = () => {
    displayRamens();
    addSubmitListener();
  };
  
  document.addEventListener('DOMContentLoaded', main);
  
  // Export functions for testing
  export {
    displayRamens,
    addSubmitListener,
    handleClick,
    main,
  }; 