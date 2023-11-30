import styles from '/src/style.js';
import {Navbar, Footer, TentangKami, ImgText, TextImg} from '/src/components/shared/company_profile/index.js';
import app from '/src/assets/android.jpg';
import cs from '/src/assets/cs.png';
import jumbotron from '/src/assets/jumbotron_1.png';

export default function HomePage() {
  return (
    
    <div className = "bg-black w-full overflow-hidden">
        <div className = {`bg-cover bg-center h-screen ${styles.paddingX}`}
             style={{ backgroundImage: `url(${jumbotron})` }}>
            <Navbar color= "white"/>
            <h1 className = "font-poppins text-white text-8xl py-6 text-right font-bold">
                Isi Daya <br/>Ingat Bangga
            </h1>
            <h1 className = "font-poppins text-white text-md py-6 pt-36 tracking-wider text-right">
                Bergabunglah bersama kami dalam mengurangi <br/>jejak karbon Anda, satu pengisian sekaligus
            </h1>

        </div>

        <div className = {`bg-white ${styles.paddingX} ${styles.flexStart}`}>
            <div className = {`${styles.boxWidth}`}>
                <TentangKami 
                    targetUrl = "http://localhost:5173/tentang-kami"
                /> 
                <ImgText 
                    title="Charging Station"
                    paragraph="Stasiun Pengisian Kendaraan Listrik (EVCS) adalah kunci untuk masa depan yang lebih berkelanjutan. Temukan mengapa EVCS adalah solusi penting dalam mengurangi emisi karbon, menghemat biaya, dan memajukan transportasi berkelanjutan."
                    imgSrc={cs}
                    imgAlt="charging station"
                    showButton={true}
                    isSquare = {true}
                    targetUrl = "http://localhost:5173/produk"
                />
                <TextImg 
                    title="Aplikasi"
                    paragraph="Stasiun Pengisian Kendaraan Listrik (EVCS) adalah kunci untuk masa depan yang lebih berkelanjutan. Temukan mengapa EVCS adalah solusi penting dalam mengurangi emisi karbon, menghemat biaya, dan memajukan transportasi berkelanjutan."
                    imgSrc={app}
                    imgAlt="aplikasi"
                    showButton={true}
                    isSquare = {true}
                    targetUrl = "http://localhost:5173/aplikasi"
                />
            </div>
        </div>

        <Footer />
    </div>
  );
}
