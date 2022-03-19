import React from "react";

const AddCommittee = () => {
  return (
    <div class="container">
      <form>
        <input type="text" id="committeeName" value="" placeholder="Committee Name" />
        <br />
        <select>
          <option value="">Select president</option>
          <option value="actual value 2">Ebrahim</option>
          <option value="actual value 3">Rakib</option>
        </select>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddCommittee;
