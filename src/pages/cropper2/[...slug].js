import React, {useEffect, useRef, useState} from 'react';
import {CropperRef, Cropper, ImageRestriction, RectangleStencil} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import {Montserrat} from 'next/font/google'
import styles from "@/styles/Home.module.css";
import axios from "axios";
import {useRouter} from "next/router";

const monserrat = Montserrat({subsets: ['latin']})
const initialImage = {
	baseURL: 'http://localhost:8000/1200',
	category: '/kitchen',
	id: 235436578,
	orgWidth: 4500,
	orgHeight: 3450,
	thumbWidth: 1200,
	thumbHeight: 456,
	thumbSrc: '',
}
function Cropper2() {
	const router = useRouter();
	const [loading, setLoading] = useState(false)
	const [image, setImage] = useState(initialImage);
	const [coords, setCoords] = useState([
		{
			width: 1000,
			height: 2100,
			left: 0,
			top: 0,
		}
	]);
	const cropperRef = useRef(null);
	const resize = (width, height, left, top) => {
		if (cropperRef.current) {
			cropperRef.current.setCoordinates({
				width: width,
				height: height,
				left: left,
				top: top
			})
		}
	};

	const onChange = (cropper) => {
		setCoords(
			{
				width:	cropper.getCoordinates().width,
				height:	cropper.getCoordinates().height,
				left:	cropper.getCoordinates().left,
				top:	cropper.getCoordinates().top
			}
		)
	};

	useEffect(() => {
		// setImage(`http://localhost:8000/images/1200/${router.query.slug[2]}`);
		setLoading(true);
		axios({
			method: 'get',
			baseURL: 'https://localhost:8000',
			url: `/api/image/${router.query.slug}`,
			responseType: 'json',
		})
			.then(({data}) => setImage(data))
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				setLoading(false)
			});
	}, []);

	console.log(image);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Kliknięto mnie :)')
	}

	const handleInputChange = (e) => {
		console.log(e.target.name);
		setCoords({
				[e.target.name]: e.target.value,
			},
		)
		cropper.setCoordinates((coords ) => ({
			width: coords.width,
			height: coords.height,
			left: coords.left,
			top: coords.top}))
	};



	return (
		<main className={`${styles.main} ${monserrat.className}`}>
			<h1>Cropper advanced</h1>
			<Cropper
				// defaultCoordinates={defaultCoordinates}
				defaultCoordinates={coords}

				stencilComponent={RectangleStencil}
				// stencilComponent={CircleStencil}

				ref={cropperRef}
				stencilProps={{
					movable: true,
					resizable: true,
					lines: true,
					handlers: true,
					overlayClassName: 'overlay'
				}}
				backgroundWrapperProps={{
					scaleImage: false,
					moveImage: false,
				}}
				// defaultTransforms={defaultTransforms}
				imageRestriction={ImageRestriction.stencil}
				// src={`http://localhost:8000/${image.thumbSrc}`}
				src={`http://localhost:8000/images/1200/f-1.jpg`}
				onChange={onChange}
				className={`${styles.cropper}`}
				// className={'cropper'}
			/>
			<form onSubmit={handleSubmit}>
				<label htmlFor="width">Długość
					<input type={"number"} name="width" id="width" onChange={handleInputChange} value={coords.width}/>
				</label>
				<label htmlFor="height">Wysokość
					<input type={"number"} name="height" id="height" onChange={handleInputChange} value={coords.height}/>
				</label>
				<button>kup</button>
			</form>
			<div> left:{coords.left} top:{coords.top}</div>
		</main>
	)
}
export async function getServerSideProps(context) {
	const {query} = context;
	// Access the query parameters here as well
	// console.log(query);

	return {
		props: {
			query,
		},
	};
}
export default Cropper2;
