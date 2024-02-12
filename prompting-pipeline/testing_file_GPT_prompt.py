import openai
import os
from openai import OpenAI
import tiktoken


def web_analysis(author, url, topics):
    # This function defines a series of independent prompts 
    # to GPT4 and executes them. It then combines them and
    # counts the tokens used by the overall function.
    # It returns the combined answer and the token count.

    openai.api_key = "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"

    # client = OpenAI(
    #     api_key=os.environ.get(api_key)
    #     )

    # Define prompts and hyperparameters
    HUMAN_PROMPT = "Human: "
    AI_PROMPT = "AI: "
    # The model needs to be updated. I didn't have access to
    #GPT4 directly when writing this code.
    model = "gpt-4" 
    # Temperature controls randomness of the answer 
    # 0 = more deterministic/factual, 1 = more stochastic/creative)
    temperature = 0.2 

    # Define your prompts
    website_prompt = f"Find any general information about the website associated with {url} related \
        to the topics {topics}. Also include any political or financial affiliations the website has. \
        Is there anything about the website that indicates that it might carry a particular bias regarding \
        the topics mentioned?"
    author_prompt = f"Find any biographical information about {author} related to the topics: {topics}? \
        Also include any political or financial affiliations the author may have. Is there anything \
        about {author} that indicates that they might have a particular bias regarding the topics: {topics}?\
        List up to 5 recent articles written by {author} about the topics: {topics}. If you cannot find any,\
        list up to 5 recent articles published on the website associated to {url} about the topics: {topics}."
    audience_prompt = f"Find information about the main audience of the website associated to {url}. Especially\
        information regarding their gender, age, and political affiliations."
    subsidiary_prompt = f"What are the parent companies of the website associated to {url}? If the parent\
        companies themselves are owned by other companies, mention the entire hierarchical structure until \
        you find the holding companies at the top. Find any general information about these parent companies \
        related to any of the topics {topics} and include any political or financial affiliations these \
        companies might have. Is there anything about these companies that indicates that they might carry \
        a particular bias regarding the topics mentioned, or anything that would suggest a conflict of interest?"

    # Make API calls to generate completions
    response1 = openai.chat.completions.create(
        model="gpt-4",
        temperature=temperature,
        messages=[
            {
                "role": "user",
                "content": website_prompt,
            }
        ],
    )
    website_info = response1.choices[0].message.content

    # response2 = openai.Completion.create(
    #     engine=model,
    #     prompt=f"{HUMAN_PROMPT}{subsidiary_prompt}\n\n{AI_PROMPT}",
    #     max_tokens=1000,
    #     temperature=temperature,
    # )
    # subsidiary_info = response2.choices[0].text.strip()

    # response3 = openai.Completion.create(
    #     engine=model,
    #     prompt=f"{HUMAN_PROMPT}{author_prompt}\n\n{AI_PROMPT}",
    #     max_tokens=1000,
    #     temperature=temperature,
    # )
    # author_info = response3.choices[0].text.strip()

    # response4 = openai.Completion.create(
    #     engine=model,
    #     prompt=f"{HUMAN_PROMPT}{audience_prompt}\n\n{AI_PROMPT}",
    #     max_tokens=1000,
    #     temperature=temperature,
    # )
    # audience_info = response4.choices[0].text.strip()

    # # Combine all the ananlyses.
    # final_answer = website_info + "\n" + subsidiary_info + "\n" + author_info + "\n" + audience_info

    # Count the tokens in the combined text
    # combined_text = f"{HUMAN_PROMPT}{website_prompt}\n\n{AI_PROMPT}{website_info}\n\n{HUMAN_PROMPT}{author_prompt}\n\n{AI_PROMPT}{author_info}\n\n{HUMAN_PROMPT}{audience_prompt}\n\n{AI_PROMPT}{audience_info}\n\n{HUMAN_PROMPT}{subsidiary_prompt}\n\n{AI_PROMPT}{subsidiary_info}"
    token_count = tiktoken.Tiktoken().count(website_info)

    return website_info, token_count

topics = 'Donald Trump, Nikki Haley, 2024 election, New Hampshire primary'
author = "Paul Steinhauser"
url = "https://www.foxnews.com/politics/donald-trump-dominates-again-as-former-president-easily-beats-nikki-haley-in-new-hampshire-gop-primary",

final_answer, token_count = web_analysis(author, url, topics)

print("final answer is: ", final_answer)
print("nb of tokens is: ", token_count)