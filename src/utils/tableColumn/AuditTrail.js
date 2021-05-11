export const AuditTrailTable = [
    {
        name: "name",
        label: "Name",

    },
    {
        name: "action",
        label: "Action",
    },
    {
        name: "branch",
        label: "Branch"
    },
    {
        name: "date",
        label: "Date",
    },
    {
        name: 'value',
        label: 'Value'
    }

];

export function InsertAudit(name,action,branch,date,value,id) {
    return {name, action,branch,date,value,id}
}