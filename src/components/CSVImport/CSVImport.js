import React, {useRef} from 'react';
import './CSVImport.css';

const CSVImport = ({
			accept = '.csv, text/csv',
			inputId = 'fileInput',
			inputName = 'fileDoc',
			inputStyle = {},
			label,
			disabled = false,
			_newline = '\r\n',
			_delimiter = ';'
	}) => {

	const fileInput = useRef(null)
	const spanLabel = useRef(null)


	const customFile = () => {
		fileInput.current.click()
	}

	const csvToJson = (filecsv) => {
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

		return arr;
	}

	const csvToJSON = () =>{
		spanLabel.current.innerHTML = fileInput.current.files[0].name
		const csv = fileInput.current.files[0];
		const reader = new FileReader();

		reader.onload = function (e) {
			const text = e.target.result;
			const data = csvToJson(text);
			console.log(data)
		}
		reader.readAsText(csv);

	}

	return(
		<div className="CSVImport" onClick={customFile}>
			{label && (
				<label className='LabelInput' htmlFor={inputId}>
				{label}
				</label>
			)}
			<input
				ref={fileInput}
				className='fileInput'
				type="file"
				id={inputId}
				name={inputName}
				style={inputStyle}
				accept={accept}
				disabled={disabled}
				onChange={csvToJSON}
			/>
			<span ref={spanLabel}>Seleccionar</span>
		</div>
	)
}


export default CSVImport;