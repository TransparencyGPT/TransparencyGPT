from openai import OpenAI

# WHEN TESTING AND DEVELOPING, SET devMode TO TRUE 

def web_analysis(author, url, topics, devMode):
    '''This function defines a series of independent prompts 
    to GPT and executes them. It then combines them and
    counts the tokens used by the overall function.
    It returns the combined answer and the token count.'''
    if (devMode):
        return "DEvelopment Final answer", 0
    # Define model name and hyperparameters
    model="gpt-3.5-turbo"
    client = OpenAI(api_key="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")
    temperature = 0.2 

    # Define your prompts
    website_prompt = f"Find any general information about the website associated with {url} related \
        to the topics {topics} and include any political or financial affiliations the website has. \
        Is there anything about the website that indicates that it might carry a particular bias regarding \
        the topics mentioned? Do not repeat the url when mentioning the website. Do not repeat the topics list."
    
    subsidiary_prompt = f"What are the parent companies of the website associated to {url}? If the parent\
        companies themselves are owned by other companies, mention the entire hierarchical structure until \
        you find the holding companies at the top. Find any general information about these parent companies \
        related to any of the topics {topics} and include any political or financial affiliations these \
        companies might have. Is there anything about these companies that indicates that they might carry \
        a particular bias regarding the topics mentioned, or anything that would suggest a conflict of interest?\
        Do not repeat the url when mentioning the website. "
    
    author_prompt = f"Start your answer with: 'The author, author_name, your_answer'. Find any biographical information \
        about {author} related to the topics: {topics}? \ Also include any political or financial affiliations the author \
        may have. Is there anything about {author} that indicates that they might have a particular bias regarding the topics: {topics}?"
    
    audience_prompt = f"Find information about the main audience of the website associated to {url}. Especially\
        information regarding their gender, age, and political affiliations. Do not repeat the url when mentioning the website. "


    # Make API calls to generate completions
    response1 = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[{"role": "user", "content": website_prompt,}]
    )
    website_info = response1.choices[0].message.content.strip()

    response2 = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[{"role": "user", "content": subsidiary_prompt,}]
    )
    subsidiary_info = response2.choices[0].message.content.strip()

    response3 = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[{"role": "user", "content": author_prompt,}]
    )
    author_info = response3.choices[0].message.content.strip()

    response4 = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[{"role": "user", "content": audience_prompt,}]
    )
    audience_info = response4.choices[0].message.content.strip()

    # Combine all the ananlyses.
    combined_answer = website_info + "\n" + subsidiary_info + "\n" + author_info + "\n" + audience_info

    final_prompt = f"Please rewrite the following combined response succintly in three sentences emphasizing bias. Don't include any recommendations for readers, and only include the specific information there is on the source's bias.\
        Please exlude any references to unobtainable information, or general information and retain only factual elements. \
        Here is the provided text to work with: {combined_answer}'"

    final_response = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[{"role": "user", "content": final_prompt,}]
    )
    final_answer = final_response.choices[0].message.content.strip()
    # Count the tokens in the combined text
    token_count1 = response1.usage.total_tokens
    token_count2 = response2.usage.total_tokens
    token_count3 = response3.usage.total_tokens
    token_count4 = response4.usage.total_tokens
    total_token_count = token_count1 + token_count2 + token_count3 + token_count4

    return final_answer, total_token_count

# # The following code is only meant for testing the above function independently
# topics = 'Donald Trump, Nikki Haley, 2024 election, New Hampshire primary'
# author = "Paul Steinhauser"
# url = "https://www.foxnews.com/politics/donald-trump-dominates-again-as-former-president-easily-beats-nikki-haley-in-new-hampshire-gop-primary",

# final_answer, token_count = web_analysis(author, url, topics)

# print("final answer is: ", final_answer)
# print("nb of tokens is: ", token_count)
