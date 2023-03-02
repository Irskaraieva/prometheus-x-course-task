const SinglePursheBook = ({ count,  title, img, price, totalPrice}) => {

let shortTitle = title;
if (title.length > 24) {
  shortTitle = title.slice(0, 24) + '...';
}

return ( 
    <>
      <img src={img} alt ="" className="image__book__pur" />
      <span className="book__name__pur">{shortTitle}</span>
      <span className="count__pur">{count} x {price}</span>
      <span className="single__price__pur">{totalPrice}</span>
    </>        
  );
}
 
export default SinglePursheBook;