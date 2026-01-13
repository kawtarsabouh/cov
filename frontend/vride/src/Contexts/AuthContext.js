//General imports
import React,  { Component, createContext } from 'react';
import axios from 'axios';

//Constant imports. 
import { CHECK_SIGNED_IN_URL, LOGIN_URL, SIGNOUT_URL, SIGNUP_URL } from '../Res/constants';

export const AuthContext = createContext();

export default class AuthContextProvider extends Component {

    state = {
        isLoggedIn: false,
        employeeID : 'NONE',
        firstname: 'NONE',
        errorMessage: 'NaN'
    }

    setErrorMessage = (msg) =>
    {
        this.setState({...this.state, errorMessage: msg})
    }

    componentDidMount()
    {
        var emp = localStorage.getItem('empid');
        var fn = localStorage.getItem('firstname');
        if(emp && emp !== "NONE" && emp !== "null")
        {
            //console.log("Request sent");
            axios.post(CHECK_SIGNED_IN_URL, {
                empid: emp,
                firstname: fn
            }).then(isLoggedIn => {
                
                if(isLoggedIn)
                {
                    this.setState({
                        isLoggedIn: true,
                        employeeID: localStorage.getItem('empid'),
                        firstname: localStorage.getItem('firstname'),
                        errorMessage: 'NaN'
                    })
                }
                else
                {
                    console.log("No session found");
                    this.setState(
                        {
                            isLoggedIn: false
                        }
                    )
                }
            })
        }
    }

    login = (details) =>
    {
        const baseURL = LOGIN_URL;
        const idParam = details.empId;
        const passwordParam = details.password;
        const keepMeSignedIn = details.keepMeSignedIn;
        axios.post(baseURL, {
            id: idParam,
            password: passwordParam
          })
          .then(res => {
            if(res.data.status === "SUCCESS")
            {
                this.setState({
                    isLoggedIn: true,
                    employeeID: res.data.empid,
                    firstname: res.data.firstname,
                    errorMessage: "NONE"
                });
                if(keepMeSignedIn)
                {
                    console.log("Keep me signed in");
                    localStorage.setItem('empid', this.state.employeeID);
                    localStorage.setItem('firstname', res.data.firstname);
                    localStorage.setItem('firstname', this.state.firstname);
                }
            }
            else
            {
                this.setState({
                    errorMessage: res.data.message || "Login failed! Check your Employee ID and password."
                });
            }
          })
          .catch(error => {
              this.setState({
                  errorMessage: "Cannot connect to server. Please check if backend is running."
              });
          })
    }

    signOut = (user) => {

        // Clear localStorage and update state immediately
        localStorage.removeItem('empid');
        localStorage.removeItem('firstname');
        
        this.setState({
            isLoggedIn: false,
            employeeID: "NONE",
            firstname: "NONE",
            errorMessage: "NaN"
        });

        // Optionally call backend (but don't wait for it)
        axios.post(SIGNOUT_URL, {
            empid: user.empid,
            firstname: user.firstname
        }).catch(err => {
            console.log("Signout backend error:", err);
        });
        
        // Redirect to home
        window.location.href = '/';
    }


    signUp = (user) => {

        axios.post(SIGNUP_URL, {
            empid: user.empid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            status: "NOT VERIFIED"
        }).then(res => {
            if(res.data === "SUCCESS")
            {
                localStorage.setItem('empid', null);
                localStorage.setItem('firstname',null);
                this.setState({
                    isLoggedIn: false,
                    empid: "NONE",
                    firstname: "NONE",
                    errorMessage: "NaN"
                })
            }
            else
            {
                console.log("FAILURE");
            }
        })


    }



    render() {
        return (
           <AuthContext.Provider value = {{...this.state, login: this.login, signOut: this.signOut, signUp: this.signUp}}>
               { this.props.children }
           </AuthContext.Provider>
        )
    }
}
