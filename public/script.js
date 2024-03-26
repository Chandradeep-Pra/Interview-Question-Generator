const cvInput = document.getElementById('cv-input');
const selectedFileDisplay = document.getElementById('selected-file');
const fileNameElement = selectedFileDisplay.querySelector('.file-name');
const companyInput = document.getElementById("com-input");

// Company name selection functionality
const companyNames = [
  "Google",
  "Amazon",
  "Meta (Facebook)",
  "Apple",
  "Microsoft",
  "Netflix",
  "Tesla",
  "NVIDIA",
  "Uber",
  "Airbnb"
];

const handleInputChange = (event) =>{
  const userInput = event.target.value.toLowerCase();
  const suggestions = companyNames.filter(company => company.toLowerCase().startsWith(userInput));

  // Clear any existing suggestion list (more robust approach)
const existingSuggestionList = companyInput.parentNode.querySelector(".suggestion-list");
if (existingSuggestionList) {
  companyInput.parentNode.removeChild(existingSuggestionList);
}


  const suggestionList = document.createElement("ul");
  suggestionList.classList.add("suggestion-list");

  // // Clear previous suggestions (if any)
  // companyInput.parentNode.removeChild(suggestionList); // More robust approach

  // No suggestions found
  if (suggestions.length === 0) {
    const newCompanyItem = document.createElement("li");
    newCompanyItem.innerText = userInput;
    newCompanyItem.classList.add("new-company"); // Optional class to differentiate new entries

    newCompanyItem.addEventListener("click", () => {
      companyInput.value = userInput;
      // Add new company to the list and suggestions
      companyNames.push(userInput);
      suggestionList.remove(); // Remove suggestion list on selection
    });

    suggestionList.appendChild(newCompanyItem);
  }else {
    // Create list items for existing suggestions
    suggestions.forEach(suggestion => {
      const suggestionItem = document.createElement("li");
      suggestionItem.innerText = suggestion;
      suggestionItem.addEventListener("click", () => {
        companyInput.value = suggestion;
        suggestionList.remove(); // Remove suggestion list on selection
      });
      suggestionList.appendChild(suggestionItem);
    });
  }

  // Append suggestion list to the input element's parent node
  companyInput.parentNode.appendChild(suggestionList);
};

companyInput.addEventListener("keyup", handleInputChange);



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
  