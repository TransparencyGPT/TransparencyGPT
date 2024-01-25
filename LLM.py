from openai import OpenAI
import os
import PyPDF2

article = "output.pdf"

def init():
    openai_api_key = os.environ.get('OPENAI_API_KEY')
    if not openai_api_key:
        print("OpenAI API key not found. Set the 'OPENAI_API_KEY' environment variable.")
        exit(1)
    client = OpenAI(api_key=openai_api_key)

def loadArticle(article):
    pdf_reader = PyPDF2.PdfReader(article)

    pdf_file = open(article, 'rb')
    num_pages = len(pdf_reader.pages)
    text = ""
    for page_number in range(num_pages):
        page = pdf_reader.pages[page_number]
        text += page.extract_text()

    # Close the PDF file
    pdf_file.close()

    return text

def callAndResponse():
    selected_information = input("What information do you want to extract? ")
    prompt = "Can you extract the " + selected_information + " from this article: " + loadArticle(article)
    try:
        response = client.chat.create(
            model="gpt-3.5-turbo-0613",
            messages=[{"role": "user", "content": prompt}]
        )
        for chunk in response.choices:
            print(chunk.message['content'])
    except Exception as e:
        print(f"Error during OpenAI response processing: {e}")

def main():
    print(loadArticle(article))

if __name__ == "__main__":
    main()
