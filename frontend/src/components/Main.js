import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Profile from './Profile/profile'
import ViewProfile from './ViewProfile/viewProfile'
import JobApplication from './JobApplication/jobApplication';
import DisplayJobDetail from './Job/displayJobDetail';
import SavedJobs from './Job/savedJobs';
import SearchJobDisplay from './Job/searchJobDisplay';
import Login from './Login/Login'
import Signup from './Signup/Signup'
import ViewProfileApplicant from './ViewProfileApplicant'
import ViewProfileRecruiter from './ViewProfileRecruiter'
import Navbar from './Navbar/Navbar'
import PostJobMain from './PostJob/PostJobMain';
import PostedJobs from './Job/jobPosted';
import ConnectionList from './Connections/connectionList';
//import SearchPeople from './Connections/searchPeople';
import sentRequest from './Connections/sentRequest'
import receivedRequest from './Connections/receivedRequest';
import People from './Connections/Peoples';

import Messaging from './Message/messaging'
import RecruiterHome from './Homepage/RecruiterHome';
import EditPostJobMain from './EditPostJob/EditPostJobMain';
import ViewApplicants from './ViewApplicants/ViewApplicants';

class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/profile" component={Profile}/>
                <Route path="/viewprofile" component = {ViewProfile}/>
                <Route path="/jobapplication" component={JobApplication}/>
                <Route path="/jobs/view" component={DisplayJobDetail}/>
                <Route path="/savedjobs" component={SavedJobs}/>
                <Route path="/postedjobs" component={PostedJobs}/>
                <Route path="/jobs/search" component={SearchJobDisplay}/>
                <Route exact path="/login" component={Login} />
                <Route path="/signup" component={Signup}/>
                <Route path="/applicantHome" component={ViewProfileApplicant}/>
                <Route path="/recruiterHome" component={RecruiterHome}/>
                <Route path= "/" component = {Navbar}/>
                <Route path="/job-posting" component={PostJobMain}/>
                {/* <Route path="/applicantlogin" component={ApplicantLogin}/> */}
                {/* <Route path='/searchpeople' component={SearchPeople}></Route> */}
                <Route path='/peoples' component={ConnectionList}></Route>
                <Route path='/getRequests' component={receivedRequest}></Route>
                <Route path='/Mynetwork' component={People}></Route>
                <Route path='/sentrequest' component={sentRequest}></Route>

                <Route path = '/messaging' component={Messaging}></Route>
                <Route path='/edit/job-posting' component={EditPostJobMain}></Route>
                <Route path='/jobApplicants' component={ViewApplicants}></Route>





            </div>
        )
    }
}
//Export The Main Component
export default Main;
