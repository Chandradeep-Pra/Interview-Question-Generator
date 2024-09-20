from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from config import API_KEY
from pydantic import BaseModel
from simple_ats.ats import ATS
import google.generativeai as genai
from typing import List
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')

app = FastAPI()

class InterviewTextInput(BaseModel):
    cv_parsed : str
    company_name : str
    experience_level : str
    job_description : str

origins = ["http://localhost:3000"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def invoke_gpt_model_for_json_response(user_prompt,system_prompt):
    messages=user_prompt+system_prompt,
    response = model.generate_content(messages)
    response=str(response)
    print(response)
    return response

@app.post("/generate-interview-question/")
async def generate_interview_question(
    request_body: InterviewTextInput,
    
):
    try:                
        text = request_body.cv_parsed
        company_name = request_body.company_name
        experience_level = request_body.experience_level
        job_description = request_body.job_description
        user_prompt = f"This is my parse cv {text} and I am applying for this company - {company_name} and they are looking for a candidate with experience level of {experience_level} and the job description states {job_description}, suggest me 10 good questions for the interview for this, give the output as questions only in array"
        system_prompt = "You are an fullstack developer interview question generator and you have a parsed cv as user input, give me interview question for it, generate in form of an array of strings , each element of array is question generated"
        result = invoke_gpt_model_for_json_response(user_prompt,system_prompt)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    

@app.post("/calculate-ats-similarity/")
async def calculate_ats_similarity(request_body: dict):
    try:
        # Extract resume content and job description from request body
        resume_content = request_body.get("resume_content")
        jd_content = request_body.get("jd_content")

        # Validate inputs
        if not resume_content or not jd_content:
            raise HTTPException(status_code=400, detail="Both 'resume_content' and 'jd_content' are required.")

        # Initialize ATS object
        ats = ATS()

        # Load resume and job description into ATS
        ats.load_resume(resume_content)
        ats.load_job_description(jd_content)

        # Extract and clean experience
        experience = ats.extract_experience()
        ats.clean_experience(experience)

        # Extract and clean skills
        skills = " ".join(ats.extract_skills())
        ats.clean_skills(skills)

        # Compute similarity score
        similarity_score = ats.compute_similarity()

        # Return the similarity score as a percentage
        return {
            "similarity_score": round(similarity_score.item() * 100, 2),
            "message": f"The similarity score between the resume and job description is {round(similarity_score.item() * 100, 2)}%"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating similarity: {str(e)}")
    

# Model to receive question-answer pairs in the request
class QAInput(BaseModel):
    question: str
    user_answer: str

class ScoreRequest(BaseModel):
    qa_list: List[QAInput]

# The API that calculates the total score
@app.post("/score-interview-answers/")
async def score_interview_answers(request_body: ScoreRequest):
    try:
        qa_list = request_body.qa_list
        
        # Preparing user prompt with question and answers
        user_prompt = [
            {
                "question": qa.question,
                "user_answer": qa.user_answer
            }
            for qa in qa_list
        ]

        # System prompt for instructing the model
        system_prompt = (
            "You are an expert interview evaluator. I will provide a list of questions and corresponding answers. For each question, compare the provided answer "
            "with an ideal response. Provide a score between 0 to 100 for each answer, where "
            "100 means a perfect answer, and 0 means an entirely incorrect answer."
        )

        # Invoke the GPT model for scoring
        # The result is assumed to be a JSON string that needs parsing
        raw_response = invoke_gpt_model_for_json_response(str(user_prompt), str(system_prompt))
        
       

        return raw_response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)