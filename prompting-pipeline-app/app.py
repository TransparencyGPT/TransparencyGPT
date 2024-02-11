from flask import Flask, request, jsonify
from claude_prompt import bias_analysis
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_text():
    print("Received request:", request.json)
    data = request.json
    article = data.get('article')
    if not article:
        return jsonify({"error": "No article provided"}), 400
    
    subjectivity_score, topics, text_analysis = bias_analysis(article)
    
    return jsonify({
        "topics": topics,
        "subjectivity_score": subjectivity_score,
        "analysis": text_analysis
    })

if __name__ == '__main__':
    app.run(debug=True)

CORS(app)
