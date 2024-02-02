Sprint 1 Updates

Lucy Zimmerman: 

During the first sprint, my focus was on conducting extensive research using ChatGPT. I invested significant time in prompting GPT with various URLs and exploring questions such as "detect any biased language" and "what is some helpful context for an informed reader on this news outlet." However, I encountered a challenge where some URLs were resistant to AI scraping. To address this, I created a Python program capable of retrieving web pages, converting them into PDFs, and extracting vital information like the author's name and main text. This development significantly enhanced our data acquisition process. I also began setting up an initial prompt with the OpenAI API to integrate these downloaded PDFs into our workflow. This setup was only partially completed due to the pending acquisition of API keys. Meanwhile, our team convened to discuss the potential of using Claude for more effective analysis of the articles themselves.

Looking ahead to the next sprint, my primary goal is to define the specific information and prompts that will be used with Claude to elicit the desired responses. Additionally, I aim to integrate our various Python programs, creating a cohesive system that combines data retrieval, contextual analysis using OpenAI, and bias detection through Claude. Another key objective is to contribute to the development of the user interface for this program. I plan to focus on seamlessly integrating the front-end and back-end components to ensure a functional and user-friendly experience. This comprehensive approach will not only streamline our processes but also enhance the overall efficacy of our project.


Nicolas Friley:

During the first sprint, I tested extensively the capabilities of GPT4 to extract information from user-generated content websites such as Quora, media outlet websites such as Fox News and commercial websites doing product recommendations and rankings. The tests were aiming at extracting political or financial affiliations and possible biases and conflicts of interest, playing with efficient follow up prompts and identifying best ”combined” prompts to get the most information in the least amount of prompts. I identified several websites containing specific bias and affiliations information about most media outlets, and plan on leveraging them in cross-reference when prompting GPT4. The idea is to develop a solution that manages to generalize well no matter the source URL. In one case, GPT4 used information from a survey that was focusing only on that one website's audience. Letting GPT4 use this kind of information instead of specifying the location of possible relevant resources makes it particularly hard to generalize to other websites for which such survey may not have been conducted.

After testing Claude as well on several articles to get it to output the desired type of information, I suggested mitigating the limits of GPT4 from our research findings by keeping GPT4 for extracting information through analysis of the website’s URL, author’s name, company information, and fact-checking, but switching to using Claude for bias analysis from the actual text after realizing the limited capabilities of GPT4 in this regard. For the next sprint, I will focus on optimizing prompts and sequences of prompts on targeted content, to generate relevant information of different nature from both GPT4 and Claude. The key idea is to explore how generated content from one API can be integrated efficiently into prompts for another, in order to get the best of both worlds. I will also work on prompts to format the final output and prune out unwanted type of information.
