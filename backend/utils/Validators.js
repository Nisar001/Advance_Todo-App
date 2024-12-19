exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.validateMobile = (mobile) => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};
