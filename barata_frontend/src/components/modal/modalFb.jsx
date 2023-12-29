import React, { useEffect, useState } from "react";
import "./modal.css";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { imageFB } from '/src/firebase.jsx';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

export default function Modal(imgPath, custKey) {
    const [modal, setModal] = useState(false);
    const [imgUrl, setImgUrl] = useState([])

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    useEffect(() => {
        listAll(ref(imageFB, `proof-of-payment/${imgPath.custKey}`)).then(imgs => {
            imgs.items.forEach(val => {
                const newPath = val._location.path.split("/").slice(-1)[0]
                if (newPath == imgPath.imgPath){
                    getDownloadURL(val).then(url => {
                        setImgUrl(data => [...data, url])
                    })
                }
            })
        })
    }, [])

    return (
        <>
            <button onClick={toggleModal} className={`px-2 py-2 text-white text-sm bg-blue-900 rounded-lg hover:bg-black`}>
                See Details
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content flex flex-col gap-4">
                        <h2>Transaction proof</h2>
                        <button className="close-modal" onClick={toggleModal}>
                            <HiOutlineX />
                        </button>
                        <img src={imgUrl} className="h-[500px]"/>
                    </div>
                </div>
            )}
        </>
    );
}