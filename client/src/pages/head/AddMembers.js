import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddMembers = () => {
  const [memberFind, setMemberFind] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMembers, setMembers] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let items = [];
      let result = await axios.get("http://localhost:8000/api/admin/teachers");
      console.log(result);
      result.data.data.map((i) => {
        items.push(i);
      });

      setAllMembers(items.sort());
      setMemberFind(items.sort());
    };

    fetchData();
  }, []);

  useEffect(() => {
    var s = searchValue;
    let arr = [];
    // Match a string LIKE '%abc%'
    var regexObj = new RegExp("^.*" + s + ".*$");
    allMembers.map((item) => {
      if (regexObj.test(item.name)) {
        arr.push(item);
      }
    });
    setMemberFind(arr);
  }, [searchValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const committeeName = params.committeeName;
    const url = `http://localhost:8000/api/${committeeName}/addMembers`;
    const back = `/${committeeName}`;
    console.log(selectedMembers);
    await axios
      .post(url, { members: selectedMembers })
      .then((res) => {
        navigate(back);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(params);
  };
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
        {memberFind.map((member, key) => {
          return (
            <div key={key}>
              <input
                type="checkbox"
                name={member}
                value={member}
                onChange={(e) => {
                  const data = {
                    name: member.name,
                    email: member.email,
                  };
                  var arr = selectedMembers.concat(data);
                  setMembers(arr);
                }}
              />
              <span>{member.name}</span>
            </div>
          );
        })}
        <button type="submit" onClick={handleSubmit}>
          Submit invitation
        </button>
      </form>
    </div>
  );
};

export default AddMembers;
