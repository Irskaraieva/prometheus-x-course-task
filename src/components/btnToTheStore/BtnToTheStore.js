import { Link } from "react-router-dom";
const BtnToTheStore = () => {
    return ( 
        <Link to='/book-list' className="back__to__store">
            <button type="submit" className="purchase__to__store">
            <span>Back to the store</span>
            </button>
        </Link>
     );
}
 
export default BtnToTheStore;