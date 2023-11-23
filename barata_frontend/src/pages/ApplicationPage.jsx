import React from "react";
import top from '/src/assets/top.png'
import step1 from '/src/assets/step1.png'
import step2 from '/src/assets/step2.png'
import step3 from '/src/assets/step3.png'
import step4 from '/src/assets/step4.png'
import step5 from '/src/assets/step5.png'
import phone from '/src/assets/Rp.png'
import googlePlay from '/src/assets/google_play_logo.png'
import line from '/src/assets/line.png'
import { Navbar, Footer, Step, ImgText } from '/src/components/shared/company_profile/index.js';

const ApplicationPage = () => {
    return (
        <div className="bg-white w-full overflow-hidden gap-y-32">
            <div className="navbar px-16">
                <Navbar />
            </div>
            <div className="firstText bg-white flex flex-col gap-y-8 mt-[10px]">
                <h1 className="text-5xl font-poppins font-bold text-sky-900 text-center">Aplikasi Bangga</h1>
                <h1 className="text-base font-poppins text-center">
                    Bergabunglah bersama kami dalam mengurangi jejak karbon Anda, satu pengisian sekaligus.
                </h1>
                <img src={top} className="scale-125" />
            </div>
            <div className="stepPart1 bg-gradient-to-t from-yellow-400 flex flex-col gap-y-24 mt-[-120px]">
                <h1 className="text-6xl font-poppins font-bold text-center pb-[100px]">Bagaimana Aplikasi<br />Bangga Bekerja?</h1>
                <div className="line1 flex flex-row gap-x-1 justify-end">
                    <img src={line} className="w-[300px]"/>
                    <img src={line} className="w-[300px]" />
                    <img src={line} className="w-[300px]" />
                </div>

                <div className="flex flex-row gap-x-32 justify-center mt-[-200px]">
                    <Step
                        title="Cari Lokasi"
                        paragraph="Aplikasi Bangga telah terintegrasi dengan layanan Google Maps sehingga anda dapat dengan mudah mencari lokasi charging station terdekat dari tempat anda saat ini"
                        imgSrc={step1}
                        imgAlt="Cari Lokasi"
                        isSquare={true} />
                    <Step
                        title="Pesan"
                        paragraph="Aplikasi Bangga telah terintegrasi dengan layanan Google Maps sehingga anda dapat dengan mudah mencari lokasi charging station terdekat dari tempat anda saat ini"
                        imgSrc={step2}
                        imgAlt="Pesan"
                        isSquare={true} />
                    <Step
                        title="Bayar"
                        paragraph="Aplikasi Bangga telah terintegrasi dengan layanan Google Maps sehingga anda dapat dengan mudah menBayar charging station terdekat dari tempat anda saat ini"
                        imgSrc={step3}
                        imgAlt="Bayar"
                        isSquare={true} />
                </div>
            </div>
            <div className="stepPart2 bg-yellow-400 flex flex-col gap-y-48 pt-[150px] pb-[200px]">
                <div className="line1 w-[300px] flex flex-row gap-x-1 content-end">
                    <img src={line} className="" />
                    <img src={line} className="" />
                    <img src={line} className="" />
                </div>
                <div className="flex flex-row gap-x-32 justify-center mt-[-300px]">
                    <Step
                        title="Cari Lokasi"
                        paragraph="Aplikasi Bangga telah terintegrasi dengan layanan Google Maps sehingga anda dapat dengan mudah mencari lokasi charging station terdekat dari tempat anda saat ini"
                        imgSrc={step4}
                        imgAlt="Cari Lokasi"
                        isSquare={true} />
                    <Step
                        title="Pesan"
                        paragraph="Aplikasi Bangga telah terintegrasi dengan layanan Google Maps sehingga anda dapat dengan mudah mencari lokasi charging station terdekat dari tempat anda saat ini"
                        imgSrc={step5}
                        imgAlt="Pesan"
                        isSquare={true} />
                </div>
            </div>
            <div className="downloadPart bg-white rounded-[70px] mt-[-100px] flex flex-row pt-[10px]">
                <div className="self-center ml-[150px] flex flex-col gap-y-8">
                    <h1 className="text-6xl font-bold text-sky-900 text-left">Download <br /> Aplikasi</h1>
                    <h1 className="text-xl">Segera bergabung dengan kami, mari <br /> hijaukan negeri ini dengan Bangga</h1>
                    <img src={googlePlay} className="w-[200px] ml-[-15px]" />
                </div>
                <div className="phoneImg w-[700px] h-[700px] p-20">
                    <img src={phone} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ApplicationPage;
