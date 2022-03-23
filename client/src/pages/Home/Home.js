const Home = () => {
  return (
    <div>
      <div class="btn-group" role="group" aria-label="Basic example">
        <h1>Meeting Automation</h1>
      </div>
      <br />
      <div className="container">
        <a href="/admin"> Sign in as admin</a>
        <p>or</p>
        <a href="/head/login"> Sign in as head</a>
        <p>or</p>
        <a href="/member/login"> Sign in as member</a>
      </div>
    </div>
  );
};

export default Home;
