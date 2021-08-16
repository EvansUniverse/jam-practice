module.exports = {
  secret: "evans-secret-key", // TODO get this from env var or something

  // How long auth tokens will be valid for
  tokenExpiration: 36200, // 12 hours

  // Credentials for the default admin user that is inserted into the db 
  // upon startup.
  defaultAdminUsername: "admin",
  defaultAdminPassword: "admin",
  defaultAdminEmail: "admin@admin.admin",
};
  