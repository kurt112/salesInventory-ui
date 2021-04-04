import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export const SalesTable = [
    {
        name: "productName",
        label: "Product Name",

    },
    {
        name: "price",
        label: "Price"
    },
    {
        name: "qty",
        label: "QTY",
    },
    {
        name: "total",
        label: "Total"
    },
    {
        name: "transaction",
        label: "Transaction ID",
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

export function InsertSales(id,productName,price,qty,total,transaction, date) {
    return {productName,price,qty,total,transaction, date, update:id, delete: id}
}