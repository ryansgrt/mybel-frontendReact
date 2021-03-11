import React from "react";
import {deleteVendor, getVendors} from "./services/VendorServices";
import {Button, Card, Spinner, Table} from "reactstrap";
import {EDIT_BUTTON, FETCH_COMPLETE, SET_LOADING} from "./reducers/ActionVendor";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Swal from "sweetalert2";
import {BASEURL} from "../../shared/BaseURL";

function ListVendor (props) {


    const loadData=()=> {
        const {fetchData, fetchComplete} = props;

        fetchData();

        getVendors().then((vendors) => {
            fetchComplete(vendors);
        });
    }
    React.useEffect(() => {
       loadData()
    }, []);
   const handleEdit =(vendorId)=>{
        const {handleEdit,history} = props;
        handleEdit(vendorId);
        history.replace("/vendor/register");
    }
    const handleDelete = (Id) =>{

        deleteVendor(Id).then((isSucces) => {
            if (isSucces) loadData();
        });
    }

   const handleDeleteButton = (vendor) =>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: `Are you sure want to delete ${vendor.name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
               handleDelete(vendor.id)
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    `${vendor.name} has been deleted.`,
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    `${vendor.name} is safe :)`,
                    'error'
                )
            }
        })
    }


  const  generateTableRows=()=>{
        const {vendors} = props;
        let rows = <tr><td colSpan="2" className="text-center"> <Spinner color="primary" /> </td> </tr>

        if(!props.isLoading){
            rows = vendors.map((vendor, index)=>{
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{vendor.name}</td>
                        <td>{vendor.gender}</td>
                        <td>{vendor.company}</td>
                        <td>{vendor.email}</td>
                        <td>{vendor.address}</td>
                        <td>{`${vendor.statusRequest}`}</td>
                        <td><img src={`${BASEURL}/vendor/photo/${vendor.id}`} width='163' height='130' /></td>                        <td>
                        <Button type="button"  color="warning" size="sm" onClick={()=> handleEdit(vendor.id)}>
                           Edit</Button></td>
                        <td><Button type="button"  color="danger" size="sm" onClick={()=>handleDeleteButton(vendor)}>
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
                    <th width="15%">Name</th>
                    <th width="10%">Gender</th>
                    <th width="15%" >Company</th>
                    <th width="15%">Email</th>
                    <th width="15%">Address</th>
                    <th width="10%">Delete</th>
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
    return {vendors:[...state.vendor.vendors]}
}

function mapDispatchToProps(dispatch) {
    return{
        fetchData:() => dispatch({type: SET_LOADING}),
        fetchComplete:(payload) => dispatch({type: FETCH_COMPLETE, payload}),
        handleEdit:(payload)=>dispatch({type: EDIT_BUTTON, payload })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListVendor));
