import React from 'react'
import { useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import MeetingCard from '../../components/meetingCard/MeetingCard'

function Test(props) {
    const params = useParams()
    const {allMeetings} = useSelector(state => state.head)
    
  return (
    <div style={{ width: "100%", margin: " 2rem auto" }}>
      <div className="container">
      <div className="row  g-2"> 
      {allMeetings.map(el => <MeetingCard title={el.title} link={`/${params.meetingName}/meetings/${el._id}`} />)}
        </div>
      </div>
      
      
        {/* <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Serial No.</th>
              <th scope="col">Meeting Names</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allMeetings.map((el, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{el.title}</td>
                <td>
                  <Link to={`/${params.meetingName}/meetings/${el._id}`}>
                    View
                  </Link>
                </td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        {/* {loading && <p className="text-center">loading.........</p>} */}
      </div>
  )
}

export default Test