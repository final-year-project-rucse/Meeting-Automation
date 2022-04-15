import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DeleteMember from "./DeleteMember";

const AddMembers = () => {
  const [memberFind, setMemberFind] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMembers, setMembers] = useState([]);
  const [existingMembersList, setExistingMembersList] = useState([]);
  const [meetingName, setMeetingName] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  // const navigate = useNavigate();
  
  useEffect(() => {
    const committeeName = params.committeeName;
    const meetingNamePass = params.meetingName;
    setMeetingName(meetingNamePass);
    const url = `http://localhost:8000/api/${meetingNamePass}/`;
    const back = `/${committeeName}`;
    axios(url)
      .then((res) => {
       // console.log("res", res);
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
        for (let j = 0; j < existingMembersList.length; j++) {
          if (existingMembersList[j].email === i.email) {
            ch = false;
            break;
          }
        }
        if (ch) {
          items.push(i);
        }
      });

      setAllMembers(items.sort());
      setMemberFind(items.sort());
    };

    fetchData();
  }, [existingMembersList]);

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
    setLoading(true);
    event.preventDefault();
    const committeeName = params.meetingName;
    const url = `http://localhost:8000/api/${committeeName}/addMembers`;
    const back = `/${committeeName}`;
    await axios
      .post(url, { members: selectedMembers })
      .then((res) => {
        setLoading(false);
        //navigate(back);
      })
      .catch((err) => {
        setLoading(false);
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
                <th className="ps-3" scope="col">
                  No
                </th>
                <th scope="col">Member Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {existingMembersList.map((item, index) => (
                <tr key={item._id}>
                  <td className="ps-3">{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <DeleteMember id={item._id} meetingName={meetingName}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-auto">
          <p className="h4">All members</p>
          <form>
            <input
              className="form-control"
              type="text"
              placeholder="Search Member"
              name="search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <br />
            {memberFind.map((member, key) => (
              <div className="form-check mb-2" key={key}>
                <input
                  className="form-check-input"
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
                <label className="form-check-label">{member.name}</label>
              </div>
            ))}
            <button
              className="btn btn-primary  mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              {loading && (
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              Add Members
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
