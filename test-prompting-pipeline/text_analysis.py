from openai import OpenAI
import re
from text_import import import_json_data

# Updated 02/25/24
# Total response time = 6 seconds

# file_path = 'text1.json'
# title, author, url, article = import_json_data(file_path)


def bias_analysis_GPT(text):
    '''This function makes chained prompts to GPT-3.5 to extract
    the bias analysis from the text. It returns the bias
    analyses, a list of topics and a subjectivity score.'''

    # Define model name and hyperparameters
    model="gpt-3.5-turbo"
    client = OpenAI(api_key="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")
    temperature = 0.2 

    def extract_subjectivity(answer):
        '''This function extract the subjectivity score from
        Claude's answer to the second prompt. It uses non
        case-sensitive pattern recognition to find the subjectivity 
        score and returns it as an Int. If it cannot find it, it
        will return -1.'''
        pattern = re.compile(r'Subjectivity score\s*[:=]\s*(\d+)/\d+', re.IGNORECASE)
        match = re.search(pattern, answer)
        if match:
            subjectivity_score = int(match.group(1))
        else:
            # -1 is the placeholder to identify "no answer"
            subjectivity_score = -1
        return subjectivity_score

    def extract_topics(answer):
        '''This function extract the topics from Claude's answer 
        to the first prompt. It uses non case-sensitive word 
        recognition to find the list of topics. If it cannot 
        find it, it will return 'all topics' so that the 
        following prompts using the topics parameter can still
        run correctly. This code might need to be made more robust
        since it will sometimes miss the topics due to difference in
        format of the line "Topics = topic1, topic2, topic3".'''

        lines = answer.splitlines()
        topics_line = None
        for line in reversed(lines):
            if line.strip().lower().startswith("topics ="):
                topics_line = line
                break
        if topics_line:
            # Extract the topics from the line
            topics_start_index = topics_line.find("=") + 1
            topics_string = topics_line[topics_start_index:].strip()
            # Split the topics into an array
            topics = [topic.strip() for topic in topics_string.split(",")]
            string_topics = ', '.join(topics)
            return string_topics
        else:
            return ['all topics']

    # Define your prompts
    prompt1 = "As a language model, can you analyze this text and identify the overall subjective tone of the article, \
        analyze the language used to assess potential biases, and extract underlying opinions through the author's \
        choice of words and framing? At the end, try to come up with a score of subjectivity of the article, \
        from 0 being perfectly factual and objective, and 10 being completely subjective and biased. Also, \
        come up with up to 5 topics that are the most central in this text, and write it like this: \
        Topics = topic1, topic2, topic3. Do not elaborate on the topics after listing them. \n"

    prompt2 = "As a language model, can you identify the subjectivity score from the following prompt \
        and specify it without a sentence (like: subjectivity score = 4/10). Also, summarize the analysis \
        contained within the prompt in one paragraph, focusing on the overall tone, strength of language and \
        overall subjectivity. Remove any redundancy from your answer. Do not specify the overall subjectivity \
        score again in the last line of your answer. "

    # Make API calls to generate completions
    response1 = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[{"role": "user", "content": prompt1 + text,}]
    )
    answer_prompt1 = response1.choices[0].message.content.strip()

    # print("Answer prompt1 is: ", answer_prompt1)
    topics = extract_topics(answer_prompt1)
    # print("topics are: ", topics)

    response2 = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[{"role": "user", "content": prompt2 + answer_prompt1,}]
    )
    answer_prompt2 = response2.choices[0].message.content.strip()

    # print("Answer prompt2 is: ", answer_prompt2)
    subjectivity_score = extract_subjectivity(answer_prompt2)
    # print("subjectivity_score is: ", subjectivity_score)

    return subjectivity_score, topics, answer_prompt2

# subjectivity_score, topics, text_analysis = bias_analysis_GPT(article)

# print("topics are: ", topics)
# print("subjectivity_score is: ", subjectivity_score)
# print("final_answer is: ", text_analysis)
