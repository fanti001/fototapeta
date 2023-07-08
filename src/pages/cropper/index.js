import {Montserrat} from 'next/font/google'
import React, {useEffect, useState} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from "next/image";
import styles from "@/styles/Home.module.css";

const monserrat = Montserrat({subsets: ['latin']})

function Cropper(props) {     // cropper

	const [image, setImage] = useState('');
	// Starting with a preselected crop:
	const [crop, setCrop] = useState({
		unit: 'px',
		x: 0,
		y: 50,
		width: 1200,
		height: 350,
	});

	const setCropBox = (c) => {
		setCrop(c);
	};
	useEffect(() => {
		setImage('http://localhost:8000/images/1200/f-1.jpg');
	// 	setLoading(true);
	// 	axios({
	// 		method: 'get',
	// 		baseURL: 'https://localhost:8000',
	// 		url: '/images/1200/f-14.jpg',
	// 		responseType: 'json',
	// 	})
	// 		.then(({data})=> setImages(data) )
	// 		.catch(function (error) {
	// 			// handle error
	// 			console.log(error);
	// 		})
	// 		.finally(function () {
	// 		setLoading(false)});
	}, []);
	return (
			<main className={`${styles.main} ${monserrat.className}`}>
				<h1>Cropper</h1>

				<ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
					< Image
						src={image}
						alt="test"
						width={1200}
						height={500}
						className={props.className}
					/>
				</ReactCrop>
				<h2>
				width: {crop.width} - height: {crop.height} {crop.unit}
				</h2>
				<h2>
					left: {crop.x} - top: {crop.y}
				</h2>
			</main>
	);
}

export default Cropper;
