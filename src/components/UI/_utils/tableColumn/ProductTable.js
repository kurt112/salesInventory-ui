import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export const ProductTable = [
    {
        name: "brand",
        label: "Brand"
    },
    {
        name: "productName",
        label: "Product Name",

    },
    {
        name: "type",
        label: "Type",
    },
    {
        name: "amount",
        label: "Amount",
    },
    {
        name: "supplier",
        label: "Supplier Name"
    },
    {
        name: "store",
        label: "Store Name"
    },
    {
        name: "status",
        label: "Status"
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

export function InsertProduct(id,brand,productName,type, amount, supplier, store,status) {
    return {brand,productName,type, amount, supplier, store,status, update:id, delete: id}
}