import os
import requests
import pdfkit
from bs4 import BeautifulSoup
from openai import OpenAI

client = OpenAI()

# Set your OpenAI API key
OpenAI.api_key = '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'

def save_webpage_as_pdf(url):
    # Convert the webpage to PDF
    pdfkit.from_url(url, 'output.pdf')

def get_author_from_webpage(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Assuming the author information is within a meta tag property
    author = soup.find('meta', property='author') or soup.find('meta', attrs={'name': 'author'})
    author_name = author.get('content') if author else 'Unknown'

    return author_name

def get_webpage_text(url):
    # Send a GET request to the URL
    response = requests.get(url)
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    # Extract the text from paragraphs and other elements
    text_parts = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'])  # You can add more tags if you need to
    # Combine the text from all the elements
    combined_text = ' '.join(part.get_text().strip() for part in text_parts)
    return combined_text



def main():
    url = input("Enter the URL of the webpage: ")
    save_webpage_as_pdf(url)
    author_name = get_author_from_webpage(url)
    webpage_text = get_webpage_text(url)

    stream = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Say this is a test"}],
        stream=True,
    )
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end="")
        print(webpage_text)

if __name__ == "__main__":
    main()