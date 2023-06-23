import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../../style/404.scss';

const Page404 = () => {
    return(
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                <h1>4<span>0</span>4</h1>
                </div>
                <h2>Oops! Page Not Be Found</h2>
                <p>Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable</p>
                <Link exact ="true" to="/">Back to homepage</Link>
            </div>
        </div>
    )
}

export default Page404;