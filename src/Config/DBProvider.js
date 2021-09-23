import React, { createContext, useState, useMemo, useEffect, useContext, useRef } from 'react';
import firebase from './firebase';
import { useHistory } from "react-router-dom";
import _ from 'lodash'

const DBContext = createContext()

export const DBProvider = ({children}) => {
    const history = useHistory();
    const auth = firebase.auth();
    const db = firebase.firestore();

    const [state, setState] = useState({

        //user
        email: null,
        password: null,


        //navbar
        drawerOpen: false,
        subProfile: null,

        //DataSets Modulos
        DataSet:[],
        DataSetXCobrar:[],
        DataSetClientes:[],

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
            DataSet, DataSetXCobrar, DataSetClientes, Columns,
            showIdCell, showbtnAdd, editRow, openDialog, idRowSelected,
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
                window.sessionStorage.setItem('user', JSON.stringify(user));
                setIsAuth(true)
            } else {
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
        if(email && password){
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
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
        auth.signOut();
        window.sessionStorage.removeItem('user');
        setIsAuth(false);
    }


    const SendMail = (message) => {
        return new Promise((resolve, reject) => {
            setState((prevState) => ({ ...prevState, isLoading: true }));
            const  headersList = {
                "Accept": "*/*",
                "User-Agent": "Afs CMR Client (https://AfsCmrClient.io)",
                "Content-Type": "application/json"
            }

            const contentMails= {
                "name": message.name,
                "to": message.to,
                "subject": message.subject,
                "html": message.html
            };

            fetch("http://localhost:5001/sendEmail", {
                method: "POST",
                body: JSON.stringify(contentMails),
                headers: headersList
            }).then((response) => {
                setState((prevState) => ({ ...prevState, isLoading: false }));
                resolve(response.text());
            }).catch((error)=>{
                setState((prevState) => ({ ...prevState, isLoading: false }));
                reject(error)
            })
        })
    }

    const getColecctions = () => {
        return new Promise((resolve) => {
             resolve(['Clientes','XCobrarCSV'])
        });
    }

    const existDataCollection = (collection, objectExist) => {
        return new Promise((resolve, reject) => {
            getDataCollection(collection).then(async (data) => {
                await ifExist(data, objectExist).then(exist => {
                    resolve(exist)
                })
            }).catch((error)=> {
                reject(error)
            })
        })
    }

    const updateDataCollection = (collection, id, data) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).doc(id).update(data).then(() => {
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
                    await existDataCollection('Clientes',{'Rutcliente':d.Rutcliente})
                    .then( async existe => {
                        if(! existe){
                             await putDataCollection('Clientes', {Rutcliente: d.Rutcliente, RazonSocial: d.RazonSocial, email: '', datetime: d.datetime})
                        }
                    })
                    await existDataCollection(collection,{'Folio': d.Folio})
                    .then(async existe => {
                        if(! existe){
                            await putDataCollection(collection, d)
                        }
                    })

                    if (data.CountData - 1 == i) {
                        resolve(true)
                    }
                }, {})
            } catch (e) {
                console.log(e)
            }
        })
    }

    const delDataCollection = (Colletion, id) => {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        return new Promise((resolve, reject) => {
            db.collection(Colletion).doc(id).delete().then(() => {
                setState((prevState) => ({ ...prevState, isLoading: false }));
                resolve(true)
            }).catch(error => {
                setState((prevState) => ({ ...prevState, isLoading: false }));
                reject(error)
            })
        })
    }


    useEffect(() => {
        handleColumns(DataSet)
        // eslint-disable-next-line
    },[DataSet])

    const handleColumns= () => {
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
        return new Promise((resolve, reject) => {
            setState((prevState) => ({ ...prevState, isLoading: true }));
            const DataRef = db.collection(collection).orderBy('datetime', 'desc');
            DataRef.onSnapshot(snapshot => {
                let data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                data.forEach(d => {d.datetime = d.datetime.toDate().toDateString()})
                setState((prevState) => ({ ...prevState, isLoading: false }));
                resolve(data)
            },(error) => {
                reject(error)
            });
        });
    }

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

    const getDataWhereSearchCollection = (collection, arraywhere) => {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        return new Promise((resolve, reject) => {
            const DataRef = db.collection(collection)
            DataRef.onSnapshot(snapshot => {
                let data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                data.forEach(d => {
                    if(d.datetime){
                        d.datetime = Date.parse(d.datetime.toDate().toDateString())
                    }
                })
                data = orderBy(data,['datetime']);
                for (const w of arraywhere) {
                    if(w.Column =="status"){
                        data = where(data, {"status": w.Data})
                    }
                    if(w.Column =="Rutcliente" && w.Data != ''){
                        data = where(data, {"Rutcliente": w.Data})
                    }

                    if(w.Column =="startDate"){
                        data = greaterThan(data,"datetime", w.Data)
                    }

                    if(w.Column =="endDate"){
                        data = smallerThan(data,"datetime", w.Data)
                    }
                }
                setState((prevState) => ({...prevState, DataSetXCobrar: data }))
                setState((prevState) => ({ ...prevState, isLoading: false }));
                resolve(data)
            },(error) => {
                reject(error)
            });
        });
    }

    const getDataById = async (collection, id) => {
        return new Promise((resolve, reject) => {
            const DocRef = db.collection(collection).doc(id);
            DocRef.get().then((doc) => {
                if (doc.exists) {
                    resolve(doc.data());
                    console.log("existe")
                } else {
                    resolve(null);
                    console.log("no existe")
                }
            }).catch((error) => {
                reject(error);
            })
        })
    }

    const orderBy = (ArrayOrigin, arrayField) =>{
        return _.sortBy(ArrayOrigin, arrayField)
    }

    const removeDataDuplicates = (ArrayOrigin, field ) => {
        return _.uniqBy(ArrayOrigin, field);
    }

    const groupByData = (ArrayOrigin, field) => {
        return _.groupBy(ArrayOrigin, field)
    }

    const sumByField = (ArrayOrigin, field) => {
        const d = _.each(ArrayOrigin, item => item[field] = Number(item[field]));
        return _.sumBy(d, field)
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'CLP' }).format(number);
    }

    const where = (ArrayOrigin, objectWhere) => {
        return _.filter(ArrayOrigin, objectWhere)
    }

    const greaterThan = (ArrayOrigin, field, value) => {
        return _.filter(ArrayOrigin, (item) => {
            return _.gte(item[field], value)
        })
    }

    const smallerThan = (ArrayOrigin, field, value) => {
        return _.filter(ArrayOrigin, (item) => {
            return _.lte(item[field], value)
        })
    }

    const between = (ArrayOrigin, field, value1, value2) => {
        return _.filter(ArrayOrigin, (item) => {
            return _.gte(item[field], value1) && _.lte(item[field], value2)
        })
    }

    const ifExist = (ArrayOrigin, objectWhere) => {
        return new Promise((resolve) => {
            resolve(typeof _.find(ArrayOrigin, objectWhere) !== "undefined")? true:false;
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

            //DataSets
            DataSet,
            DataSetXCobrar,
            DataSetClientes,
            Columns,
            setState,

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
            getDataById,
            getDataWhereSearchCollection,
            existDataCollection,
            getColecctions,

            //Functions
            removeDataDuplicates,
            groupByData,
            sumByField,
            SendMail,
            formatNumber,
            smallerThan,
            greaterThan,
            between,
            orderBy,
            ifExist,
            where
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
