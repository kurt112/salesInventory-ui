import { makeStyles } from "@material-ui/styles"
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const style = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%'
    },
    tableNavbar: {
        marginBottom: 10,

    },
    tableNavbarBox: {
        flex: 1
    },
    tableContainerWrapper: {
        width: '100%',
        overflowX: 'auto',
    },
    tableHead: {
        fontWeight: 'bold'
    },
}))


export default style;
// just override this function if you have a unique function
// in your table
export function TableOptions(loading) {

    return {
        filter: true,
        filterType: "dropdown",
        tableBodyMaxHeight: '490px',
        selectableRowsHeader: true,
        rowsPerPageOptions:[10,20,50,100],
        rowsPerPage:10,
        pagination: true,
        searchPlaceholder: 'Search Anything',
        selectableRowsHideCheckboxes: false,
        selectableRows:  'none',
        textLabels: {
            body: {
                noMatch: loading?"": "Sorry, no matching records found",
            },
        }
    };
}
