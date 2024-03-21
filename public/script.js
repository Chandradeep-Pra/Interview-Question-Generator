const cvInput = document.getElementById('cv-input');
const selectedFileDisplay = document.getElementById('selected-file');
const fileNameElement = selectedFileDisplay.querySelector('.file-name');

cvInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const hasPdfExtension = file?.name.toLowerCase().endsWith('.pdf'); // Check for PDF extension (optional)
  
    selectedFileDisplay.innerHTML = ''; // Clear existing content
  
    if (file) {
      const fileNameElement = document.createElement('span'); // Create element for file name
      fileNameElement.textContent = file.name;
      fileNameElement.classList.add('file-name'); // Add class for styling
  
      const iconElement = document.createElement('i'); // Create element for icon
      if (hasPdfExtension) {
        iconElement.classList.add('fas', 'fa-file-pdf');
        iconElement.style.color = '#f00'; // Set PDF logo color (red)
      } else {
        // Add icon for other file types (optional)
        alert("Select a pdf or docx file");
      }
  
      selectedFileDisplay.appendChild(iconElement);   // Append icon second
      selectedFileDisplay.appendChild(fileNameElement); // Append file name first
    }
  });
  