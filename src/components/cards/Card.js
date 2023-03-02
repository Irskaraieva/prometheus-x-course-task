import { Link } from "react-router-dom";

const Card = ({ id,  title, img, author, price}) => {
    
    let shortTitle = title;
    if (title.length > 24) {
      shortTitle = title.slice(0, 24) + '...';
    }

    return ( 
        <div className="single__card">
            <img src={img} alt ="" width="300px" className="figure__img__card" />
            <section className="card__content">
                <h3 className="book__name__list">{shortTitle}</h3>
                <span className="book__author" id="book__author">{author}</span>
            </section>
            <section className="prise__view">
                <span className="prise__content">{price} $</span>
                <Link to={`/specific-book/${id-1}`} className="single__card__link">
                <button type="submit" className="view_btn">View</button>
                </Link>
            </section>
        </div>    
     );
}
 
export default Card;