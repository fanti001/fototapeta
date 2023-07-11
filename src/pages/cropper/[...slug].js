import {Montserrat} from 'next/font/google'
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import styles from "@/styles/Home.module.css";
import cropStyles from '@/styles/Cropper.module.css';
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';
import Image from "next/image";
import axios from "axios";

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

function size2crop() {
	const wRatio = widthInput.value / maxPrintWidth;
	const hRatio = heightInput.value / maxPrintHeight;
	let widthKadr = widthThumb.value;
	let heightKadr = heightThumb.value;
	if (wRatio > hRatio) {
		heightKadr = (heightInput.value * widthThumb.value) / widthInput.value;
	} else {
		widthKadr = (widthInput.value * heightThumb.value) / heightInput.value;
	}
	widthKadr = parseInt(widthKadr, 10);
	heightKadr = parseInt(heightKadr, 10);

}

function Cropper({query}, props) {
	const router = useRouter();
	const [image, setImage] = useState(initialImage)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		// setImage(`http://localhost:8000/images/1200/${router.query.slug[2]}`);
		setLoading(true);
		axios({
			method: 'get',
			baseURL: 'https://localhost:8000/api',
			url: `/image/${router.query.slug}`,
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
	// Starting with a preselected crop:
	// console.log(image);

	const scale = image.orgWidth / image.thumbWidth;
	//max print
	const maxPrintWidth = parseInt(image.orgWidth, 10);
	const maxPrintHeight = parseInt(image.orgHeight, 10);

	const [crop, setCrop] = useState({
		unit: 'px',
		x: 0,
		y: 0,
		width: image.thumbWidth,
		height: image.thumbHeight,
	});

	const handleChange = (e) => {
		setCrop({
			...crop,
			[e.target.id]: parseInt(e.target.value, 10),
		})
		return crop;
	}

	return (
		<main className={`${cropStyles.main} ${monserrat.className}`}>
			<span className={`${cropStyles.title} ${monserrat.className}`}>Zdjęcie id = {image.id}</span>

			{loading ? 'Loading image...' :
				<ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
					< Image
						src={`http://localhost:8000/${image.thumbSrc}`}
						alt="test"
						width={image.thumbWidth}
						height={image.thumbHeight}
						className={props.className}
					/>
				</ReactCrop>
			}
			<form action="">
				<label htmlFor='width'>
					<span className={`${cropStyles.inputPrefix}`} >szerokość</span>
					<input
						className={`${cropStyles.inputWidth}`}
						type="text"
						id="width"
						name="width"
						onChange={handleChange}
						value={crop.width}
					/>
					<span className={`${cropStyles.inputSuffix}`} >cm</span>
				</label>
				<label htmlFor='height'>
					<span className={`${cropStyles.inputPrefix}`} >wysokość</span>
					<input
						className={`${cropStyles.inputHeight}`}
						type="text"
						id="height"
						name="height"
						onChange={handleChange}
						value={crop.height}
					/>
					<span className={`${cropStyles.inputSuffix}`} >cm</span>
				</label>
				<p>
					left: {crop.x} - top: {crop.y} wpx: {image.orgWidth}
				</p>
			</form>

		</main>
	);
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

export default Cropper;
