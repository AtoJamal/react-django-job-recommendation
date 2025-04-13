import imageOne from '../../assets/image-1.jpg';
import imageTwo from '../../assets/image-2.jpg';

function Home() {

    return (
        <div className="home-main">
            <header className="home-header">
                <div className="brand-text"><h1>CareerPlus</h1></div>
                <div className="home-menu">
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Services</a>
                    <a href="">Login</a>
                    <a href=""><i className="fas fa-search"></i></a>
                    <a className="btn-1" href="">Register</a>
                </div>

            </header>
            <section className="home-sec-1">
                <div className="home-sec-1-head">
                    <div className="home-sec-1-head-1"></div>
                    <div className="home-sec-1-head-2"></div>
                </div>
                <div className="home-sec-1-body">
                    <div className="home-sec-1-body-1">
                        <div className="home-sec-1-body-1-1">
                            <h1>Find Your Dearm Job With AI-Powered Recommendations.</h1>
                            <p>AI-Driven Job Search: Faster, Smarter, Better!</p>
                            <button className="btn-2">About</button>
                        </div>

                    </div>
                    <div className="home-sec-1-body-2">
                        <img src={imageOne} alt="" />
                    </div>
                </div>
            </section>
            <section className="home-sec-2" >
                <div className="home-sec-2-head"></div>
                <div className="home-sec-2-body">
                    <div className="home-sec-2-body-1">
                        <img src={imageTwo} alt="" />
                    </div>
                    <div className="home-sec-2-body-2">
                        <div className="home-sec-2-body-2-1">
                            <h3>Career Plus</h3>
                            <p>Making job hunting smarter and faster.</p>
                            <h1>Smart Job Recommendations.</h1>
                            <p>Our AI-based job recommendation system intelligently matches job seekers with the best opportunities based on their skills, experience, and preferences.</p>

                            <div className="home-sec-2-body-2-1-search">
                                <input className="home-sec-2-body-2-1-search-input" type="text" placeholder="Search Jobs...." />
                                <button type="submit">
                                    <i className="fas fa-search"></i>
                                </button>

                            </div>

                            <button className="btn-2">About</button>



                        </div>
                    </div>
                </div>
            </section>
            <section className="home-sec-3"></section>
            <footer className="home-foot"></footer>
        </div>
    )

}
export default Home