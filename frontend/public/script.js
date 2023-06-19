// Get DOM elements
const profileImagePreview = document.getElementById('profile-image-preview');
const profileImageInput = document.getElementById('profile-image-input');
const firstNameInput = document.getElementById('first-name-input');
const surnameInput = document.getElementById('surname-input');
const zipInput = document.getElementById('zip-input');
const countryInput = document.getElementById('country-input');
const cityInput = document.getElementById('city-input');
const streetInput = document.getElementById('street-input');
const houseNumberInput = document.getElementById('house-number-input');
const introductionInput = document.getElementById('introduction-input');
const saveButton = document.getElementById('save-button');
const deleteButton = document.getElementById('delete-button');

// Load profile data if available
window.addEventListener('DOMContentLoaded', () => {
  loadProfileData();
});

// Load profile data from profile.json
function loadProfileData() {
  fetch('profile.json')
    .then(response => response.json())
    .then(data => {
      firstNameInput.value = data.firstName || '';
      surnameInput.value = data.surname || '';
      zipInput.value = data.address ? data.address.zip : '';
      countryInput.value = data.address ? data.address.country : '';
      cityInput.value = data.address ? data.address.city : '';
      streetInput.value = data.address ? data.address.street : '';
      houseNumberInput.value = data.address ? data.address.houseNumber : '';
      introductionInput.value = data.introduction || '';
    })
    .catch(error => {
      console.error('Error loading profile data:', error);
    });
}

// Save profile data to profile.json
function saveProfileData() {
  const profileData = {
    firstName: firstNameInput.value,
    surname: surnameInput.value,
    address: {
      zip: zipInput.value,
      country: countryInput.value,
      city: cityInput.value,
      street: streetInput.value,
      houseNumber: houseNumberInput.value
    },
    introduction: introductionInput.value
  };

  const profileJSON = JSON.stringify(profileData);

  // Send the profile data to the server
  fetch('save-profile.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: profileJSON
  })
    .then(response => {
      if (response.ok) {
        console.log('Profile data saved successfully.');
      } else {
        console.error('Error saving profile data:', response.status);
      }
    })
    .catch(error => {
      console.error('Error saving profile data:', error);
    });
}

// Delete profile data
function deleteProfileData() {
  // Send a request to delete the profile data on the server
  fetch('delete-profile.php', {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        console.log('Profile data deleted successfully.');
        clearProfileData();
      } else {
        console.error('Error deleting profile data:', response.status);
      }
    })
    .catch(error => {
      console.error('Error deleting profile data:', error);
    });
}

// Clear all input fields
function clearProfileData() {
  profileImagePreview.src = '#';
  profileImageInput.value = '';
  firstNameInput.value = '';
  surnameInput.value = '';
  zipInput.value = '';
  countryInput.value = '';
  cityInput.value = '';
  streetInput.value = '';
  houseNumberInput.value = '';
  introductionInput.value = '';
}

// Event listeners for the save and delete buttons
saveButton.addEventListener('click', saveProfileData);
deleteButton.addEventListener('click', deleteProfileData);

// Event listener for the profile image input
profileImageInput.addEventListener('change', () => {
  const file = profileImageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      profileImagePreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});
