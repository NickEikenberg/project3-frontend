const NewUserForm = () => {
  return (
    <div class="newUserFormContainer">
      <h1 class="newUserFormTitle">Create an Account</h1>
      <form>
        <h2>Username</h2>
        <input type="text" placeholder="username" />
        <h2>Password</h2>
        <input type="password" placeholder="password" />
      </form>
    </div>
  );
};

export default NewUserForm;
