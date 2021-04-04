import { makeStyles } from "@material-ui/styles"

const style = makeStyles(() => ({
    root: {
        width: '100%',
        overflowY: 'auto',
        height: '100%'
    },
    tableContainer: {
        maxHeight: 520
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
    }
}))


export default style;
// just overide this function if you have a unuqie function
// in your table
export function TableOptions(pageChange,searchChange,searchText, pageNumber,totalElements, currentPage,loading) {

    return {
        filter: true,
        filterType: "dropdown",
        tableBodyMaxHeight: '490px',
        selectableRowsHeader: true,
        rowsPerPageOptions:[],
        rowsPerPage:10,
        count:totalElements,
        page: currentPage,
        pagination: true,
        searchText:searchText,
        onSearchChange:searchChange,
        onChangePage:pageChange,
        searchPlaceholder: 'Search Anything',
        selectableRowsHideCheckboxes: false,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: loading?"": "Sorry, no matching records found",

            },
        },


    };
}
