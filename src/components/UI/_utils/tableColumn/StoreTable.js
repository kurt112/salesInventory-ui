import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export const StoreTable = [
    {
        name: "name",
        label: "Name"
    },
    {
        name: "email",
        label: "Email",

    },
    {
        name: "address",
        label: "Address",
    },
    {
        name: "city",
        label: "City",
    },
    {
        name: "state",
        label: "State"
    },
    {
        name: "postalCode",
        label: "Store Name"
    },
    {
        name: "mobile_no",
        label: "Mobile No"
    },
    {
        name: "telno",
        label: "TelNo"
    },
    {
        name: "update",
        label: "Update",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return value === undefined ? null :
                    <Link to={`/student/profile/`+value} style={{textDecoration: 'none'}}>
                        <Button variant="outlined" color="primary">
                            Update
                        </Button>
                    </Link>
            },
            filterOptions: {
                fullWidth: false
            }
        }
    },
    {
        name: "delete",
        label: "Delete",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return value === undefined ? null :
                    <Link to={`/student/profile/`+value} style={{textDecoration: 'none'}}>
                        <Button variant="outlined" color="secondary">
                            Delete
                        </Button>
                    </Link>
            },
            filterOptions: {
                fullWidth: false
            }
        }
    },

];

export function InsertStore(id, name,email, address,city,state, postalCode,mobile_no,telno) {
    return {id, name,email, address,city,state, postalCode,mobile_no,telno, update:id, delete: id}
}