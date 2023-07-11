import {Montserrat} from 'next/font/google'
import {useRouter} from 'next/router';
import React, {useEffect, useRef, useState} from 'react';
import styles from "@/styles/Home.module.css";
import cropStyles from '@/styles/Cropper.module.css';
import 'react-image-crop/dist/ReactCrop.css';
import Image from "next/image";
import axios from "axios";
import {useDebounceEffect} from "@/pages/cropp/useDebounceEffect";
import ReactCrop, {
	centerCrop,
	makeAspectCrop,
	Crop,
	PixelCrop,
} from 'react-image-crop'
import {canvasPreview} from './canvasPreview'

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

function centerAspectCrop(
	mediaWidth,
	mediaHeight,
	aspect,
) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: '%',
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight,
		),
		mediaWidth,
		mediaHeight,
	)
}

function Cropp({query}, props) {
	const [imgSrc, setImgSrc] = useState('')
	const previewCanvasRef = useRef(null)
	const imgRef = useRef(null)
	const hiddenAnchorRef = useRef(null)
	const blobUrlRef = useRef('')
	const [crop, setCrop] = useState()
	const [completedCrop, setCompletedCrop] = useState()
	const [scale, setScale] = useState(1)
	const [rotate, setRotate] = useState(0)
	const [aspect, setAspect] = useState(16 / 9)

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

	function onSelectFile(e) {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined) // Makes crop preview update between images.
			const reader = new FileReader()
			reader.addEventListener('load', () =>
				setImgSrc(reader.result?.toString() || ''),
			)
			reader.readAsDataURL(e.target.files[0])
		}
	}

	function onImageLoad(e) {
		if (aspect) {
			const {width, height} = e.currentTarget
			setCrop(centerAspectCrop(width, height, aspect))
		}
	}

	function onDownloadCropClick() {
		if (!previewCanvasRef.current) {
			throw new Error('Crop canvas does not exist')
		}

		previewCanvasRef.current.toBlob((blob) => {
			if (!blob) {
				throw new Error('Failed to create blob')
			}
			if (blobUrlRef.current) {
				URL.revokeObjectURL(blobUrlRef.current)
			}
			blobUrlRef.current = URL.createObjectURL(blob)
			hiddenAnchorRef.current.href = blobUrlRef.current
			hiddenAnchorRef.current.click()
		})
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&	completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					scale,
					rotate,
				)
			}
		},
		100,
		[completedCrop, scale, rotate],
	)

	function handleToggleAspectClick() {
		if (aspect) {
			setAspect(undefined)
		} else if (imgRef.current) {
			const {width, height} = imgRef.current
			setAspect(16 / 9)
			setCrop(centerAspectCrop(width, height, 16 / 9))
		}
	}

	return (
		<main className={`${cropStyles.main} ${monserrat.className}`}>
			<span className={`${cropStyles.title} ${monserrat.className}`}>Zdjęcie id = {image.id}</span>

			<ReactCrop
				crop={crop}
				onChange={(percentCrop) => setCrop(percentCrop)}
				onComplete={(c) => setCompletedCrop(c)}
				aspect={aspect}
			>
				<img
					ref={imgRef}
					alt="Crop me"
					src={imgSrc}
					style={{transform: `scale(${scale}) rotate(${rotate}deg)`}}
					onLoad={onImageLoad}
				/>
			</ReactCrop>
			<canvas
				ref={previewCanvasRef}
				style={{
					border: '1px solid black',
					objectFit: 'contain',
					width: completedCrop.width,
					height: completedCrop.height,
				}}
			/>
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

export default Cropp;
