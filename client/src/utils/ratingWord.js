const ratingWord = (rating) => {
  if (rating < 1) {
    return "Very Poor";
  } else if (rating >= 1 && rating < 2) {
    return "Poor";
  } else if (rating >= 2.5 && rating < 3) {
    return "Good";
  } else if (rating >= 3 && rating < 4.5) {
    return "VeryGood";
  } else if (rating >= 4.5) {
    return "Excellent";
  }
};

export default ratingWord;
