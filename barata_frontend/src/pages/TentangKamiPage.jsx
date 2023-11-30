import styles from '/src/style.js';
import {Navbar, Footer, TentangKami, ImgText, TextImg} from '/src/components/shared/company_profile/index.js';
import about_us_barata from '/src/assets/about_us_barata.jpg';
import about_us_unair from '/src/assets/about_us_unair.jpg';
import jumbotron from '/src/assets/jumbotron_2.jpeg';

export default function TentangKamiPage() {
  return (
    
    <div className = "bg-black w-full overflow-hidden">
        <div className = {`bg-cover bg-center h-screen ${styles.paddingX}`}
             style={{ backgroundImage: `url(${jumbotron})` }}>
            <Navbar color="black"/>
            <div className = "mt-[250px] bg-black bg-opacity-70 max-w-[800px]">
                <h1 className = "font-poppins text-white text-5xl py-6 text-left font-bold px-6 ">
                    Bangga Menjaga Lingkungan dengan Reusable Energy
                </h1>
            </div>
        </div>

        <div className = {`bg-white ${styles.paddingX} ${styles.flexStart}`}>
            <div className = {`${styles.boxWidth}`}>
                <TentangKami /> 
                <ImgText 
                    title="Universitas Airlangga"
                    paragraph="Universitas Airlangga ( UNAIR ) merupakan perguruan tinggi negeri yang terletak di Surabaya, Jawa Timur. 
                    Dengan visi menjadi universitas yang mandiri, inovatif, terkemuka di tingkat nasional dan internasional, pelopor pengembangan ilmu pengetahuan, teknologi, humaniora dan seni berdasarkan moral agama."
                    imgSrc={about_us_unair}
                    imgAlt="universitas airlangga"
                    showButton={false}
                    isSquare = {true}
                />
                <TextImg 
                    title="PT Barata Indonesia"
                    paragraph="PT Barata Indonesia (Persero) merupakan salah satu Badan Usaha Milik Negara (BUMN) dengan kepemilikan saham 100% oleh Pemerintah Republik Indonesia yang yang bergerak di bidang industri manufaktur guna mendukung sektor Food, Energy, dan Water."
                    imgSrc={about_us_barata}
                    imgAlt="barata indonesia"
                    showButton={false}
                    isSquare = {true}
                />
            </div>
        </div>

        <Footer />
    </div>
  );
}
