## react-todo
Code the Dream - React class Flamingo

[Todo List](https://ctd-react-todo.onrender.com/)

A simple React application for creating a to-do list and managing tasks, along with a calendar for tracking tasks by dates.

### Installation

1. Clone the repository to your local machine.
2. Ensure that you have Node.js installed.
3. Run **`npm install`** in the root directory of the project.
4. Create a **.env.local** file in the root directory.
5. Add the following environment variables to the **.env.local** file:
```bash
REACT_APP_AIRTABLE_API_TOKEN="your_airtable_api_token"
REACT_APP_AIRTABLE_BASE_ID="your_airtable_base_id"
REACT_APP_TABLE_NAME="your_table_name"
```
6. To start the application, run **`npm start`**.

### Dependencies

- **React**
- **React Router**
- **Airtable**
- **prop-types**
- **GSAP**
- **React Transition Group**

### Testing

To run tests, use the command **`npm test`**. Jest provides tools for creating and running tests, which helps to detect errors and improve code quality.

### Airtable Integration

The application integrates with Airtable, a cloud-based database, to store and manage task data. It utilizes the following methods for interaction:

- **GET**: Retrieves data from Airtable to display lists (or tasks) and their details.
- **POST**: Adds new list (or task) to the Airtable database.
- **PATCH**: Updates existing lists (or tasks) in the Airtable database. Also is used for imitating deleting list (at current time Airtable doesn't provide DELETE method for tables)
- **DELETE**: Removes tasks from the Airtable database.

### Usage
- **Add List**: Click "+" button and enter the list name in the input field.
- **Rename List**: Click "Rename" button (pencil icon) next to the list and enter the new list name in the input field.
- **Remove List**: Click "Delete" button (trash icon) next to the list.
- **Sort List**: Click "Sort" button (two way arrows icon) in the top right corner and choose one of the options - "A to Z", "Z to A".
- **Open list tasks**: Click the list once.

- **Add Task**: Enter the task name in the input field and click the "Ok" button.
- **Edit Task**: Click "Rename" button (pencil icon) next to the task and enter the new task name in the input field.
- **Remove Task**: Click "Delete" button (cross icon) next to the task.
- **Complete Task**: Click the task once. To cancel completion - click the task once again.
- **Sort List**: Click "Sort" button (two way arrows icon) in the top right corner and choose one of the options - "Newest", "Oldest", "Recently Edited", "A to Z", "Z to A".

# react-todo
Code the Dream - React class Flamingo