from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT
import openai
from openai import OpenAI
import tiktoken
import json
import re
from text_import import import_json_data
from GPT_prompt import web_analysis
from claude_prompt import bias_analysis

# Updated 02/13/24 - 3:55PM


def extract_transparency(file_path):
    '''This function calls the claude prompt for bias analysis and
    the GPT prompt for web analysis and combine their output.
    It feeds to a string of topics outputed by the claude prompt
    into the GPT prompt for generalizing the prompting more 
    efficiently. It then makes one last prompt to chatGPT to 
    reformat the final output.
    It returns the subjectivity score as an Int, the final answer,
    and the token count for GPT4 only (can be applied to claude and
    chatGPT as well if necessary later).'''

    title, author, url, article = import_json_data(file_path)
    subjectivity_score, topics, text_analysis = bias_analysis(article)
    GPT_answer, GPT_token_count = web_analysis(author, url, topics)
    combined_answer = text_analysis + "\n" + GPT_answer

    # Define model name and hyperparameters
    client = OpenAI(api_key="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")
    model = "gpt-3.5-turbo" 
    temperature = 0.2 

    final_prompt = f"Please rewrite the following analysis of bias in the article \
        '{title}'. Your task is to structure the information logically, eliminating redundancy, \
        and combine relevant details within the same paragraph. Emphasize all parts talking about bias.\
        Please exlude any references to unobtainable information and retain only factual elements. \
        Here is the provided text to work with: {combined_answer}. Start your answer with: \
        '*** Here is our bias analysis for this article: ', and finish your answer with '***'"

    final_response = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[{"role": "user", "content": final_prompt,}]
    )
    final_answer = final_response.choices[0].message.content.strip()

    return subjectivity_score, final_answer, GPT_token_count


# Define path to extract data from external file
file_path = 'text1.json'

# Overall function call
subjectivity_score, final_answer, GPT_token_count = extract_transparency(file_path)

# Check output
print("The Subjectivity score is: ", subjectivity_score)
print(final_answer)
print("This prompt used ", GPT_token_count, " tokens with GPT.")