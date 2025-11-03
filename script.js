// Get the breed select element from the page
const breedSelect = document.getElementById('breed-select');

// Fetch the list of dog breeds from the Dog API
fetch('https://dog.ceo/api/breeds/list/all')
  .then(function(response) {
    // Convert the response to JSON
    return response.json();
  })
  .then(function(data) {
    // Get the breeds object from the API response
    const breeds = data.message;

    // Loop through each breed in the breeds object
    for (const breed in breeds) {
      // Create a new option element for each breed
      const option = document.createElement('option');
      option.value = breed; // Set the value to the breed name
      option.textContent = breed; // Set the text to the breed name

      // Add the option to the select menu
      breedSelect.appendChild(option);
    }
  });

// Get the gallery element from the page
const gallery = document.getElementById('gallery');

// Listen for changes to the breed select menu
breedSelect.addEventListener('change', function() {
  // Get the selected breed from the menu
  const selectedBreed = breedSelect.value;

  // Clear the gallery before showing new images
  gallery.innerHTML = '';

  // Only fetch images if a breed is selected
  if (selectedBreed) {
    // Build the API URL to get 9 random images for the selected breed
    const imageUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random/9`;

    // Fetch 9 random images for the selected breed
    fetch(imageUrl)
      .then(function(response) {
        // Convert the response to JSON
        return response.json();
      })
      .then(function(data) {
        // Get the array of image URLs from the API response
        const dogImages = data.message;

        // Loop through each image URL
        dogImages.forEach(function(dogImage) {
          // Create an img element to show the dog image
          const img = document.createElement('img');
          img.src = dogImage;
          img.alt = `A ${selectedBreed} dog`;

          // Add the image to the gallery
          gallery.appendChild(img);
        });
      });
  }
});
