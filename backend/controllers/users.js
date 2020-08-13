exports.login = (req, res) => {
  res.status(200).json({
    status: 'okay',
    message: 'This route is the login',
    accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
  });
};


exports.me = (req, res) => {
    let admin_user = {
      id: 1,
      username: "admin",
      password: "demo",
      email: "admin@demo.com",
      accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
      refreshToken: "access-token-f8c137a2c98743f48b643e71161d90aa",
      roles: [1], // Administrator
      pic: "/media/users/300_25.jpg",
      fullname: "Sean",
      occupation: "CEO",
      companyName: "Keenthemes",
      phone: "456669067890",
      address: {
        addressLine: "L-12-20 Vertex, Cybersquare",
        city: "San Francisco",
        state: "California",
        postCode: "45000"
      },
      socialNetworks: {
        linkedIn: "https://linkedin.com/admin",
        facebook: "https://facebook.com/admin",
        twitter: "https://twitter.com/admin",
        instagram: "https://instagram.com/admin"
      }
    };

  res.status(200).json({
    status: 'okay',
    message: 'This route is the login',
    user:admin_user,
    accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
  });
};











exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is the all Users route!'
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
