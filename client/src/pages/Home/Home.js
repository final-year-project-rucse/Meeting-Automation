
const Home = () => {
  return (
    <div className="home_container">
      <div class="card text-center ">
        <div class="card-header">
          <h3>Meeting Automation</h3>
        </div>
        <div class="card-body">
          <a href="/admin" class="btn btn-primary">Sign in as admin</a>
          <p>or</p>
          <a href="/head/login" class="btn btn-primary"> Sign in as head</a>
          <p>or</p>
          <a href="/member/login" class="btn btn-primary"> Sign in as member</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
