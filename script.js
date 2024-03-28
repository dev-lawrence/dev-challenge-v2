const form = document.querySelector('form');
const selectActivity = document.querySelector('#activity-select');
const foodAllergies = document.querySelector('#food-allergies');
const additionalInfo = document.querySelector('#additional-info');
const container = document.querySelector('#camp-activities-inquiry');
const title = document.querySelector('h1');
const button = document.querySelector('button');
const body = document.querySelector('body');

foodAllergies.placeholder = 'Please list any food allergies';
additionalInfo.placeholder = 'Enter additional information';

const errorMessage = document.createElement('p');
errorMessage.textContent = 'Please select an activity';
errorMessage.classList.add('error-message');
errorMessage.className = 'error-message';

// Define background images and corresponding title and button colors for each activity
const activityStyles = {
  hiking: {
    backgroundImage: 'hiking.png',
    titleColor: '#A0DE7F',
    buttonBgColor: '#A0DE7F',
    buttonTextColor: '#000',
  },
  canoeing: {
    backgroundImage: 'canoeing.png',
    titleColor: '#1fd31f',
    buttonBgColor: '#1fd31f',
    buttonTextColor: '#000',
  },
  fishing: {
    backgroundImage: 'fishing.png',
    titleColor: '#E3B84C',
    buttonBgColor: '#E3B84C',
    buttonTextColor: '#000',
  },
  crafts: {
    backgroundImage: 'craft.png',
    titleColor: 'orange',
    buttonBgColor: 'orange',
    buttonTextColor: '#000',
  },
  archery: {
    backgroundImage: 'archery.png',
    titleColor: '#000',
    buttonBgColor: '#000',
    buttonTextColor: '#fff',
  },
};

// Function to change background image, title color, and button color based on selected activity with transition
function changeStyles(activity) {
  const { backgroundImage, titleColor, buttonTextColor, buttonBgColor } =
    activityStyles[activity];
  if (backgroundImage) {
    body.style.transition = 'background-image 0.5s ease';
    body.style.backgroundImage = `url('${backgroundImage}')`;
    title.style.transition = 'color 0.5s ease';
    title.style.color = titleColor;
    button.style.transition = 'color 0.5s ease, background-color 0.5s ease';
    button.style.color = buttonTextColor;
    button.style.backgroundColor = buttonBgColor;
  }
}

selectActivity.addEventListener('change', () => {
  const selectedActivity = selectActivity.value;
  changeStyles(selectedActivity);

  if (errorMessage) {
    errorMessage.remove();
  }
});

// form submit event
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const successMessage = document.createElement('p');
  successMessage.textContent = `Thank you for your submission! Your inquiry has been successfully received.`;
  successMessage.classList.add('success-message');
  successMessage.id = 'success-message';

  const formData = new FormData(form);

  // Convert formData to a plain object
  const data = Object.fromEntries(formData);

  if (!data.activity) {
    // Remove existing alert errors before inserting a new one
    const existingAlertError = document.querySelector('.error-message');
    if (existingAlertError) {
      existingAlertError.remove();
    }
    selectActivity.insertAdjacentElement('beforebegin', errorMessage);
  } else if (!data.food_allergies) {
    errorMessage.textContent = 'List any food allergies';
    foodAllergies.insertAdjacentElement('beforebegin', errorMessage);
  } else if (!data.additional_info) {
    errorMessage.textContent = 'Enter additional information';
    additionalInfo.insertAdjacentElement('beforebegin', errorMessage);
  } else {
    // Remove existing alert success before inserting a new one
    const existingAlertSuccess = document.querySelector('.success-message');
    if (existingAlertSuccess) {
      existingAlertSuccess.remove();
    }

    container.insertAdjacentElement('afterend', successMessage);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);

    // Clear form fields
    form.reset();

    // Remove alert success after 5 seconds
    setTimeout(() => {
      successMessage.remove();
      overlay.remove();
    }, 2000);
  }
});
