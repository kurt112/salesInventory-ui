import {makeStyles} from "@material-ui/core/styles";
import bg from '../../assets/img/logo/sample.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    left:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    image: {
        height:'100%',
        width: '90%',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'left center',
        // paddingRight: 100
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    util: {
        display: 'flex',
        justifyContent: 'space-between',
        '& p': {
            color: 'red'
        }
    },

    progress: {
        marginTop: 10,
        width: '100%'
    },

    avatarLarge: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: 10,
        border: '4px solid rgba(0, 0, 0, 0.08)'
    },

    text: {
        fontFamily: 'Oswald,sans-serif',
        fontSize: 25,
        fontWeight: "bold",
        color: 'black'
    }

}));

export default useStyles;