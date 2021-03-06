import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class JobsPosted extends Component {

    constructor(props) {

        super(props);

        this.state = {
            postedJobs: [],
            totalPages: "",
            noPostedJobs: "",
            errormsg: ""
        }
        this.jobEditPage = this.jobEditPage.bind(this);
        this.jobApplicants = this.jobApplicants.bind(this);
    }

    componentDidMount() {
        this.getPostedJobs(1)
    }

    getPostedJobs(page) {
        this.setState({
            noPostedJobs: ""
        })
        axios.get('http://localhost:3001/recruiter/jobs/posted',
            {
                headers: { Authorization: localStorage.getItem('token') },
                params: {
                    email: localStorage.getItem('email'),
                    pageNo: page,
                }
            })
            .then((response) => {
                console.log(response)
                //update the state with the response data
                if (response.status === 200) {
                    this.setState({
                        postedJobs: response.data.jobs,
                        totalPages: response.data.totalPages
                    })
                    if (response.data.jobs.length == 0) {
                        this.setState({

                            noPostedJobs: "No Posted Jobs",
                            postedJobs: []
                        })
                    }
                    console.log(response)
                }
                else {
                    this.setState({
                        postedJobs: []
                    })
                }
            })
            .catch(error => {
                this.setState({
                    errormsg: error.response
                })
            });
    }

    handlePageClick = (data) => {
        let selected = data.selected + 1;
        // this.setState({
        //     currentPage: selected
        // })
        this.getPostedJobs(selected)

    }

    jobEditPage(job) {  
            let detailPage = null
            detailPage = this.props.history.push({
                pathname: "/edit/job-posting",
                state: {
                    jobInfo: job
                }
            })
    }

    jobApplicants(job) {  
        let detailPage = null
        detailPage = this.props.history.push({
            pathname: "/jobApplicants",
            state: {
                jobId: job._id,
                allowEasyApply: job.allowEasyApply
            }
        })
}
    newJob(){
        let detailPage = null
        detailPage = this.props.history.push({
            pathname: "/job-posting",
            state: {
            }
        })
    }

    render() {
        console.log(this.state.noPostedJobs)
        let redirectVar = null;
        if (!localStorage.getItem('email') || localStorage.getItem('isRecruiter') == "false") {
            redirectVar = <Redirect to="/login" />
        }
        
        let displayPostedJobs = this.state.postedJobs.map(jobs => {
            return (
                
                    <div className="col-md-12 savedJobsCards">
                        <div className="col-md-2 ">
                            <img height="100px" width="100px" style={{marginTop: "15px"}} src={jobs.companyLogo}></img>
                        </div>
                        <div className="col-md-10 bottom-border-jobs">
                        <div className="col-md-7 savedJobsDetails">

                            <h5><b>{jobs.title}</b> - <span> {jobs.employmentType}</span></h5> 
                            
                            <h6>{jobs.companyName}</h6>
                            <br/>
                            <p>{jobs.city}</p>
                            
                        </div>
                        <div align="right" class="col-md-2">
                            <button type="button" class="btn btn-primary" onClick={() => { this.jobEditPage(jobs) }} style={{ marginTop: "20px", border: "1px solid #B8BDBE"}} >Edit Job</button>
                            <button type="button" class="btn btn-primary" onClick={() => { this.jobApplicants(jobs) }} style={{ marginTop: "20px", border: "1px solid #B8BDBE"}} >View Applicants</button>
                        </div>
                        </div>   
                    </div>
               
            )
        })

        return (
            <div className="containerFluid" style={{ marginTop: "52px" }}>
                {redirectVar}
                <div className="col-md-12">
                <p style={{ color: "red" }}>{this.state.noSavedJobs}</p>
                <p style={{ color: "red" }}>{this.state.errormsg}</p>
                </div>
                <div className="col-md-12 ">
                <div className="col-md-12">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 savedJobsBox" style={{paddingTop:"0px"}}>
                    <div className="col-md-12 savedJobsBanner" >
                        <div className="col-md-5"><h4 > Jobs Posted</h4> </div>
                        <div className="col-md-5"></div>
                        <div className="col-md-2" style={{padding:"0px"}}><button onClick={() => { this.newJob() }} style={{color: "White", marginBottom: "5px"}} className="btn btn-primary">Post a New Job</button></div>
                    </div>
                       
                        {displayPostedJobs}
                        
                    </div>
                    </div>
                    <div className="col-md-12">
                    <div className="col-md-5"></div> 
                    <div className="col-md-5">

                            <ReactPaginate previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={<a href="">...</a>}
                                breakClassName={"break-me"}
                                pageCount={this.state.totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"} />
                        </div>
                    </div>
                </div>
            </div>
            
            )


    }
}

export default JobsPosted;