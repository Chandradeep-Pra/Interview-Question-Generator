from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from langchain_community.document_loaders import PDFMinerLoader
from langchain_community.document_loaders import PyPDFium2Loader
from openai import OpenAI
import os
import PyPDF2


app = FastAPI()

# Assuming you have a configured OpenAI client
# Replace this with your actual OpenAI client instantiation
api_key = ""
client = OpenAI(api_key=api_key)  # Pass the API key as a named argument

def invoke_gpt_model_for_json_response(user_prompt, model="gpt-3.5-turbo", temperature=0.2, max_tokens=1000):
    system_prompt = "You are an interview question generator and you have a parsed prompt"
    response = client.chat.completions.create(
        model=model,
        messages=[{'role': 'system', 'content': system_prompt}, {'role': 'user', 'content': user_prompt}],
        max_tokens=max_tokens,
        temperature=temperature,
    )
    final_response = list(response.choices)[0].message.content
    return {"interview_question": final_response}

@app.post("/generate-interview-question/")
async def generate_interview_question(
    pdf_file: UploadFile = File(...),
    model: str = Query("gpt-3.5-turbo", description="GPT model to use"),
    temperature: float = Query(0.2, description="Temperature for sampling"),
    max_tokens: int = Query(1000, description="Maximum number of tokens in the response")
):
    try:

        # Open the PDF file in binary mode
        with open('/Users/kaushalagarwal/Downloads/2.pdf', 'rb') as file:
            # Create a PDF reader object
            pdf_reader = PyPDF2.PdfReader(file)

            # Initialize an empty string to store extracted text
            text = ''

            # Iterate through each page of the PDF
            for page_num in range(len(pdf_reader.pages)):
                # Extract text from the current page
                page = pdf_reader.pages[page_num]
                text += page.extract_text()
                data = text

                # Invoke GPT model for JSON response
                user_prompt = data
                result = invoke_gpt_model_for_json_response(user_prompt, model, temperature, max_tokens)

            # Remove temporary file
            #os.remove(file_path)

            return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)