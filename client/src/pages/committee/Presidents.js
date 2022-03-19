// import axios from "axios";
// import React, { useState } from "react";

// const AddCommittee = () => {
//   const [title, setTitle] = useState("");
//   const [presidentName, setPresidentName] = useState("president");
  
//   const options = [{ value: "teacher1" }, { value: "teacher2" }];
//   const handleSubmit = () => {
//     const data = {
//       title: {title},
//       presidentName: {presidentName},
//     };

//     console.log({presidentName});
//     console.log("===============================");
//     console.log(data);
    
//     axios
//       .post("http://localhost:8000/api/addcommittee",data)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className="container">
//       {/* <form onSubmit={handleSubmit}> */}
//       <input
//         type="text"
//         id="title"
//         value={title}
//         onChange={(e) => {
//           setTitle(e.target.value);
//         }}
//         placeholder="title"
//       />
//       <br />
//       <label>Select President</label>
//       <select
//         value={presidentName}
//         onChange={(e) => setPresidentName(e.target.value)}
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.value}
//           </option>
//         ))}
//       </select>
//       <br />
//       <button type="submit" value="Submit" onClick={handleSubmit}>
//         Add
//       </button>
//       {/* </form> */}
//     </div>
//   );
// };

// export default AddCommittee;
