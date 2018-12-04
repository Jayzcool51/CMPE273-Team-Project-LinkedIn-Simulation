import React,{Component} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import ReactPaginate from 'react-paginate';

class ConnectionList extends Component{
    constructor(props){
        super(props);
        this.state={
            connections:[],
            isConnectionGet:false,
            isProfileGet:false,
            searchPageCount:1,
            connectcount:0
        }
     //   this.handlePageClick=this.handlePageClick.bind(this)
    }
  /*  getConnections(PageNo=1){
        axios.defaults.withCredentials=true;
        axios.get('http://localhost:3001/getConnections', {headers: { Authorization: localStorage.getItem('token')},
       params: {
           email: localStorage.getItem('email'),
           page:PageNo
       }})
        .then((response)=>{
            if(response.status ===200){
                this.setState({
                    connections:response.data,
                    searchPageCount:response.data.totalpages
                });
            }else{
                this.setState({
                    onSuccess: false,
                    errorMessage: response.data.message
                })
            }
           
        });
    }
    handlePageClick = (data) => {
        this.getConnections(data.selected + 1)
    };
    */componentDidMount(){

      //  this.getConnections()
          axios.defaults.withCredentials=true;
        axios.get('http://localhost:3001/getConnections', {headers: { Authorization: localStorage.getItem('token')},
       params: {
           email: localStorage.getItem('email')
       }})
        .then(response=>{
            console.log(' The result', response.data)
            this.setState({
                connections:response.data.data,
                connectcount:response.data.count
            });
        }).catch(err=>{
            console.log(err)
        });
     }
     viewConnection(people,e){
        this.props.history.push({
            pathname:'/viewprofile',
            state:{
                email:people
            }
        })   
     }
     Message(name,email,e){
        this.props.history.push({
            pathname:'/messaging',
            state:{
                name:name,
                email : email
            }
        })   
     }
     onRemove(connection_email,e){
        axios.defaults.withCredentials=true;
        axios.post('http://localhost:3001/removeconnect', {headers: { Authorization: localStorage.getItem('token')},
        params: {
            user_email:localStorage.getItem('email'),
            connection_email:connection_email
        }})
        .then((response=>{
            if(response.status==400){
                this.setState({
                    isReqFail:true
                })
            }
            window.location.reload()

        }))
    } 
    render(){
        let connections=this.state.connections.map(connections=>{
            return(
<div>
    <div class='media-main'>
        <a class='pull-left'  href='#'>
            <img class='thumb-lg img-circle bx-s' src='https://bootdey.com/img/Content/user_1.jpg' alt='hello'></img>
        </a>

        <div class='info'>
        <a onClick={this.viewConnection.bind(this,connections.email)}>
                            <h5 class="card-title" style={{fontSize:'14px'}}>{connections.fName} {connections.lName}</h5></a>
            <p class='text-muted'>{connections.occupation}</p>
            <a onClick={this.Message.bind(this,connections.fName + " " + connections.lName,connections.email)} style={{position:'relative',left:'550px',bottom:'60px'}} class='btn btn-default tooltips' data-toggle='tooltip' data-original-title='Connect' >
                 <i class='far fa-handshake'>Message</i>
            </a>
             <a onClick={this.onRemove.bind(this,connections.email)} style={{position:'relative',left:'600px',bottom:'60px'}} class='btn btn-danger tooltips' data-toggle='tooltip' data-original-title='Connect' >
                <i class='far fa-handshake'>Remove</i>
            </a> 
        </div>
        <div class="clearfix" style={{marginTop:'-20px'}}></div>
        <hr/>
    </div>
</div>
            )
        })
        return(
            <div class='container' style={{marginTop:'55px'}}>
            <div class='core-rail' style={{backgroundColor:'white', padding:'20px',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <div class='self-focused ember-view'>
                    <div class='ember-view'>
                        <section id='connections mb4 artdeco-card ember-view'>
                            <header class='mn-connections_header' style={{marginTop:'20px'}}>
                                <h2 class='t-18 t-black t-normal'>
                                    {this.state.connectcount}
                                </h2>
                            </header>
{/*                         <div class='mn-connections_actions-container ph5 pb3' style={{marginTop:'20px'}}>
                            <div id='searchconnect' class='mn-connections_search-container t-14 t-black--light t-normal ember-view'>
                            <div class='input-group' id='group1' style={{width:'520px',height:'1px'}}>
                                <input type='text' id='searchbar' name='searchinput' class='form-control' placeholder='Search'></input>
                                <span class='input-group-btn'>
                                    <button type='button' id='searchbutton' class='btn btn-effect-ripple btn-primary' ><i class='fa fa-search' > Search</i></button>
                                   </span>
                                </div>
                            </div>
                        </div> */}
                        <div class='panel-body p-t-10'>
                        {connections}
                        </div>
                        </section>

                    </div>
                </div>
       {/*          <div style={{ margin: "auto", textAlign: "center" }}>
                    <ReactPaginate previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        pageCount={this.state.searchPageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div> */}
            </div>

            </div>
        )
    }

}
export default ConnectionList;