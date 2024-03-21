import { generateInterviewQuestion } from './generateQuestions.js';

const pdfInput = document.getElementById("cv-input");
const testBtn = document.getElementById("generate-questions");
const result = document.getElementById("results");


// const totoDiv = document.createElement("div");
//     const totoImg = document.createElement('img');
//     totoImg.src = 'autoGif.gif'
//     totoDiv.classList.add("text-center","mb-4");

//     totoImg.style.width = '220px';
//     totoImg.style.height = '200px';
//     totoImg.classList.add('rounded-circle');

//     totoDiv.appendChild(totoImg);
//     result.appendChild(totoDiv)

testBtn.addEventListener("click", ()=>{
    const formData = new FormData();
    const totoDiv = document.createElement("div");
    const totoImg = document.createElement('img');
    totoImg.src = 'autoGif.gif'
    totoDiv.classList.add("text-center","mb-4");

    totoImg.style.width = '220px';
    totoImg.style.height = '220px';
    totoImg.classList.add('rounded-circle');

    totoDiv.appendChild(totoImg);
    result.appendChild(totoDiv)
    //title.classList.add("text-center", "mb-4");
    //title.innerText = "Reading CV ... .. .";
    //result.appendChild(title);
    result.scrollIntoView({ behavior: 'smooth' });
    result.focus();
    formData.append("pdfFile", pdfInput.files[0]);
    let extractedText;
    fetch("/extract-text",{
        method:"post",
        body: formData,
    }).then(response => {
        return response.text()
    }).then(data => {
        //title.innerText = "Reading CV ... .. .";
        extractedText=data
        //result.innerText=data;
        console.log(typeof extractedText);
        generateInterviewQuestion(extractedText)
         .then(inteviewQuestionData => {
            //result.innerText=inteviewQuestionData.interview_question;
            const questions =  inteviewQuestionData.interview_question;
            //console.log(questions, typeof questions);
            //console.log("Raw Questions:", questions); // Before backtick removal
            const jsonString = questions.replace(/`/g, "")
                  .replace(/javascript\s+/g, "")
                  .trim();
            //console.log("Cleaned String:", jsonString); // After cleaning
            const questionArray = JSON.parse(jsonString);
            //console.log("Parsed Questions:", questionArray);
            result.innerHTML = "";

            // Create title and line
            const title = document.createElement("h2");
            title.classList.add("text-center", "mb-4");
            title.innerText = "Generated Questions";
            result.appendChild(title);

            const line = document.createElement("hr");
            result.appendChild(line);
            questionArray.forEach((question,index) => {
                const questionElement = document.createElement("div");
                questionElement.classList.add("col-md-12", "mb-3");

                const questionNumber = document.createElement("span");
                questionNumber.id = "mic"
                questionNumber.classList.add("question-number");
                questionNumber.innerText = index + 1; // Add question number (counter starts from 0)
                questionElement.appendChild(questionNumber);

                const questionParagraph = document.createElement("p");
                questionParagraph.innerText = question;
                questionElement.appendChild(questionParagraph);

                const micIcon = document.createElement('h3');
                micIcon.innerHTML=`<i id="mic" class="fa-solid fa-microphone"></i>`
                questionElement.appendChild(micIcon);
                
                result.appendChild(questionElement);
                console.log("Interview Questions:", questionArray);
                result.scrollIntoView({ behavior: 'smooth' });
                result.focus();
              });
                
         })
         .catch(error => {
            console.error("Error generating question : ",error);
         })
    })
});


