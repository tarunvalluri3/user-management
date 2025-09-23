# USER MANAGEMENT DASHBOARD 

## Tech Stack
- **React**: Used class components for better state management and lifecycle handling.  
- **JavaScript (ES6+)**: Core language for implementing functionality, API calls, and state logic.  
- **HTML / CSS**: For structure and styling of components.  
- **JSONPlaceholder API**: Used as a mock backend for CRUD operations.  
- **Responsive Design**: Ensures the UI works well on desktop, tablet, and mobile devices.



## Setup Instructions
1. Clone the repository:

   ```bash
   git clone https://github.com/tarunvalluri3/user-management.git
   ```
2. Navigate to the project folder:

   ```bash
   cd user-management
   ```
3. Install dependencies:

   ```bash
   npm install
   ```

## Run Instructions
1. Start the development server:

   ```bash
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to see the app running.


## FOLDER STRUCTURE      
src/
 ├─ components/
 │   ├─ Home/
 │   │   ├─ Home.js
 │   │   └─ Home.css
 │   ├─ UserCard/
 │   │   ├─ UserCard.js
 │   │   └─ UserCard.css
 │   ├─ AddUserForm/
 │   │   ├─ AddUserForm.js
 │   │   └─ AddUserForm.css
 │   └─ EditUserForm/
 │       ├─ EditUserForm.js
 │       └─ EditUserForm.css
 ├─ App.js
 └─ index.js

I structured the project into multiple components to ensure reusability, readability, and maintainability of the code. By separating concerns, each component handles its own responsibility, making the overall application clean, modular, and easy to scale. 


## Why Multiple Components?  
I structured the project into multiple components to ensure:  
- **Reusability** – Each component handles a specific responsibility, making it easy to reuse across the project.  
- **Readability & Maintainability** – Splitting the logic into smaller pieces keeps the code clean and easier to understand.  
- **Scalability** – New features can be added without cluttering a single file.  
- **Better State Management** – Used class components to maintain state more explicitly and manage lifecycle methods effectively. 


## Components Breakdown  
- **Home.js**  
  - Main container component that manages the overall user data.  
  - Handles API calls for fetching, adding, editing, and deleting users.  
  - Maintains state for users, pagination, and sorting.  

- **UserCard.js**  
  - Displays individual user details in a clean card layout.  
  - Provides edit and delete button options for each user.  
  - Reusable for any user object passed as props.  

- **AddUserForm.js**  
  - Separate component to handle adding new users.  
  - Uses form inputs to collect user details.  
  - Alerts the user upon successful submission.  

- **EditUserForm.js**  
  - Dedicated component for editing existing user details.  
  - Pre-fills data of the selected user for quick updates.  
  - Ensures clean separation of logic from AddUserForm for maintainability.  


## Functionality
**Total Users Count:**
- The app displays the total number of users at the top of the page. 
- This count automatically updates when users are added or deleted.  

- **Add User**  
  - When a new user is added, an API call (`POST`) is made to the backend (JSONPlaceholder API in this project).  
  - On success, the new user is also added to the local state so it immediately appears in the UI.  
  - An **alert** notifies the user that the addition was successful (or shows an error if it failed).  

- **Edit User**  
  - Editing triggers an API call (`PUT`) with the updated user details.  
  - Once successful, the state is updated so the edited user details are instantly reflected in the UI.  
  - An **alert** confirms the successful update (or shows an error if something goes wrong).  

- **Delete User**  
  - Deleting sends an API call (`DELETE`) to the backend.  
  - The deleted user is then removed from the local state, so the UI updates without needing a page refresh.  
  - An **alert** confirms successful deletion (or shows an error if it failed).  

- **Search, Pagination & Sorting**  
  - Users can be searched by name in real-time.  
  - The list is paginated with options (10, 25, 50, 100 per page).  
  - Sorting by name is supported for better organization. 


## API Calls & Error Handling
- **Asynchronous API Requests**  
  - All API calls (Add, Edit, Delete, Fetch Users) are implemented using `async/await` for better readability and control of asynchronous operations.

- **Error Handling**  
  - Every API request is wrapped in a `try/catch` block to handle errors gracefully.  
  - If an API call fails, an appropriate error message is displayed to the user via **alerts**, ensuring the app doesn’t crash.  

- **Immediate UI Updates**  
  - On successful API calls, the local state is updated immediately so the changes reflect in the UI without a page refresh.
 

### UI / Design
- Clean and minimalist interface with subtle colors, and readable fonts.  
- Fully responsive across desktop, tablet, and mobile devices.    
- Alerts for Add, Edit, and Delete actions provide clear user feedback.

## Reflections

### Challenges Faced
- Managing asynchronous API calls using `async/await` while keeping the UI state consistent.
- Handling complex state updates for adding, editing, and deleting users in class components.
- Implementing sorting, searching, and pagination while ensuring smooth user experience.
- Designing a clean, responsive UI that looks professional across desktop, tablet, and mobile devices.

### Improvements
- Enhance the UI design with better visual hierarchy and subtle animations.
- Add robust input validation for user forms to prevent invalid entries.
- Implement user authentication and role-based access for a more secure app.
- Refactor the app to use React Hooks for cleaner and more maintainable code.
- Introduce a more scalable architecture, possibly integrating Redux or Context API for state management.



