
const Home = () => {
  return (
    <div className="home_container">
      <div className="card text-center ">
        <div className="card-header">
          <h3>Meeting Automation</h3>
        </div>
        <div className="card-body">
          <a href="/admin" className="btn btn-primary">Sign in as admin</a>
          <p>or</p>
          <a href="/head/login" className="btn btn-primary"> Sign in as head</a>
          <p>or</p>
          <a href="/member/login" className="btn btn-primary"> Sign in as member</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
