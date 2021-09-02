import React, { createContext, useState, useMemo, useEffect, useContext, useRef } from 'react';
import firebase from './firebase';
import { useHistory } from "react-router-dom";

const DBContext = createContext()

export const DBProvider = ({children}) => {
    const history = useHistory();
    const auth = firebase.auth();
    const db = firebase.firestore();
    //console.log('inicializando...')

    const [state, setState] = useState({

        //user
        email: null,
        password: null,


        //navbar
        drawerOpen: false,
        subProfile: null,

        //tablegrid
        DataSet:[],
        Columns:[],
        ShowColumns: [],
        showIdCell: false,
        showbtnAdd: false,
        editRow: false,
        openDialog: false,
        idRowSelected : null,
        ShowBtnCSV:false,
        isLoading:false,
        DataCollectionNow:null
    });

    const { email,password,
            drawerOpen, subProfile,
            DataSet, Columns,showIdCell, showbtnAdd, editRow, openDialog, idRowSelected,
            ShowBtnCSV, isLoading, ShowColumns, DataCollectionNow
        } = state;

    const [isAuth, setIsAuth] = useState(() => window.sessionStorage.getItem('user'));

    //User
    const emailChange = (e) => setState((prevState) => ({ ...prevState, email: e.target.value }));
    const passwordChange = (e) => setState((prevState) => ({ ...prevState, password: e.target.value }));

    //NavBar
    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const handlesubProfileOpen = (e) => setState((prevState) => ({ ...prevState, subProfile: e.currentTarget }));
    const handlesubProfileClose = () => setState((prevState) => ({ ...prevState, subProfile: null }));

    //TableGrid
    const [ DialogMode, setDialogMode] = useState('Add');
    const handleSetShowColumns = (columns) => setState((prevState) => ({ ...prevState, ShowColumns: columns }));
    const handleshowbtnAdd = () => setState((prevState) => ({ ...prevState, showbtnAdd: true }));
    const handleshowIdCell = () => setState((prevState) => ({ ...prevState, showIdCell: true }));
    const handleEditRow= () => setState((prevState) => ({ ...prevState, editRow: true }));
    const handleOpenDialog = () => setState((prevState) => ({ ...prevState, openDialog: true }));
    const handleCloseDialog = () => setState((prevState) => ({ ...prevState, openDialog: false }));
    const handleIdRowSelected = (id) => setState((prevState) => ({ ...prevState, idRowSelected: id }));
    const handleShowBtnCSV = () => setState((prevState) => ({ ...prevState, ShowBtnCSV: true }));

    const setDataCollectionNow = (collection) => setState((prevState) => ({ ...prevState, DataCollectionNow: collection }));

    const isMountedRef = useRef(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user=>{
            if (user) {
               //console.log("logieee")
                window.sessionStorage.setItem('user', JSON.stringify(user));
                setIsAuth(true)
            } else {
                //console.log("no estoy login")
                window.sessionStorage.removeItem('user');
                setIsAuth(false)
            }
        });

        return () => {
            isMountedRef.current = false;
        }
    },[])

    const login = (e)  => {
        e.preventDefault();
        //console.log('login');
        if(email && password){
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    //console.log("Haciendo Login...");
                    //console.log(res);
                    if(isMountedRef.current){
                        setIsAuth(true)
                        history.push("/Home");
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                })
        }
    }

    const logout = (e) => {
        e.preventDefault();
        //console.log("logout")
        auth.signOut();
        window.sessionStorage.removeItem('user');
        setIsAuth(false);
    }

    const updateDataCollection = (collection, id, data) => {
        console.log(id)
        return new Promise((resolve, reject) => {
            db.collection(collection).doc(id).update(data).then(() => {
                console.log('actualizado')
                resolve(true)
            }).catch(error => {
                reject(error)
            })
        })
    }

    const putDataCollection = (collection, d) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).add(d).then(() => {
                resolve(true)
            }).catch(error => {
                reject(error)
            })
        })
    }


    const putDataCollectionAll = (collection, data) => {
        return new Promise((resolve) => {
            try {
                data.Data.forEach(async (d, i) => {
                    d.datetime = firebase.firestore.Timestamp.fromDate(new Date())
                    d.status = 0
                    d.email = ''
                    await putDataCollection(collection, d)
                    if (data.CountData - 1 == i) resolve(true)
                }, {})
            } catch (e) {
                console.log(e)
            }
        })
    }

    const delDataCollection = (id) => {
        return new Promise((resolve, reject) => {
            db.collection(DataCollectionNow).doc(id).delete().then(() => {
                resolve(true)
            }).catch(error => {
                reject(error)
            })
        })
    }

    // const setDataCollection = (collection) => {
    //     db.collection(collection).doc(id).update({
    //         Cliente: 'Nuevo',
    //         Rut: '1234567890-0',
    //         Monto: 0,
    //         datetime: firebase.firestore.FieldValue.serverTimestamp()
    //     });
    // }


    useEffect(() => {
        handleColumns(DataSet)
        // eslint-disable-next-line
    },[DataSet])

    const handleColumns= () => {
        //console.log('handleColumns')
        if(ShowColumns.length > 0){
            const ShowCols = ShowColumns.map(doc => doc.replace(/ /g, ""))
            setState((prevState) => ({ ...prevState, Columns: ShowCols }));
        }else{
            if(DataSet.length > 0){
                let cols = Object.keys(DataSet[0]);
                if(!showIdCell){
                    cols = cols.filter(c => c.toLowerCase() !== 'id')
                }
                const ShowCols = cols.map(doc => doc.replace(/ /g, ""))
                setState((prevState) => ({ ...prevState, Columns: ShowCols }));
            }
        }
    }
    

    const getDataCollection = (collection) => {
        //console.log("getdatacollection")
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const DataRef = db.collection(collection).orderBy('datetime', 'desc');
        DataRef.onSnapshot(snapshot => {
            let data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            data.forEach(d => {d.datetime = d.datetime.toDate().toDateString()})
            setState((prevState) => ({...prevState, DataSet: data }))
            setState((prevState) => ({ ...prevState, isLoading: false }));
        },(error) => {
            console.log(error)
        });
    }

    /*
    * Function: getDataWhereCollection: Obtiene La informacion  de todos los campos con clusula where
    * Colletion (String) : La Coleccion de la base de Datos
    * Where (Object) : {Column:"String", Data: "String"}
    * Return (Object)
    */
    const getDataWhereCollection = (collection, where) => {
        return new Promise((resolve, reject) => {
            setState((prevState) => ({ ...prevState, isLoading: true }));
            const DataRef = db.collection(collection).where(where.Column, "==", Number(where.Data));
            DataRef.onSnapshot(snapshot => {
                let data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                data.forEach(d => {d.datetime = d.datetime.toDate().toDateString()})
                setState((prevState) => ({ ...prevState, isLoading: false }));
                resolve(data)
            },(error) => {
                reject(error)
            });
        })
    }


    const value = useMemo(() => {
        return {
            //user
            isAuth,
            login,
            logout,
            emailChange,
            passwordChange,

            //NavBar
            drawerOpen,
            subProfile,
            handleDrawerOpen,
            handleDrawerClose,
            handlesubProfileOpen,
            handlesubProfileClose,

            //tableGrid
            DataSet,
            Columns,
            showIdCell,
            showbtnAdd,
            editRow,
            openDialog,
            DialogMode,
            idRowSelected,
            ShowBtnCSV,
            isLoading,
            handleSetShowColumns,
            getDataCollection,
            handleshowbtnAdd,
            handleshowIdCell,
            handleEditRow,
            handleOpenDialog,
            handleCloseDialog,
            setDialogMode,
            handleIdRowSelected,
            handleShowBtnCSV,
            updateDataCollection,
            putDataCollection,
            putDataCollectionAll,
            delDataCollection,
            setDataCollectionNow,
            getDataWhereCollection,
        }
        // eslint-disable-next-line
    },[ isAuth,email, password,
        drawerOpen, subProfile,
        DataSet, Columns, showIdCell, showbtnAdd, editRow, openDialog, DialogMode, idRowSelected, isLoading, DataCollectionNow ]);


    return  <DBContext.Provider value={value}>
                {children}
            </DBContext.Provider>
}

export const useDBContext = () => {
    const context = useContext(DBContext);
    if (!context){
        throw new Error("Base de Datos No conectada");
    }
    return context;
}
