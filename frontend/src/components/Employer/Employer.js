import React, { useEffect,useState } from "react";
import './employer.css'
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../../constants/apiConstants";
import axios from "axios";

function Employer(props) {


  const [state , setState] = useState({
    Users:[],
    successMessage:null
})
const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
}

  useEffect(() => {
    console.log(localStorage.getItem(ACCESS_TOKEN_NAME));
    axios
      .get(API_BASE_URL + `/timesheet/list`, {
        headers: { "x-access-token": localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        console.log(response)
        if (response.status !== 200) {
        
          redirectToLogin();
        }

        state.Users.push(...response.data)
        console.log(state.Users)
        // setState(prevState => ({
        //   ...prevState,
        //   'successMessage' : 'data refreshed '
        // }))
      })
      .catch(function (error) {
        redirectToLogin();
      });
  });
  function redirectToLogin() {
    props.history.push("/login");
  }
  return (
    <div className="mt-4">
    
      All Employees
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">email</th>
            <th scope="col">Phone</th>
            <th scope="col">Working Hours</th>
          </tr>
        </thead>
        <tbody >
         
          {state.Users.map((data) => (
            <tr>
            <th key={data._id}>{data._id}</th>
              <td>{data.userId.username}</td>
              <td>{data.userId.email}</td>
              <td>{data.userId.phone}</td>
              <td>{data.workingHours}</td>
            </tr>
            
          ))}
           
        </tbody>
      </table>
    </div>
  );
}

export default withRouter(Employer);
