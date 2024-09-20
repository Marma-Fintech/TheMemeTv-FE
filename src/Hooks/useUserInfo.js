import { UserInfoContext } from "../Providers/theData";
import React from "react";

export default function () {
  const userData = React.useContext(UserInfoContext);
  return userData;
}
