import auth0 from "../../lib/Auth0";

const logout = async (request, response) => {
  await auth0.handleLogout(request, response);
};

export default logout;
