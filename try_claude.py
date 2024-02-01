from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT

anthropic = Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key="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",
)
# completion = anthropic.completions.create(
#     model="claude-2.1",
#     max_tokens_to_sample=300,
#     prompt=f"{HUMAN_PROMPT} Who is the top chess player{AI_PROMPT}",
# )


# completion2 = anthropic.completions.create(
#     model="claude-2.1",
#     max_tokens_to_sample=300,
#     prompt=f"{HUMAN_PROMPT} You earlier included this passage: {completion.completion} Rephrase this into one sentence or less. No bulletpoints{AI_PROMPT}",
# )

# # isnt able to access website
# completion3 = anthropic.completions.create(
#     model="claude-2",
#     max_tokens_to_sample=300,
#     prompt=f"{HUMAN_PROMPT}  Tell me about Sinner from https://www.atptour.com/en/players/jannik-sinner/s0ag/overview {AI_PROMPT}",
# )



article = "Sinner grew up in northern Italy in the predominantly German-speaking region of South Tyrol. He was active in skiing, football, and tennis as a child.[5] After winning a national championship in skiing at age eight, Sinner switched his focus to tennis at age 13 and moved to Bordighera on the Italian Riviera to train with veteran coach Riccardo Piatti. Despite limited success as a junior, Sinner began playing in professional events at age 16 and became one of the few players to win multiple ATP Challenger Tour titles at age 17. He won the ATP Newcomer of the Year award in 2019 after breaking into the top 100 and winning the Next Generation ATP Finals in Milan."
task_1 = anthropic.completions.create(
    model="claude-2",
    max_tokens_to_sample=300,
    prompt=f"{HUMAN_PROMPT} Here is an article '{article}'. 
    According to that article, did Sinner ski?{AI_PROMPT}",
)

task_2 = anthropic.completions.create(
    model="claude-2",
    max_tokens_to_sample=300,
    prompt=f"{HUMAN_PROMPT} Previous response is {task_1.completion}. 
    Output 'not enough info' if you aren't sure! Summarize answer in just one line if you can. 
    Just say the answer, no context {AI_PROMPT}",
)

print(task_1)
print("")
print(task_2)
