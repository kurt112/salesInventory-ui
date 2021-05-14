import {Chip} from "@material-ui/core";
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import MoodBadIcon from '@material-ui/icons/MoodBad';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
export const CriticalStockTable = [
    {
        name: "code",
        label: "Product Code"
    },
    {
        name: "branch",
        label: "Branch",
    },
    {
        name: 'status',
        Label: 'Status',
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
                return value === 'Empty' ? <Chip style={{fontWeight: 'bold'}} color="secondary"
                                                 icon={<MoodBadIcon/>}
                                                 label={value}/>
                    : value === 'Good' ? <Chip style={{fontWeight: 'bold', backgroundColor: 'green'}}
                                               color="secondary"
                                               icon={<SentimentVerySatisfiedIcon/>}
                                               label={value}/> :
                        <Chip style={{backgroundColor: '#F74300', color: 'white', fontWeight: 'bold'}}
                              icon={<SentimentDissatisfiedIcon style={{color: 'white'}}/>}
                              label={value}/>

            },
            filterOptions: {
                fullWidth: false
            }
        }
    }


];

export function InsertCriticalStock(code, branch, status) {
    return {code, branch, status}
}