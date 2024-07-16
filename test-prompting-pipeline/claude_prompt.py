from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT
import json
import re
from text_import import import_json_data

# Updated 02/13/24 - 3:55PM

'''These two lines of code are only for debugging purposes,
to try the claude prompt on different texts, and ensure
it returns the desired output.'''

# Import data from external file
# file_path = 'text1.json'
# title, author, url, article = import_json_data(file_path)


def bias_analysis(text):
    '''This function makes chained prompts to Claude to extract
    the bias analysis from the text. It returns the bias
    analyses, a list of topics and a subjectivity score.'''

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
        
    # Prompts
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

    # API key parameter
    anthropic = Anthropic(
    api_key="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",
    )

    # Model definition and hyperparameters
    model="claude-2.1"
    temperature=0.2

    # Prompt 1
    completion = anthropic.completions.create(
    model=model,
    max_tokens_to_sample=1000,
    temperature=temperature, 
    prompt=f"{HUMAN_PROMPT}{prompt1}{text}\n\n{AI_PROMPT}",
    )
    answer_prompt1 = completion.completion
    
    '''The following print statements are there for debugging
    purposes and are commented out when not debugging'''

    # print("Answer prompt1 is: ", answer_prompt1)
    topics = extract_topics(answer_prompt1)
    # print("topics are: ", topics)

    # Prompt 2
    completion = anthropic.completions.create(
    model=model,
    max_tokens_to_sample=1000,
    temperature=temperature,
    prompt=f"{HUMAN_PROMPT}{prompt2}{answer_prompt1}\n\n{AI_PROMPT}",
    )
    answer_prompt2 = completion.completion

    # print("Answer prompt2 is: ", answer_prompt2)
    subjectivity_score = extract_subjectivity(answer_prompt2)
    # print("subjectivity_score is: ", subjectivity_score)

    return subjectivity_score, topics, answer_prompt2
    # print(completion.completion)

# These lines are there for testing purposes. You can run this python file
# independently to see the output from a particular article.
# subjectivity_score, topics, text_analysis = bias_analysis(article)

# print("topics are: ", topics)
# print("subjectivity_score is: ", subjectivity_score)
# print("final_answer is: ", text_analysis)