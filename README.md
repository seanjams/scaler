# Scalar

Scalar is a web application built in Javascript/React where guitarists

## Features

- Authentication on both ends
- Ask/Search for questions in plain text or code
- Answer questions with plain text or code
- Code snippet form complete with syntax highlighting
- Vote up or down on questions and answers of other users
- Organize questions into most recent or trending categories

## Programming Languages
- JavaScript (es6)
- Ruby

### Technologies
- Ruby on Rails (version 5.0.4)
- React.js
- Redux
- PostgreSQL
- React Highlight (highlight.js)
- jQuery
- jBuilder
- SASS

### Authentication

Users are prompted with a form containing fields for Username, Email, and Password. If a user has visited before, they can log in with either their username or email in the same field. The password must be at least 8 characters, and is stored in the database as a salted/hashed digest using BCrypt. Salting prevents the database from containing the same random string as a digest, despite users potentially having the same passwords.

![login](/app/assets/images/login.png)


### Ask a Question

Ask a question, see if others can help!

![question](/app/assets/images/new_question.png)

### Search for a Question

Search the database for keywords or code.

![search](/app/assets/images/search.png)

### Answer Questions

Answer a question to help someone else in the community.

![answer](/app/assets/images/new_answer.png)

### Vote on Questions/Answers

Vote on the questions and answers you find helpful.

![votes](/app/assets/images/votes.png)

## In the making...

#### Languages

I am working on including syntax highlighting for all common languages.

#### User Questions/Page

I plan to have a page every user can call their own, a page that hosts details about their bio, a user picture, and the questions and answers they have written or voted on.

#### Infinite Scroll

I would like to add this capability to both the questions index and detail pages.
