import * as React from "react";
import { Admin, Resource, ListGuesser, fetchUtils } from "react-admin";
import dataProvider from "./dataProvider";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} />
  </Admin>
);

export default App;
