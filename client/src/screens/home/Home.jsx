import Header from "../../components/header/Header";
import Nav from "../../components/nav/Nav";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedPropertyList from "../../components/featuredPropertyList/FeaturedPropertyList";
import "./home.css";
import MailingList from "../../components/mailingList/MailingList";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Nav />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h2>Browse by property type</h2>
        <PropertyList />
        <h2>Homes guests love</h2>
        <FeaturedPropertyList />
      </div>
      <MailingList />
      <Footer />
    </div>
  );
};

export default Home;
