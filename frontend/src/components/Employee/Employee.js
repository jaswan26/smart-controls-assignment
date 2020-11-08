import React, { useEffect } from "react";
import './employee.css'
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../../constants/apiConstants";
import axios from "axios";

function Employee(props) {
  
  useEffect(() => {
    console.log(localStorage.getItem(ACCESS_TOKEN_NAME));
    axios
      .get(API_BASE_URL + `/auth/check`, {
        headers: { "x-access-token": localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        if (response.status !== 200) {
          redirectToLogin();
        }
      })
      .catch(function (error) {
        redirectToLogin();
      });
  });
  function redirectToLogin() {
    props.history.push("/login");
  }

  function get15dayFromNow() {
    return new Date(new Date().valueOf() + 15 * 24 * 60 * 60 * 1000);
}

function get15dayFromNow() {
  return new Date(new Date().valueOf() + 15 * 24 * 60 * 60 * 1000);
}

// $('#clock-c').countdown(get15dayFromNow(), function(event) {
//   var $this = $(this).html(event.strftime(''
//     + '<span class="h1 font-weight-bold">%D</span> Day%!d'
//     + '<span class="h1 font-weight-bold">%H</span> Hr'
//     + '<span class="h1 font-weight-bold">%M</span> Min'
//     + '<span class="h1 font-weight-bold">%S</span> Sec'));
// });

// $('#btn-reset').click(function() {
//     $('#clock-c').countdown(get15dayFromNow());
// });
// $('#btn-pause').click(function() {
//     $('#clock-c').countdown('pause');
// });
// $('#btn-resume').click(function() {
//     $('#clock-c').countdown('resume');
// });
  return (
    <div className="mt-4">
    
      Employee Home 

                <div class="rounded bg-gradient-4 text-white shadow p-5 text-center mb-5">
                    <p class="mb-0 font-weight-bold text-uppercase">Let's use some call to actions</p>
                    <div id="clock-c" class="countdown py-4"></div>

                   
                    <ul class="list-inline">
                        <li class="list-inline-item pt-2">
                            <button id="btn-reset" type="button" class="btn btn-demo"><i class="glyphicon glyphicon-repeat"></i>Reset</button>
                        </li>
                        <li class="list-inline-item pt-2">
                            <button id="btn-pause" type="button" class="btn btn-demo"><i class="glyphicon glyphicon-repeat"></i>Pause</button>
                        </li>
                        <li class="list-inline-item pt-2">
                            <button id="btn-resume" type="button" class="btn btn-demo"><i class="glyphicon glyphicon-repeat"></i>Resume</button>
                        </li>
                    </ul>

                </div>

    </div>
  );
}

export default withRouter(Employee);
