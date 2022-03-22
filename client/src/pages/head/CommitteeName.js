import React from "react";
import TableRow from "./TableRow";

const committeeMembers = ["Rakib", "Ebrahim", "Bepul"];

const CommitteeName = () => {
  console.log("committeeName:")
  return (
    <div className="container">
      <ul className="head_committee">
        <li>
          <a href="#">Create Meeting</a>
        </li>
        <li>
          <a href="#"> Add member</a>
        </li>
      </ul>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Members</th>
          </tr>
        </thead>
        <tbody>
          {committeeMembers.map((item, index) => (
            <TableRow key={index} item={item} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitteeName;
