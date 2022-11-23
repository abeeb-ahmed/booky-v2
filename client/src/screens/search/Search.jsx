import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailingList from "../../components/mailingList/MailingList";
import Nav from "../../components/nav/Nav";
import SearchItem from "../../components/searchItem/SearchItem";

import "./search.scss";

const Search = () => {
  const { state } = useLocation();
  return (
    <div>
      <Nav />
      <Header />
      <div className="searchPageContainer">
        {state.map((item) => (
          <SearchItem data={item} key={item._id} removeBtn />
        ))}
      </div>
      <MailingList />
      <Footer />
    </div>
  );
};

export default Search;
