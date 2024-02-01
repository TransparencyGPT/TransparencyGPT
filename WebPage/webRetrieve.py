import requests
import pdfkit
from bs4 import BeautifulSoup

def save_webpage_as_pdf(url):
    try:
        pdfkit.from_url(url, 'output.pdf')
    except Exception as e:
        print(f"Error during PDF conversion: {e}")

def get_author_from_webpage(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        author = soup.find('meta', property='author') or soup.find('meta', attrs={'name': 'author'})
        author_name = author.get('content') if author else 'Unknown'
        return author_name
    except Exception as e:
        return f"Error retrieving author: {e}"

def get_webpage_text(url):
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(response.text, 'html.parser')
        text_parts = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'])
        combined_text = ' '.join(part.get_text().strip() for part in text_parts)
        return combined_text
    except Exception as e:
        return f"Error retrieving webpage text: {e}"


def main():
    url = input("Enter the URL of the webpage: ")
    if not url.startswith('http://') and not url.startswith('https://'):
        print("Invalid URL format. Please enter a valid URL.")
        return
    save_webpage_as_pdf(url)
    author_name = get_author_from_webpage(url)
    webpage_text = get_webpage_text(url)
    #print(f"Author: {author_name}")
    #print(f"Text: {webpage_text}")
    print(f"PDF is saved as output.pdf. Run LLM.py to see pdf's text.")
    
    
if __name__ == "__main__":
    main()
