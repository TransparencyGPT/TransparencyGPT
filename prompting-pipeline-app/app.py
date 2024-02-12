from flask import Flask, request, jsonify
from flask_cors import CORS
from claude_prompt import bias_analysis
from combined_prompt import extract_transparency
from newsapi import NewsApiClient


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

    print(articleTopic, newsSource)
    articles = api.get_everything(q=articleTopic, sources=newsSource)
    recent_article = articles["articles"][0]
    article = recent_article.get("content")

    if not article:
        return jsonify({"error": "No article provided"}), 400

    subjectivity_score, topics, text_analysis = bias_analysis(article)

    return jsonify(
        {
            "topics": topics,
            "subjectivity_score": subjectivity_score,
            "analysis": text_analysis,
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
