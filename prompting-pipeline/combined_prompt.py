from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT
import openai
import tiktoken
import json
import re
from text_import import import_json_data
from GPT_prompt import web_analysis
from claude_prompt import bias_analysis


def extract_transparency(file_path):
    # This function calls the claude prompt for bias analysis and
    # the GPT prompt for web analysis and combine their output.
    # It feeds to a string of topics outputed by the claude prompt
    # into the GPT prompt for generalizing the prompting more 
    # efficiently. It then makes one last prompt to chatGPT to 
    # reformat the final output.
    # It returns the subjectivity score as an Int, the final answer,
    # and the token count for GPT4 only (can be applied to claude and
    # chatGPT as well if necessary later).

    title, author, url, article = import_json_data(file_path)
    subjectivity_score, topics, text_analysis = bias_analysis(article)
    GPT_answer, GPT_token_count = web_analysis(author, url, topics)
    combined_answer = text_analysis + "\n" + GPT_answer

    # Make one last prompt to chatGPT to reformat the final answer
    openai.api_key = "YOUR_API_KEY"

    # Define prompts and hyperparameters for chatGPT
    HUMAN_PROMPT = "Human: "
    AI_PROMPT = "AI: "
    model = "gpt-3.5-turbo" 
    # Temperature controls randomness of the answer 
    # 0 = more deterministic/factual, 1 = more stochastic/creative)
    temperature = 0.2 

    final_prompt = f"Rewrite and summarize the following text, which analyzed the bias in the article \
        titled {title}. Structure it in a logical way and avoid redundancy. \
        Remove any part that mention that they weren't able to obtain a certain kind of \
        information and only keep elements that contain real information: {combined_answer}"

    final_response = openai.Completion.create(
        engine=model,
        prompt=f"{HUMAN_PROMPT}{final_prompt}\n\n{AI_PROMPT}",
        max_tokens=1000,
        temperature=temperature,
    )
    final_answer = final_response.choices[0].text.strip()

    return subjectivity_score, final_answer, GPT_token_count


# Define path to extract data from external file
file_path = 'text1.json'

# Overall function call
subjectivity_score, final_answer, GPT_token_count = extract_transparency(file_path)

# Check output
print("The Subjectivity score is: ", subjectivity_score)
print("Here is our bias analysis for this article:", final_answer)
print("This prompt used ", GPT_token_count, " tokens with GPT.")