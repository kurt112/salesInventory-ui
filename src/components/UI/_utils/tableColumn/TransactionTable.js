import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export const TransactionTable = [
    {
        name: "cashierAssign",
        label: "Cashier Assigned"
    },
    {
        name: "amount",
        label: "Amount",

    },
    {
        name: "discount",
        label: "Discount",
    },
    {
        name: "customer",
        label: "Customer Name",
    },
    {
        name: "store",
        label: "Store Name"
    },
    {
        name: "date",
        label: "Date"

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

export function InsertTransaction(id,cashierAssign,amount,discount, customer,store,date) {
    return {id,cashierAssign,amount,discount, customer,store,date, update:id, delete: id}
}