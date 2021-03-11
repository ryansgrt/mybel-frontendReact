import React from "react";
import {deleteUser, getUsers} from "./services/UserServices";
import {Button, Card, Spinner, Table} from "reactstrap";
import {EDIT_BUTTON, FETCH_COMPLETE, SET_LOADING} from "./reducers/ActionUser";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Swal from "sweetalert2";
import logo from './loadingmybel.gif'
import {BASEURL} from "../../shared/BaseURL";


function UserList(props) {


    const loadData=()=> {
        const {fetchData, fetchComplete} = props;

        fetchData();

        getUsers().then((users) => {
            fetchComplete(users);
        });
    }
    React.useEffect(() => {
        loadData()
    }, []);
    const handleEdit =(userId)=>{
        const {handleEdit,history} = props;
        handleEdit(userId);
        history.replace("/user");
    }
    const handleDelete = (Id) =>{

        deleteUser(Id).then((isSucces) => {
            if (isSucces) loadData();
        });
    }

    const handleDeleteButton = (user) =>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: `Are you sure want to delete ${user.name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                handleDelete(user.id)
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    `${user.name} has been deleted.`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    `${user.name} is safe :)`,
                    'error'
                )
            }
        })
    }


    const  generateTableRows=()=>{
        const {users} = props;
        let rows = <tr><td colSpan="10" className="text-center"><img src={logo} alt="loading..." width="200" height="200" /></td> </tr>

        if(!props.isLoading){
            rows = users.map((user, index)=>{
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.phone}</td>
                        <td>{user.password}</td>
                        <td><img src={`${BASEURL}/user/photo/${user.id}`} width='163' height='130' /></td>                        <td>
                        <Button type="button"  color="warning" size="sm" onClick={()=> handleEdit(user.id)}>
                            Edit</Button></td>
                        <td><Button type="button"  color="danger" size="sm" onClick={()=>handleDeleteButton(user)}>
                            Delete</Button></td>
                    </tr>
                )
            });
        }
        return rows;
    }
    return(
        <Card className="shadow">
            <Table responsive striped hover className="m-0">
                <thead>
                <th>#</th>
                <th width="30%">Name</th>
                <th width="10%">Username</th>
                <th width="10%" >Email</th>
                <th width="10%">Address</th>
                <th width="10%">Phone</th>
                <th width="10%">Password</th>
                <th width="25%">Photo</th>
                <th colSpan="2" width="10%" className="text-center">Actions</th>
                </thead>
                <tbody>
                {generateTableRows()}
                </tbody>
            </Table>
        </Card>
    )
}

function mapStateToProps(state) {
    return{...state};
}

function mapDispatchToProps(dispatch) {
    return{
        fetchData:() => dispatch({type: SET_LOADING}),
        fetchComplete:(payload) => dispatch({type: FETCH_COMPLETE, payload}),
        handleEdit:(payload)=>dispatch({type: EDIT_BUTTON, payload })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList));
