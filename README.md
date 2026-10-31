# Jackson University — AI Student Support Agent

**Empowering students with intelligent, secure, and AI-driven campus support.**

An AI-powered Student Support Agent designed for Jackson University to help students access information and support for common university-related queries, including fees, scholarships, academic information, and support requests.

This project demonstrates core **Agentic AI Engineering** concepts, including agent loops, tool calling, decision-making, secure data handling, and human-in-the-loop workflows.

---

## Student Information

| Field | Details |
|---|---|
| **Name** | Adarsh Yede |
| **Enrollment Number** | 20251003 |
| **Project Title** | AI Student Support Agent |
| **University** | Jackson University |
| **Course** | PGDM — Big Data Analytics |
| **Batch** | 2025–2027 |

---

## Project Overview

The Jackson University AI Student Support Agent is designed to provide students with a centralized and intelligent support system.

Instead of relying entirely on manual support, students can interact with an AI-powered agent to ask questions, retrieve relevant information, and initiate support requests.

The agent determines when a tool is required, uses the available tool to retrieve information, and incorporates the result into its response.

The project also focuses on making AI-assisted student support more secure, privacy-conscious, and suitable for real-world application scenarios.

## Key Features

- **AI-Powered Student Assistance:** Responds to common student queries through a conversational interface.
- **Student Record Lookup:** Retrieves relevant student information using available tools.
- **Fee Status Assistance:** Supports queries related to student fee information.
- **Scholarship Assistance:** Helps students access scholarship-related information.
- **Support Ticket Management:** Supports the creation and tracking of student support requests, depending on the configured backend functionality.
- **Agentic Workflow:** Demonstrates a working agent loop that can determine when a tool is needed and use its result before answering.
- **Secure Data Handling:** Incorporates security and privacy considerations into student information workflows.
- **Audit Logging:** Supports tracking relevant actions for accountability, where configured.
- **Human-in-the-Loop Design:** Allows sensitive or important actions to be handled with appropriate human oversight, where implemented.
- **University-Themed Interface:** Uses a Jackson University-branded interface to provide a consistent student-facing experience.

> **Note:** Feature availability depends on the tools, backend endpoints, and security controls implemented in the current version of the application.

---

## Technology Stack

The project may use the following technologies, depending on the final application configuration:

| Technology | Purpose |
|---|---|
| Python | Core application logic |
| FastAPI | Backend API framework |
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive interface |
| JavaScript | Frontend interactions and chatbot functionality |
| PostgreSQL | Relational database |
| Large Language Model (LLM) | Natural-language understanding and response generation |
| Tool Calling | Connecting the agent to application functions |
| Uvicorn | ASGI server for running the FastAPI application |
| Environment Variables | Configuration and secret management |

---

## How the Agent Works

The application follows an agentic workflow:

1. **User Query:** A student submits a question through the chat interface.
2. **Intent Understanding:** The agent interprets the student's request.
3. **Decision-Making:** The agent determines whether it can respond directly or needs to call a tool.
4. **Tool Execution:** The appropriate tool retrieves information or performs an authorized operation.
5. **Result Evaluation:** The agent uses the tool's result to formulate an informed response.
6. **Student Response:** The agent presents the response through the chat interface.
7. **Security and Oversight:** Relevant access controls, validation, logging, and human approval mechanisms are applied where configured.

### Example Workflow

```text
Student
   |
   v
Chat Interface
   |
   v
AI Student Support Agent
   |
   v
Determine Whether a Tool Is Required
   |
   +--------------------+
   |                    |
   v                    v
Respond Directly     Call Appropriate Tool
                        |
                        v
                 Retrieve or Process Data
                        |
                        v
                  Evaluate Tool Result
                        |
                        v
                  Generate Response
                        |
                        v
                      Student
```

---

## Project Structure

The exact structure may vary depending on your implementation.

```text
jackson-university-student-support-agent/
│
├── app/
│   └── main.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── tests/
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

**Important:** Update this structure to match your actual repository before submitting the project.

---

## Installation and Setup

Follow these steps to run the application locally.

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd jackson-university-student-support-agent
```

### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks script execution, you can temporarily allow activation for the current terminal session:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

### 3. Install Dependencies

If your repository includes a `requirements.txt` file:

```bash
python -m pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and add the configuration required by your application.

For example:

```env
DATABASE_URL=your_database_connection_string
LLM_API_KEY=your_llm_api_key
```

Replace the placeholders with your actual configuration values and use the variable names expected by your application.

**Security:** Never commit your `.env` file, API keys, database passwords, or other secrets to GitHub.

### 5. Run the Application

If your FastAPI application is located at `app/main.py`, run:

```bash
python -m uvicorn app.main:app --reload
```

Open the local address displayed in your terminal to access the application.

For a typical FastAPI setup, the API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

The actual address and documentation availability depend on your application configuration.

---

## Security and Privacy Considerations

Because the application handles student-related information, security and privacy are important design considerations.

- Validate and sanitize user inputs.
- Authenticate users before providing access to protected student records.
- Apply authorization checks to sensitive operations.
- Store credentials and API keys in environment variables.
- Avoid exposing passwords, sensitive student information, or internal system details in AI responses.
- Use parameterized database queries where applicable.
- Maintain audit logs for relevant security-sensitive actions.
- Require human approval for operations that need additional authorization.
- Handle errors without exposing internal stack traces or secrets.
- Use synthetic or anonymized data when demonstrating the application publicly.

These are recommended practices; the README does not itself establish that every control has been implemented or tested.

---

## Learning Outcomes

This project provides practical experience with:

- Building an AI agent with a tool-using workflow.
- Understanding when an agent should call a tool.
- Using tool outputs to produce contextually relevant responses.
- Connecting an AI application to backend services and a database.
- Designing conversational interfaces for student support.
- Applying security and privacy principles to AI systems.
- Exploring human oversight in agentic workflows.
- Developing and documenting an end-to-end AI application.

---

## Future Enhancements

Potential improvements include:

- Integration with a university student information system.
- More comprehensive fee and scholarship workflows.
- Improved retrieval from verified university documents.
- Role-based access control for students and administrators.
- A dedicated administrative dashboard.
- Multilingual student assistance.
- Automated evaluation of agent responses.
- Enhanced monitoring, testing, and deployment workflows.

These are potential future enhancements and are not necessarily available in the current implementation.

---

## Project Purpose

The objective of this project is to demonstrate how agentic AI can support common student-service workflows through intelligent decision-making, tool integration, and responsible system design.

The application is developed as an academic project focused on practical implementation of Agentic AI Engineering concepts.

---

## Author

**Adarsh Yede**  
Enrollment Number: `20251003`  
PGDM — Big Data Analytics  
Batch: 2025–2027

---

## Acknowledgements

Developed as part of the Agentic AI Engineering academic project, with a focus on applying agentic AI concepts to a practical student-support use case.

---

**Jackson University — Intelligent Support for Every Student.**
