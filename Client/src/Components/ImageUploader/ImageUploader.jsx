import React, { useState, useEffect } from 'react'
import './ImageUploader.scss'
import ImageUploading from 'react-images-uploading';

const ImageUploader = ({setFormData}) => {
    const [images, setImages] = useState([]);
    let auxForm = new FormData();
    auxForm.append('upload_preset', 'products');

    useEffect(() => {   
        const images_ = JSON.parse(localStorage.getItem("images"));
        if (images_) {
            setImages(images_);
        }
    }, []);

    useEffect(() => {
        if(images.length > 0) {
            setFormData(auxForm);
        }
    }, [images]);

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
        localStorage.setItem("images", JSON.stringify(images));
    };

    return (
        <div className="uploader-container">
            <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, }) => (
                    <div className="uploader-wrapper">
                        <div className="actions">
                            <button className='uploader-space' style={isDragging ? { color: '#EF233C' } : undefined} onClick={onImageUpload} {...dragProps} type="file" name="file">
                                Arrastre y suelte las imágenes aquí para subirlas
                            </button>
                        </div>
                        <div className="images-container">
                            {
                                images.length == 0 ?
                                    <div className='information-message'>
                                        <figure>
                                            <img src="https://res.cloudinary.com/cabrera-evil/image/upload/v1669599268/prettygirl-api/default/box_bjknfp.png" alt="empty" />
                                        </figure>
                                        <p> Aún no tienes imágenes :/ </p>
                                    </div> :
                                    imageList.map((image, index) => (
                                        auxForm.append('file', image.file),
                                        auxForm.append('public_url', image.data_url),
                                        <div key={index} className="image-item">
                                            <figure>
                                                <img src={image.data_url} alt={image.file.name} width="100" />
                                            </figure>
                                            <div className="image-btn-wrapper">
                                                <button className='update' onClick={() => onImageUpdate(index)} type="file"><i className="fa-solid fa-pen-to-square"></i></button>
                                                <button className='delete' onClick={() => onImageRemove(index)}><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default ImageUploader