import {Montserrat} from 'next/font/google'
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import styles from "@/styles/Home.module.css";
import ReactCrop from "react-image-crop";
import Image from "next/image";

const monserrat = Montserrat({subsets: ['latin']})

function Cropper(props) {
	const router = useRouter();
	const image = `http://localhost:8000/images/1200/${router.query.slug[2]}`;

	// Starting with a preselected crop:
	const [crop, setCrop] = useState({
		unit: 'px',
		x: 0,
		y: 50,
		width: 1000,
		height: 350,
	});

	const setCropBox = (c) => {
		setCrop(c);
	};

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

