# CPR Chatbot
This repo contains the CPR chatbot and its analytics website.  

## How does it work
The project comes with a `docker-compose.yml` file that starts 3 containers:
- The chatbot (rasa)
- The analytics website
- A database to store the analytics

The chatbot is accessible through the analytics' API on the `host:5005/api/ask_chatbot` route.  
This route takes the following parameters:
- sender: the sender's name, can be everything.
- message: the user's question.
- conv_position: the message's position in the conversation.
- analytics: a boolean enabling or not the analytics for this message.


## The analytics
The analytics are made of all the questions the users asked and are completely anonymised.  
They are accessible on the main page of the website `host:5005/` and display the chatbot's usage.  


## Development
**Disclaimer:** you python version needs to be one of the followings to develop the chatbot: `3.8`, `3.9`, `3.10`, `3.11`, `3.12`, or `3.13`.  

Use the `docker-compose.dev.yml` instead of the regular docker compose when developing.  
It opens the database to develop the analytics website locally and start an `adminer` instance to easily check the database.  

Example commands:  
`docker compose -f docker-compose.dev.yml up -d`
`docker compose -f docker-compose.dev.yml down`

### Environment preparation
**Global environment:**  
- Clone the repository: `git clone https://github.com/curatimeXai/cpr-chatbot.git`.  
- Create the `.env` files in the `docker` subfolders based on the examples.  

**Analytics environment:**
Create a `.env.dev` file based on `.env.dev.example`.    
This file's variables values must be the same as the ones in the `docker/postgres/.env` file. 

**Python environment (only for chatbot development):**  
- Create a virtual environment: `python -m venv venv`
- Enable the virtual environment:
  - linux/macos: `source venv/bin/activate`
  - windows: `venv/scripts/Activate`
- Install the requirements: `pip install -r requirements.txt`


### Chatbot development
Before starting developing the chatbot, please read the [official Rasa documentation](https://rasa.com/docs/rasa/).  


### Analytics website development
The website is made with Nuxt, a VueJS framework that adds facilities to VueJS development.  
The UI is made using [`preline`](https://preline.co/), an HTML UI kit that brings pre-made JS utilities for some components.  
You can find the code in the `analytics/` folder.  

Presentation of the code:
- `assets/` contains the custom CSS class used with TailwindCSS.
- `components/` contains the re-usable components of the website to avoid code repetition.
- `layouts/` contains the default layout of the website and the custom ones if some are made.
- `pages/` contains the different pages of the website with an automatic router.
- `plugins/` contains some code that is executed by Nuxt. In our case, it enables the `preline` package in all the website.
- `public/` contains the images of the website and other public assets.
- `server/` contains the API that will query the chatbot. The `api/ask_chatbot` route is only available with the method `POST`.
- `utils/` contains some reusable code such as the database functions.

You can run the `docker-compose.dev.yml` file to start the database and then run `npm run dev` to start the website in development mode with hot reload.    

### The database
The database is a PostgreSQL instance in a docker container. It's structure can be found in the `docker/postgres/init_db.sql` file.  
This database is not available from the public and is only available from the other containers.

#### Development
The database is accessible on the `5055` port while using the development docker compose.  
This port was choosen to avoid potential conflicts with existing PostgreSQL instances already running on the development machine.  

If necessary, you can re-initialise the database by removing its volume with the `-v` option when stopping the containers.  
Example:  
`docker compose -f docker-compose.dev.yml down -v`


#### The tables
The database contains two tables:
- bot_answers
- user_questions

**bot_answers:**  
The table will be filled progressively with the bot's answer without duplicates. This allows the analytics to keep track of 
all the chatbot's answers even after updating them, removing them, etc.  
Removing the old questions would cause some problems as some users' questions wouldn't be linked to an answer anymore.  

**user_questions:**  
The table contains the users' questions asked to the chatbot. Each question is linked to an answer, and is also saved with its position in the conversation.  
Saving the position can be used to check the flow of the user's conversations with the chatbot.  

#### How to manually access the database
You can manually access the database with two different ways:
- by using `adminer` on `localhost:8080` when using the development docker compose.
- by using the following commands on both development and production: 
  - Access the database container's terminal with: `docker exec -it CONTAINER_ID sh`.
  - Access the database with: `psql -U cpr_chatbot` (or the username you used in your `docker/postgres/.env`).


## Deployment
Start by cloning the repository on the production machine: `git clone https://github.com/curatimeXai/cpr-chatbot.git`

**Prepare the chatbot:**  
- Train the chatbot with the current training data: `rasa train`
  - It is preferable to train the chatbot on the development machine to avoid running a resource hungry command.
  - The new trained model will be added to the repo in the `models/` folder and will be automatically selected by the chatbot when running.
  - You can delete the old models.

**Deploy the project:**  
- Start the containers with: `docker compose up -d`
- If not already done, add a reverse proxy to `localhost:5005` which is the analytics website.
- Both the analytics website and the chatbot are now available on:
  - analytics: `your-domain.com/`
  - chatbot: `your-domain.com/api/ask_chatbot`https://cpr-chatbot.nightingale.uni-mainz.de

You can see the current deployed version on: `https://cpr-chatbot.nightingale.uni-mainz.de/`