import {Montserrat} from 'next/font/google'
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
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
	orgWidth: 3500,
	orgHeight: 3450,
	thumbWidth: 1200,
	thumbHeight: 456,
	thumbSrc: 'image/1200/',
}

function Cropper({query}, props) {
	const router = useRouter();
	const [image, setImage] = useState(initialImage)
	const [loading, setLoading] = useState(false)
	const [proportion, setProportion] = useState({
	proportion: parseInt(image.orgWidth / image.thumbWidth, 10),
})
	useEffect(() => {
		// setImage(`http://localhost:8000/images/1200/${router.query.slug[2]}`);
		setLoading(true);
		axios({
			method: 'get',
			baseURL: 'https://localhost:8000/api',
			url: `/image/${router.query.slug}`,
			responseType: 'json',
		})
			.then(({data}) => {
				setImage(data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				setProportion({
					proportion: parseInt(image.orgWidth / image.thumbWidth, 10),
				})
				setLoading(false)
			});
	}, []);

	//wymiar tapety, na starcie max wymiary w cm
	const [dimensions, setDimensions] = useState({
		width: 250,
		height: 50,
	})
	// kadr w px, na starcie max.
	const [crop, setCrop] = useState({
		unit: 'px',
		x: 0,
		y: 0,
		width: 1200,
		height: 240,
	});

	const handleChange = (e) => {
		switch (e.target.id) {
			case 'width':
				const width = e.target.value > parseInt(image.orgWidth / 12.5, 10) ? parseInt(image.orgWidth / 12.5, 10) : e.target.value;
				setDimensions({
					...dimensions,
					width: width,
				});

				setCrop({
					...crop,
					width: parseInt(width * 12.5 / proportion,10),
				});
				console.log(proportion, width * 12.5 * proportion);
				return crop;
			case 'height':
				const height = e.target.value > parseInt(image.orgHeight / 12.5, 10) ? parseInt(image.orgHeight / 12.5, 10) : e.target.value;
				setDimensions({
					...dimensions,
					height: height,
				});
				// setCrop({
				// 	...crop,
				// 	height: height * 12.5,
				// });
				return crop;

			default:
				return;
		}
	}

	return (
		<main className={`${cropStyles.main} ${monserrat.className}`}>
			<span className={`${cropStyles.title} ${monserrat.className}`}>Zdjęcie id = {image.id}</span>

			{loading ? 'Loading image...' :
<>
				<form action="">
					<label htmlFor='width'>
						<span className={`${cropStyles.inputPrefix}`}>szerokość</span>
						<input
							className={`${cropStyles.inputWidth}`}
							type="text"
							id="width"
							name="width"
							onChange={handleChange}
							value={dimensions.width}
						/>
						<span className={`${cropStyles.inputSuffix}`}>cm</span>
					</label>
					<label htmlFor='height'>
						<span className={`${cropStyles.inputPrefix}`}>wysokość</span>
						<input
							className={`${cropStyles.inputHeight}`}
							type="text"
							id="height"
							name="height"
							onChange={handleChange}
							value={dimensions.height}
						/>
						<span className={`${cropStyles.inputSuffix}`}>cm</span>
					</label>
				</form>

				<ReactCrop
				crop={crop}
				aspect={dimensions.width / dimensions.height}
				minWidth={300}
				minHeight={100}
				maxWidth={image.thumbWidth}
				maxHeight={image.thumbHeight}
				keepSelection={true}
				disabled={false}
				locked={false}
				ruleOfThirds={true}
				circularCrop={false}
				onChange={(c) => setCrop(c)}>
				< Image
				src={`http://localhost:8000/${image.thumbSrc}`}
				alt="test"
				width={image.thumbWidth}
				height={image.thumbHeight}
				className={props.className}
				/>
				</ReactCrop>
</>
			}


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
