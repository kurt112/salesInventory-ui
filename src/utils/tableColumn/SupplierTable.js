export const SupplierTable = [
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
        label: "Postal code"
    },
    {
        name: "mobile_no",
        label: "Mobile No"
    },
    {
        name: "telno",
        label: "TelNo"
    }
];

export function InsertSupplier(id, name,email, address,city,state, postalCode,mobile_no,telno) {
    return {id, name,email, address,city,state, postalCode,mobile_no,telno}
}