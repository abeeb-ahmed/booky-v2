import "./mailingList.css";

const MailingList = () => {
  return (
    <div className="mailingList">
      <div className="mailingListContainer">
        <h1>Save time, save money!</h1>
        <p>Sign up and we'll send the best deals to you</p>
        <div className="mailingListSubscribe">
          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default MailingList;
