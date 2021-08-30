import React, {useRef} from 'react';
import { appStyles } from '../../Config/AppStyle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Button } from '@material-ui/core';
import Swal from "sweetalert2";
import { useDBContext } from '../../Config/DBProvider';

const CSVImport = ({
			accept = '.csv, text/csv',
			inputId = 'fileInput',
			inputName = 'fileDoc',
			disabled = false,
			_newline = '\r\n',
			_delimiter = ';'
	}) => {
	const { CSVImport, csvInput, btnCarga, lblCarga } = appStyles();
	const { putDataCollectionAll } = useDBContext();

	const fileInput = useRef(null)

	const customFile = () => {
		fileInput.current.click()
	}

	const csvToJson = (filecsv) => {
		let result = {"CodError": 1, "CountData": 0, "Data": [] };
		const headers = filecsv.slice(0, filecsv.indexOf(_newline)).split(_delimiter);
		const rows = filecsv.slice(filecsv.indexOf(_newline) + 1).split(_newline);

		const arr = rows.map(function (row) {
			const values = row.split(_delimiter);
			const el = headers.reduce(function (object, header, index) {
				object[header] = values[index];
				return object;
			}, {});

			return el;
		});

		const countsRows = Object.keys(arr).length;
		if (countsRows > 0){
			result.CountData = countsRows;
			result.CodError = 0;
			result.Data = arr;
		}
		return result;
	}

	const csvToJSON = () =>{
		const csv = fileInput.current.files[0];
		const reader = new FileReader();

		reader.onload = function (e) {
			const text = e.target.result;
			const data = csvToJson(text);
			//console.log(data)
			Swal.fire({
				text: 'Se Encontraron '+ data.CountData+' registros en el archivo CSV, ¿Desea Cargarlos?',
				showCancelButton: true,
				confirmButtonText: 'Cargar',
				showLoaderOnConfirm: true,
				cancelButtonText: 'Cancelar',
				preConfirm: () => {
					putDataCollectionAll('XCobrarCSV',data).then(d => {
						return d;
					})
				},
				allowOutsideClick: () => !Swal.isLoading()
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						title: 'Todos los Datos han guardados Satisfactoriamente!',
						icon:"success"
					})
				}
				if (result.isDismissed) {
					reader.abort();
				}
			})
		}
		reader.readAsText(csv);

	}

	return(
		<div className={CSVImport} onClick={customFile}>

			<Button color="primary" size="small" className={btnCarga} >
				<input
					ref={fileInput}
					className={csvInput}
					type="file"
					id={inputId}
					name={inputName}
					accept={accept}
					disabled={disabled}
					onChange={csvToJSON}
				/>
				<CloudUploadIcon /> <span className={lblCarga}>Cargar CSV</span>
			</Button>
		</div>
	)
}

export default CSVImport;