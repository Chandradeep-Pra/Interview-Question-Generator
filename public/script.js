//import * as pdfjsLib from './node_modules/pdfjs-dist/build/pdf';


const jobDescription = document.getElementById('job-description');
const generateButton = document.getElementById('generate-questions');
const resultsDiv = document.getElementById('results');
const cvInput = document.getElementById('cv-input');

let cvData = '';
cvInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];

  if (!file) {
    return; // No file selected
  }

  if (!file.type.startsWith('application/pdf')) {
    alert('Please select a PDF file');
    return; // Only accept PDF files
  }

  const reader = new FileReader();

  reader.onload = async (event) => {
    const arrayBuffer = event.target.result;
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer });
    const numPages = pdfDoc.numPages;

    cvData = ''; // Reset extracted text for new file
    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      cvData += pageText + ' '; // Add space between pages
    }
  };

  reader.readAsArrayBuffer(file);
});

generateButton.addEventListener('click', async () => {
  if (!cvData) {
    alert('Please upload and extract text from a PDF first');
    return;
  }

  const jobDescriptionText = jobDescription.value.trim() || ''; // Get job description or empty string

  resultsDiv.textContent = 'Generating questions...';
  console.log(cvData); // Log extracted text (optional for debugging)

  const response = await fetch('http://127.0.0.1:8000/generate-interview-question/', {
    method: 'POST',
    body: JSON.stringify({
      extracted_text: cvData,
      job_description: jobDescriptionText
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    alert('Error sending data to API');
    return;
  }

  const data = await response.json();
  resultsDiv.textContent = 'Here are some suggested interview questions:';

  let questionHtml = '';
  data.interview_questions.forEach(question => {
    questionHtml += `<p>${question}</p>`;
  });
  resultsDiv.innerHTML = questionHtml;

  resultsDiv.style.display = 'block';
  resultsDiv.focus({ preventScroll: false });
  resultsDiv.scroll({ top: resultsDiv.scrollHeight, behavior: 'smooth' });
});



// let base64Data = '';  // Store Base64 data globally for later API call

// cvInput.addEventListener('change', (event) => {
//   const file = event.target.files[0];

//   if (!file) {
//     return; // No file selected
//   }

//   if (!file.type.startsWith('application/pdf')) {
//     alert('Please select a PDF file');
//     return; // Only accept PDF files
//   }

//   const reader = new FileReader();

//   reader.onload = (event) => {
//     base64Data = event.target.result; // Store Base64 data for later API call
//   };

//   reader.readAsDataURL(file);
// });

// generateButton.addEventListener('click', () => {
//   if (!base64Data) {
//     alert('Please select a PDF file first.');
//     return;
//   }

//   resultsDiv.textContent = 'Generating questions...';
//   console.log(JSON.stringify(base64Data));
//   fetch('/generate-interview-question/', {
//     method: 'POST',
//     body: JSON.stringify({ cv_base64: base64Data }),
//     headers: { 'Content-Type': 'application/json' }
//   })
//     .then(response => response.json())
//     .then(data => {
//       resultsDiv.textContent = 'Here are some suggested interview questions:';

//       let questionHtml = '';
//       data.interview_questions.forEach(question => {
//         questionHtml += `<p>${question}</p>`;
//       });
//       resultsDiv.innerHTML = questionHtml;

//       resultsDiv.style.display = 'block';
//       resultsDiv.focus({ preventScroll: false });
//       resultsDiv.scroll({ top: resultsDiv.scrollHeight, behavior: 'smooth' });
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       resultsDiv.textContent = 'An error occurred while processing the request.';
//     });
// });
