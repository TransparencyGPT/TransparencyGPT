from flask import Flask, request, jsonify
from flask_cors import CORS
from claude_prompt import bias_analysis
from combined_prompt import extract_transparency
from newsapi import NewsApiClient

import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)


@app.route("/analyze", methods=["POST"])
def analyze_text():

    api_key = "25d4e4d5fa0444b7bcbdae7c333b55f0"
    api = NewsApiClient(api_key=api_key)
    print("Received request:")
    data = request.json
    parsed = data.get("data")
    articleTopic = parsed.get("articleTopic")
    newsSource = parsed.get("newsSource")
    input_type = parsed.get("input_type")

    newsSource = newsSource.replace(" ", "-")

    if input_type != "url":
        try:
            articles = api.get_everything(q=articleTopic, sources=newsSource)
            recent_article = articles["articles"][0]
            article = recent_article.get("content")
            url = recent_article.get("url")
        except:
            return jsonify({"error": "No article provided"}), 400
    else:
        url = parsed.get("url")
        print(url)

    response2 = requests.get(url)
    html_content = response2.text
    soup = BeautifulSoup(html_content, "html.parser")

     # Corrected approach for extracting title
    title_tag = soup.find('meta', property='og:title') or soup.find('title')
    title = title_tag['content'] if title_tag and 'content' in title_tag.attrs else title_tag.text if title_tag else None

    # Corrected approach for extracting author
    # Here we avoid using lambda in a conflicting way with the 'name' parameter
    author_tag = soup.find('meta', attrs={'name': lambda x: x and 'author' in x.lower()})
    author = author_tag['content'] if author_tag and 'content' in author_tag.attrs else None


    article_text = ""
    for paragraph in soup.find_all("p"):
        article_text += paragraph.get_text().strip() + " "

    if not article_text:
        return jsonify({"error": "No article provided"}), 400

    subjectivity_score, text_analysis, GPT_answer, GPT_token_count = extract_transparency(title, article_text, author, url)

    return jsonify(
        {
            "subjectivity_score": subjectivity_score,
            "text_analysis": text_analysis,
            "GPT_answer": GPT_answer,
            "GPT_token_count": GPT_token_count,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)

"""def combined_analysis():
    print("Received request:", request.json)
    data = request.json
    
    # Extracting each field individually
    author = data.get('author')
    url = data.get('url')
    title = data.get('title')
    text = data.get('article')  # Assuming 'article' is the key for the text content
    
    # Checking if all required data is present
    if not all([author, url, title, text]):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Assuming extract_transparency function returns these three values correctly
    subjectivity_score, final_answer, GPT_token_count = extract_transparency(title, author, url, text)
    
    return jsonify({
        "subjectivity_score": subjectivity_score,
        "final_answer": final_answer,
        "GPT_token_count": GPT_token_count
    })"""
