import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMembers = () => {
  const [memberFind, setMemberFind] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      let items = [];
      let result = await axios.get("http://localhost:8000/api/admin/teachers");
      console.log(result);
      result.data.data.map((i) => {
         items.push(i.name);
      });
        setMemberFind(items.sort())
    };

    fetchData();
  }, []);

  useEffect(() => {
    var s = searchValue;
    let arr = [];
    // Match a string LIKE '%abc%'
    var regexObj = new RegExp("^.*" + s + ".*$");
    memberFind && memberFind.map((item) => {
      if (regexObj.test(item)) {
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
