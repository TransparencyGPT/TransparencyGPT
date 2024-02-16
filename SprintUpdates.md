Sprint 2 Updates:

Lucy Zimmerman:

Initially, my focus was on integrating the backend Python scripts, which were primarily designed for processing and generating responses through LLm’s, with our web application's frontend. To achieve this integration, I turned to Flask, a lightweight and versatile web framework for Python. My role involved experimenting with Flask's capabilities to serve as the bridge between the complex logic encapsulated in the Python scripts and the user-facing side of our application. I began by setting up a basic Flask server, defining routes that could receive requests from the frontend. These routes were configured to trigger the execution of specific Python scripts, effectively allowing the frontend to utilize the LLM's capabilities indirectly. The challenge was to ensure that the data flow between the frontend, Flask server, and Python scripts was both efficient and secure. I implemented JSON as the data exchange format, enabling structured and easy-to-parse communication. To further enhance the connection between the frontend and the backend, I utilized Express.js. Express served as the backbone of our application's server-side logic, handling HTTP requests and routing them appropriately. For the client-side requests, I chose Axios. This setup allowed us to retrieve responses from the Python scripts in a non-blocking manner, ensuring that our application remained responsive to user interactions. The integration of Express and Axios required careful configuration, particularly in terms of setting up the correct endpoints, handling cross-origin resource sharing (CORS) issues, and managing asynchronous data flow. I dedicated time to testing and debugging this setup to guarantee smooth communication between the frontend, Express server, and Flask backend. Another critical aspect of my work involved optimizing the interaction with Claude and GPT models. My objective was to streamline the process of generating and handling prompts for these models, ensuring that we could dynamically generate responses based on user input. I implemented a system for token counting within each prompt, a crucial feature given the cost implications associated with the number of tokens processed by LLMs.  Lastly, I developed some of basic user interface (UI) for our application, including buttons, and the screen of the presentation of the subjectivity in an intuitive and engaging manner


A significant enhancement I aim to work on during sprint 2 is the automation of the article-to-app flow, leveraging the iPhone's share functionality. This will enable users to directly share links from their browser to our app, thereby initiating the article analysis process without the need for manual input. To achieve this, I'll be working with the iOS Share Extension.  To facilitate a smoother setup for demos and new users, I'll be developing a consolidated script that automates the installation of all necessary dependencies. Another exciting goal is the integration of the GPT prompt-pipeline directly within the app, focusing on evaluating the author, organization, and other contextual elements of the articles. This feature aims to provide users with deeper insights into the content, such as identifying biases, understanding the background of the author, and the credibility of the publishing organization. Implementing this requires fine-tuning our GPT prompts, using our token counter, and post-processing the prompts and also utilizing flask and express. I'll be exploring advanced NLP techniques and GPT's latest features to improve the quality of our analyses. Lastly, my efforts will be directed to UI improvements. The objective is to not only make the app more aesthetically pleasing but also to enhance usability and accessibility.





Alberto Mancarella:

