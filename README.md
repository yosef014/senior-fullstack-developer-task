I implemented the required features as follows:

User Role Management:

Replaced the single role field with a roles array (JSON column in SQLite).

Adjusted the backend logic and database schema using TypeORM migrations.

User Status Enhancement:

Replaced the boolean status field with an enum-like string field with values: Enabled, Disabled, Deleted.

Ensured the value is validated and used consistently across backend and frontend.

Authorization Check:

Added server-side check to return HTTP 401 Unauthorized if the user's status is Deleted.

Frontend (Vue 3 + Vuex + Vuetify):

All login logic is handled via Vuex actions.

The authenticated user is stored in Vuex and used across components.

Role-based route guards were implemented using router.beforeEach.

Displayed the username on all pages and implemented a Logout button to reset the state and return to the login page.

** Suggestions for improvements or architectural changes **

Authentication:

Currently, login is based on a username only. In a real-world application, this should be extended to support password-based authentication (with hashing and JWT for session/token handling).

Role & Status as enums:

SQLite does not support native enums. In production (e.g., PostgreSQL), it's recommended to use real ENUM types and enforce constraints at the DB level.

Modularization:

The frontend code can benefit from modular Vuex modules per domain (e.g., auth, user, etc.).

Similarly, the backend can be split into smaller feature modules for better separation of concerns and scalability.

Error handling:

A global error handler on the frontend (e.g., an Axios interceptor + Snackbar) would improve UX by centralizing error feedback.

Testing:

No unit tests were included in the assignment. Adding tests (both backend and frontend) would increase reliability and maintainability.