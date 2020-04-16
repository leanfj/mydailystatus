import auth0 from "../../lib/Auth0";

const callback = async (request, response) => {
  await auth0.handleCallback(request, response, { redirectTo: "/app" });
};

export default callback;
