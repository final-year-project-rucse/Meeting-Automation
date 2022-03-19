const Committee = () => {
  return (
    <div class="container">
      <header className="topbar">
        <div className="logo">
          <a href="#" className="mylogo text">
            Logo
          </a>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <a href="#" className="text">Committee</a>
            </li>
            <li>
              <a href="#" className="text">Create new committee</a>
            </li>
          </ul>
        </nav>
        <nav className="president">
          <ul>
            <li>
              <a href="" className="text">President profile</a>
            </li>
          </ul>
        </nav>
      </header>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Committee;