My focus in these two weeks was to add more functionality to the app. Once Lucy built the bridge between the back-end and front-end server using the Flask server, I expanded upon this implementation. Instead of having a hardcoded text as an example, I expanded this by giving the system the ability to analyze any article that a user inputs. I added two ways that a user can search for an article. The first way is by pasting in a URL. To do so, the first way I solved is by adding a URL textbox, and a "Paste URL" button that inserts the URL that the user has copied into the URL textbox using the expo-clipboard library, and a "Analyze URL" button that analyzes the article specified by the URL inserted. The other way that a user can search for an article is by typing in the "Article Title" and "News Source". To implement this, I added "Article Title" and "News Source" text box that allows the user to input an article without having a URL. This is followed by a "Analyze Selected Source" that analyzes the article with the "Article Title" and "News Source" from the text-box. I added upon the JSON data exchange pipline from the front-end to the python script by indicicating if the user selected the "Analyze URL" or "Analyze Selected Source" button to efficiently to use the similar code later in the Python script. In addition, in this JSON data exchange pipline, I added all of the text-boxes information (such as "Article Title", "URL,", ect., so it can all be accessed in the back-end. In the back-end section of the code, I added the ability to fetch the actual article text so it can be inputted into the LLM pipline. In the scenerio where the user typed the "Analyze Selected Source" button, I utilized the NewsAPI API. I spent some time studying the NewsAPI and implemented it for this purpose. I utilized NewsAPI by essentially search for the most recent article given the specified parameters ("Article Title" and "News Source"). The actual content in the NewsAPI is heavily limited by the number of characters. So, I instead decided to get the URL instead. 
In the scenerio where the user typed in typed in the "Analyze URL" button, I didn't need to do any more processing since I already had the actual URL. I implemented a web-scraper using the BeautifulSoup library that takes in the URL as an input, and finally returns the scraped text, that gets inputted to the LLM.

For the next milestones, I feel like there are many improvements to be made. First of all, I plan on helping out with the ability to use the share feature, perhaps on top of all of the various input selections available currently. Since the variety of input choices has been already implementing, I plan on facilitating how the users actually input the text and navigate the app, experimenting with the app user-interface with multiple views, toggle switches, ect. I plan on playing around with various app interface to provide the user with the best experience and utilize the same functions that I already implemented. I expect to review material from CS 147L (a class that taught react native) to implement the best interface that is seemless and efficient for users.




Nicolas Friley:

During Sprint 2, my focus was on developing the backend Python scripts responsible for handling prompts to various Language Models (LLMs) and combining their responses into a well-structured analysis. I worked on three main files: claude_prompt.py and GPT_prompt.py, with a final integration in combined_prompt.py. In claude_prompt.py, I designed a function that takes the text of a target article as input. Using a series of chained prompts, this function generates a contextual bias analysis. The output includes a list of topics covered in the article, a subjectivity score ranging from 0 to 10, and the actual analysis. In GPT_prompt.py, I developed a function that leverages the list of topics, the URL and title of the article, and the author's name. By employing specific prompts, this function generates multiple independent and targeted bias analyses related to the author, media company, target audience, and more. I brought everything together with combined_prompt.py, which calls the functions from both claude_prompt.py and GPT_prompt.py and includes one final prompt to GPT to structure and format the final answer. For testing purposes, I implemented a simple text import function to read input data from a JSON file containing the author, URL, title, and text of the article. This allowed me to test the functions independently and ensure their individual functionality.

Looking ahead to Sprint 3, my plan is to upgrade the model used in GPT_prompt.py to utilize gpt-4. This will enhance the response generation capabilities, particularly for web-accessed information. I also intend to measure the response time of all three scripts separately and work on reducing the overall response time. Optimizing the prompts is another important task in Sprint 3. I aim to ensure that the final answer has the desired format and contains the required information, regardless of the media source. To achieve this, I will test the entire pipeline on articles from various sources and make the system robust to variations in content, access to information, publication dates, and other potential factors.



_________________________________________________________________________________________________________________________________________________________________________________________

Sprint 1 Updates

Lucy Zimmerman: 

During the first sprint, my focus was on conducting extensive research using ChatGPT. I invested significant time in prompting GPT with various URLs and exploring questions such as "detect any biased language" and "what is some helpful context for an informed reader on this news outlet." However, I encountered a challenge where some URLs were resistant to AI scraping. To address this, I created a Python program capable of retrieving web pages, converting them into PDFs, and extracting vital information like the author's name and main text. This development significantly enhanced our data acquisition process. I also began setting up an initial prompt with the OpenAI API to integrate these downloaded PDFs into our workflow. This setup was only partially completed due to the pending acquisition of API keys. Meanwhile, our team convened to discuss the potential of using Claude for more effective analysis of the articles themselves.

Looking ahead to the next sprint, my primary goal is to define the specific information and prompts that will be used with Claude to elicit the desired responses. Additionally, I aim to integrate our various Python programs, creating a cohesive system that combines data retrieval, contextual analysis using OpenAI, and bias detection through Claude. Another key objective is to contribute to the development of the user interface for this program. I plan to focus on seamlessly integrating the front-end and back-end components to ensure a functional and user-friendly experience. This comprehensive approach will not only streamline our processes but also enhance the overall efficacy of our project.

Rachel Liu:
The past two weeks, my main responsibility was conducting research into prompt engineering using ChatGPT– testing its capabilities with extracting main ideas, generating context (surrounding the context, author, organization, etc.), detecting charged language, and verifying sources. In particular, figuring out the most efficient way to chain prompts together and hone the specificity in our prompts to maximize the information that chatGPT is able to provide. In identifying its limitations, my team and I looked into other potential supplementary tools such as Claude and NewsAPI. More research into combining these sources must be done in order to figure out how we can utilize and merge all responses to generate the most nuanced and accurate response. 

In the next sprint, I will focus on developing the React App. I will research and create UI designs that best fit the features of TransparencyGPT and implement it in Typescript. Developing an effective user interface to match our backend developments will pull our project out of the ideation stage and provide a solid foundation from which we can build upwards. I will also explore with integrating WebSocket for real-time data exchange between the server and the front end and ensure the responsiveness of our application. By next sprint, we hope to have a fully functional application with preliminary backend functionality.

Nicolas Friley:

During the first sprint, I tested extensively the capabilities of GPT4 to extract information from user-generated content websites such as Quora, media outlet websites such as Fox News and commercial websites doing product recommendations and rankings. The tests were aiming at extracting political or financial affiliations and possible biases and conflicts of interest, playing with efficient follow up prompts and identifying best ”combined” prompts to get the most information in the least amount of prompts. I identified several websites containing specific bias and affiliations information about most media outlets, and plan on leveraging them in cross-reference when prompting GPT4. The idea is to develop a solution that manages to generalize well no matter the source URL. In one case, GPT4 used information from a survey that was focusing only on that one website's audience. Letting GPT4 use this kind of information instead of specifying the location of possible relevant resources makes it particularly hard to generalize to other websites for which such survey may not have been conducted.

After testing Claude as well on several articles to get it to output the desired type of information, I suggested mitigating the limits of GPT4 from our research findings by keeping GPT4 for extracting information through analysis of the website’s URL, author’s name, company information, and fact-checking, but switching to using Claude for bias analysis from the actual text after realizing the limited capabilities of GPT4 in this regard. For the next sprint, I will focus on optimizing prompts and sequences of prompts on targeted content, to generate relevant information of different nature from both GPT4 and Claude. The key idea is to explore how generated content from one API can be integrated efficiently into prompts for another, in order to get the best of both worlds. I will also work on prompts to format the final output and prune out unwanted type of information.


Alberto Mancarella:

In these past two weeks, I extensively conducted research on the Anthropic workbench (which uses the claude-2.1 model) from a variety of sources, also testing potential inputs and desired outputs. I played around with different input types, including asking about questions without context, asking questions with a website URL (in most cases it wasn't able to access websites, with the exception of wikipedia site and a few others), and asking questions with context simply as a text. Then, after this, I experimented with transfering this into code in a python script (using the Claude API). I also played around with prompt chaining (where I would ask the system a question, and then I would take the output of that into another prompt, asking to simplify the previous answer). In addition, I also researched potential ways to get up-to-date news. After some searching, I found NewsAPI. I decided to spend some time experimenting with NewsAPI, using a Python script. 

For the next sprint, I plan on helping to implement the pipeline where the main topics of the user input is recognized and fed into the NewsAPI, where the top articles regarding that subject are retrieved. Essentially, instead of providing the "context" when utilizing prompt chaining, I hope to automate the pipline where NewsAPI would get this context. In addition, I also plan on inplementing a basic mobile app using react native. I hope to implement some basic features, like text input, and then connect this to the pipline that the whole group is working on. 