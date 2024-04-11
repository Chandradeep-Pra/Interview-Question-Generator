const cvInput = document.getElementById('cv-input');
const selectedFileDisplay = document.getElementById('selected-file');
const fileNameElement = selectedFileDisplay.querySelector('.file-name');
const companyInput = document.getElementById("com-input");

// Company name selection functionality - Starts
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

let selectedSuggestion = null; // Track the currently selected suggestion object

const handleInputChange = (event) => {
  //const currentCompanyValue = companyInput.value;
  //console.log("Current company input value:", currentCompanyValue);
  const userInput = event.target.value.toLowerCase();
  const suggestions = companyNames.filter(company => company.toLowerCase().startsWith(userInput));

  // Create a suggestion list element (if it doesn't exist already)
  let suggestionList = companyInput.parentNode.querySelector(".suggestion-list");
  if (!suggestionList) {
    suggestionList = document.createElement("ul");
    suggestionList.classList.add("suggestion-list"); // Add a CSS class for styling (optional)
  }

  // Clear previous suggestions
  suggestionList.innerHTML = ''; // More efficient than removing and recreating the list

  // No suggestions found
  if (suggestions.length === 0) {
    const newCompanyItem = document.createElement("li");
    newCompanyItem.innerText = userInput;
    newCompanyItem.classList.add("new-company"); // Optional class to differentiate new entries

    newCompanyItem.addEventListener("click", () => {
      companyInput.value = userInput;
      companyNames.push(userInput);
      suggestionList.remove(); // Remove suggestion list on selection
    });

    suggestionList.appendChild(newCompanyItem);
  } else {
    // Create list items for suggestions
    suggestions.forEach(suggestion => {
      const suggestionItem = document.createElement("li");
      suggestionItem.innerText = suggestion;
      suggestionItem.addEventListener("click", () => {
        //console.log("Clicked inside ");
        companyInput.value = suggestion;
        selectedSuggestion = suggestion; // Update selected suggestion
        //console.log(companyInput.value);
        suggestionList.remove(); // Remove suggestion list on selection
      });

      suggestionList.appendChild(suggestionItem);
    });
  }

  // Append suggestion list to the input element's parent node
  companyInput.parentNode.appendChild(suggestionList);

  //console.log(companyInput.value);
};

companyInput.addEventListener("keyup", handleInputChange);

// Function to get company value
function getCompanyInputValue() {
  //console.log(companyInput.value);
  return companyInput.value;
}


cvInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const hasPdfExtension = file?.name.toLowerCase().endsWith('.pdf');
  
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

  export { getCompanyInputValue };
  