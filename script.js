const cvInput = document.getElementById('cv-input');
const jobDescription = document.getElementById('job-description');
const generateButton = document.getElementById('generate-questions');
const resultsDiv = document.getElementById('results');

// generateButton.addEventListener('click', () => {
//   // Simulate processing (replace with actual logic for CV parsing and NLP)
//   resultsDiv.textContent = 'Generating questions...';
//   setTimeout(() => {
//     resultsDiv.textContent = 'Here are some suggested interview questions:';

//     // Replace with a list of dynamically generated questions based on CV and job description
//     const questionList = [
//       'Tell us about a time you had to overcome a technical challenge.',
//       'Describe your experience working in a team environment.',
//       'What are your salary expectations?' // This is a basic example, real interview questions would be more specific to the job description
//     ];

//     let questionHtml = '';
//     questionList.forEach(question => {
//       questionHtml += `<p>${question}</p>`;
//     });
//     resultsDiv.innerHTML = questionHtml;

//     resultsDiv.style.display = 'block'; 
//     resultsDiv.focus({ preventScroll: false });
//     resultsDiv.scroll({ top: resultsDiv.scrollHeight, behavior: 'smooth' });
//   }, 2000);
// });

generateButton.addEventListener('click', () => {
  // Disable button and show loading indicator
  generateButton.disabled = true;
  resultsDiv.textContent = 'Generating questions...';

  const formData = new FormData();
  formData.append('cv_file', cvInput.files[0]); // Add the file to FormData
  //console.log(formData);
  // Replace with your actual backend API endpoint URL, including the port
  const apiUrl = 'http://localhost:8000/generate-interview-question/';

  fetch(apiUrl, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        // Clear previous results
        resultsDiv.innerHTML = '';

        // Create list elements for each interview question
        data.forEach(question => {
          const listItem = document.createElement('li');
          listItem.textContent = question;
          resultsDiv.appendChild(listItem);
        });

        // Enable button again
        generateButton.disabled = false;

        // Show results
        resultsDiv.style.display = 'block';
        resultsDiv.focus({ preventScroll: false });
        resultsDiv.scroll({ top: resultsDiv.scrollHeight, behavior: 'smooth' });
      });
    } else {
      // Handle upload errors or backend issues
      console.error('Error uploading file:', response.statusText);
      resultsDiv.textContent = 'Error: Could not generate questions.';
      generateButton.disabled = false;
    }
  })
  .catch(error => {
    // Handle general errors
    console.error('Error:', error);
    resultsDiv.textContent = 'An error occurred. Please try again.';
    generateButton.disabled = false;
  });
});

var keyArr =  ['s', 'k', '-', 'D', '3', '6', 'i', 'p', 'V', 'P', 'H', 'O', 'C', 'I', 'P', 'Z', 'Z', 'n', '1', 'i', 'i', 'z', 'K', 'T', '3', 'B', 'l', 'b', 'k', 'F', 'J', 'w', 'v', 'r', 'T', 'D', 'm', 'h', 's', 'M', 'r', 'x', '8', 'D', 'y', '5', 'y', '8', 'i', 'O', 'i']

