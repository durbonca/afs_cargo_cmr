import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export const appStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    headerNav: {
        //width : `calc(100% - ${drawerWidth}px)`,
        backgroundColor: "#400CCC",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
            marginLeft: drawerWidth,
        },
        whiteSpace: 'nowrap',
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
        flexGrow:1,
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        width: drawerWidth,
        flexShrink:0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
        },
    },
    offset: theme.mixins.toolbar,
    content: {
        flexGrow:1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    backgroundPic: {
        backgroundImage: "url(../assets/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "10px",
        // filter: "brightness(0.5) blur(5px)",
        backgroundColor: "A9E4D7",
    },
    cardLogin: {
      marginTop: theme.spacing(10)
    },
    containerLogin: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      //margin: `${theme.spacing(0)} auto`
    },
    btnLogin: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    btnSearch: {
        margin: theme.spacing(1),
        backgroundColor: '#212121',
        color:'white'
    },
    headerLogin: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    containerTable: {
        overflowX: 'visible',
    },
    btnAddTableGrid: {
        margin: theme.spacing(1),
    },
    ContentRight: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    ContentCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    btnIcon: {
        margin: theme.spacing(1),
    },
    csvInput:{
        border: '0px solid gray !important',
        cursor: 'pointer',
        outline:'0px solid #ddd',
        padding: '.375rem .75rem !important',
        fontSize: '1rem !important',
        margin: '0 5px',
        color: '#fff',
        backgroundColor: '#00a19a',
        borderColor: '#00a19a',
        opacity: 0,
        position: 'absolute',
        right: '-1000px',
        top: '-1000px',
    },
    CSVImport: {
        backgroundColor: '#00a19a',
        display: 'inline-block',
        fontWeight: '400 !important',
        textAlign: 'center',
        verticalAlign: 'middle',
        cursor: 'pointer',
        color: '#fff',
        fontSize: '.6rem',
        lineHeight: '1.5 !important',
        borderRadius: '.25rem !important',
        transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
        minHeight: '15px',
        position: 'relative',
        width: 'auto',
        margin: '7px 0',
    },
    btnCarga: {
        fontFamily: 'Arial',
        fontSize: '14px',
        padding: '6px 16px',
        color: 'white',
        margin: '0 5px',
    },
    lblCarga: {
        marginLeft: '10px'
    }
}));
