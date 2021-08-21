import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from "react-admin";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, protectedResources } from "./authConfig";

const httpClient = async (url, options = {}) => {
  const msalInstance = new PublicClientApplication(msalConfig);
  const accounts = msalInstance.getAllAccounts();
  const request = {
    scopes: [],
    account: accounts[0],
  };

  const authResult = await msalInstance.acquireTokenSilent(request);
  const token = authResult.accessToken;
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider(
  "https://jsonplaceholder.typicode.com",
  httpClient
);

export default dataProvider;
