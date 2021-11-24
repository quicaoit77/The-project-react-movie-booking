import React from "react";
import "./DeleteUserStyle.scss";
export default function DeleteUserComponent(props) {
  const { userDelete } = props;
  //   console.log("userDelete", userDelete);
  return (
    <div className="deleteUser">
      <div className="deleteUser__content">
        <h4>Info User</h4>
        <table className="table">
          <thead>
            <tr>
              <th>UserName</th>
              <th>FullName</th>
              <th>Email</th>
              <th>TypeUser</th>
              <th>PhoneNumber</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userDelete.userName}</td>
              <td>{userDelete.fullName}</td>
              <td>{userDelete.email}</td>
              <td>{userDelete.typeUser}</td>
              <td>{userDelete.phoneNumber}</td>
              <td>{userDelete.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="deleteUser__contentMobi">
        <h4>Info User</h4>
        <table className="table">
          <tbody>
            <tr>
              <td>UserName</td>
              <td>{userDelete.userName}</td>
            </tr>
            <tr>
              <td>FullName</td>
              <td>{userDelete.fullName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{userDelete.email}</td>
            </tr>
            <tr>
              <td>TypeUser</td>
              <td>{userDelete.typeUser}</td>
            </tr>
            <tr>
              <td>PhoneNumber</td>
              <td>{userDelete.phoneNumber}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{userDelete.password}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
