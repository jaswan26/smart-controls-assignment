import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME,IS_EMPLOYER} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        username : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "username":state.username,
            "password":state.password,
        }
        axios.post(API_BASE_URL+'/auth/login', payload)
            .then(function (response) {
                // console.log(API_BASE_URL+'/auth/login',payload,response)
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                   axios.get(API_BASE_URL+'/auth/check', {headers:{'x-access-token':response.data.token}})
                   .then((res)=>{
                   if(res.status ===200){
                    localStorage.setItem(IS_EMPLOYER,res.data.info.isEmployer);
                    console.log("inside",res.data.info.isEmployer)
                   }
                   res.data.info.isEmployer?redirectToEmployer():redirectToEmployee();
                   props.showError(null)
                    
                   })
                  
                }
                else if(response.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToEmployer = () => {
        props.updateTitle('Employer')
        props.history.push('/employer');
       
    }
    const redirectToEmployee = () => {
        props.updateTitle('Employee')
        props.history.push('/employee');
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="username" 
                       className="form-control" 
                       id="username" 
                       aria-describedby="usernameHelp" 
                       placeholder="Enter username" 
                       value={state.username}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
    )
}

export default withRouter(LoginForm);