import {MonthsWord} from "../date/ConvertMonthWord";

export const ProductTable = [
    {
      name:"code",
      label: "Product Code"
    },
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
        label: "Branch Name"
    },
    {
        name: "status",
        label: "Status"
    },
    {
        name: "date",
        label: "Date Arrive"
    }
];

export function InsertProduct(code,brand,productName,type, amount, supplier, store,status,id,dateTime) {
    return {code,brand,productName,type, amount, supplier, store,status,id,date: MonthsWord(dateTime)}
}