//const { text } = require("body-parser");
export async function generateInterviewQuestion(text, model = "gpt-3.5-turbo", temperature = 0.7, maxTokens = 1500) {
    // const userPrompt = {
    //   user_prompt: text
    // };
    console.log("From gnerate qs" , text);
  
    try {
        const formData = new FormData();
        const interviewQuestionResponse = await fetch("http://127.0.0.1:8000/generate-interview-question/", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
  
      if (!interviewQuestionResponse.ok) {
        throw new Error(`Error: ${interviewQuestionResponse.status} - ${interviewQuestionResponse.statusText}`);
      }
  
      const interviewQuestionData = await interviewQuestionResponse.json();
      return interviewQuestionData;
    } catch (error) {
      console.error("Error generating interview question:", error);
      throw error; // Re-throw for further handling (optional)
    }
  }
  
  // Example usage:
//   generateInterviewQuestion(text)
//     .then(data => {
//       console.log("Interview question:", data.interview_question);
//       // Update UI with the interview question
//     })
//     .catch(error => {
//       console.error("Error generating question:", error);
//       // Handle errors (e.g., display error message to user)
//     });
  