import React, { useState, useEffect } from "react";

const items = ["Omar furuk", "Sanjoy kumar", "Sangita Biswas", "Arefin"];
const members = items.sort();

const AddMembers = () => {
  const [memberFind, setMemberFind] = useState(items);
  console.log({ memberFind });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    var s = searchValue;
    let arr=[];
    // Match a string LIKE '%abc%'
    var regexObj = new RegExp("^.*" + s + ".*$");
    members.map((item) => {
      if(regexObj.test(item)){
          arr.push(item);
      } 
    });
    setMemberFind(arr);
  }, [searchValue]);

  return (
    <div className="container">
      <form>
        <input
          type="text"
          placeholder="Search..."
          name="search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <br />
        {memberFind.map((member) => {
          return (
            <div>
              <input type="checkbox" name={member} value={member} />
              <span>{member}</span>
            </div>
          );
        })}
        <button type="submit">Submit invitation</button>
      </form>
    </div>
  );
};

export default AddMembers;
