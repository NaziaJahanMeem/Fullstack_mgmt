The API integration is in pages/index.js file.
I have used Apollo Client to manage data. I have called The Add User and User View modules in index.js. Initially the add user form will not be visible. After clicking the button it will be visible to admin. The component/AddUser.js contains code for adding user.
In components/queries.js, i have written the query for getting the users. In components/mutations.js, the  opration for add,update and delete are done.
In the components/Users.js, i have made the table to show user and called pagintion.js and and UserRow.js,search.js. In UserRow.js, it is showing the results from GET_USERS query.
In UserRow.js delete user part is done and EditUser.js component is called.
