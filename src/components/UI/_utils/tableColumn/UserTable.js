import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export const UserTable = [
    {
        name: "email",
        label: "Email",
    },
    {
        name: "firstName",
        label: "First Name",

    },
    {
        name: "lastName",
        label: "Last Name",
    },
    {
        name: "role",
        label: "Role"
    },
    {
        name: "store",
        label: "Store Name"
    },
    {
        name: 'status',
        label: 'Status'
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
                            Update User
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
                            Delete User
                        </Button>
                    </Link>
            },
            filterOptions: {
                fullWidth: false
            }
        }
    },
];

export function InsertUser(email,firstName, lastName,role,store) {
    return {email, firstName, lastName,delete:email,update:email}
}