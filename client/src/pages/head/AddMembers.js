import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddMembers = () => {
  const [memberFind, setMemberFind] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMembers, setMembers] = useState([]);
  const [existingMembersList, setExistingMembersList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  
  useEffect(async() => {
    const committeeName = params.committeeName;
    const url = `http://localhost:8000/api/${committeeName}/`;
    const back = `/${committeeName}`;
   await axios(url)
      .then( (res) => {
        //console.log("res", res);
        const { data } = res.data;
        let p = [];
        data.map((item, i) => {
          p.push(item);
        });
        setExistingMembersList(p);
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(params);
  }, [existingMembersList]);
  useEffect(() => {
    const fetchData = async () => {
      let items = [];
      let result = await axios.get("http://localhost:8000/api/admin/teachers");
     // console.log(result);
      result.data.data.map((i) => {
       let ch = true;
       //console.log("exist",existingMembersList);
        for(let j =0;j<existingMembersList.length;j++){
          //console.log("ok");
          if(existingMembersList[j].email == i.email){
              ch = false;
              break;
          }
        }
        //console.log("ch",ch);
        if(ch){
          items.push(i);
        }
      });

      setAllMembers(items.sort());
      setMemberFind(items.sort());
    };

    fetchData();
  }, [existingMembersList,selectedMembers]);
  //console.log("ee",existingMembersList);
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
        //navigate(back);
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(params);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Current members</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {existingMembersList.map((item, index) => (
                <tr key={item.objectID}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col">
          <label>All members</label>
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
              Add members
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
