import React, { Component } from 'react';
import toastr from 'toastr';
import loginStore from './stores/loginStore';
import oraganizationStore from './stores/oraganizationStore';
import adminStore from './stores/adminStore';
let month_names = ["Jan", "Feb", "Mar",
  "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec"];
export default class CommonFunctions extends Component {

  static validateEmail(email) {
    var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var valid = tester.test(email);
    toastr.options.positionClass = 'toast-top-center';
    if (valid === false)
      toastr.error("Please enter your login credentials correctly.");
    return valid;
  }
  static validateNumber(value, fieldName) {
    var tester = /^[0-9\b]+$/;
    var valid = tester.test(value);
    if (valid === false)
      toastr.error(fieldName + "You must enter a numeric value.");
    return valid;
  }
  static checkPhoneNumber(value) {
    if (value.length > 10)
      return false;
    var tester = /^[0-9\b]+$/;
    return tester.test(value);
  }
  static validatePhoneNumber(value) {
    var tester = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return tester.test(value);
  }
  static validPassword(value) {
    var tester = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return tester.test(value);
  }
  static getEncryptAccountNo(accountnumber) {
    if (typeof accountnumber !== "undefined") {
      {/*return new Array(accountnumber.length - 9)
        .join('x')
        + accountnumber.substr(0); */}
    }
    return accountnumber;

  }
  static getEncryptRoutingNo(routingnumber) {
    if (typeof routingnumber !== "undefined") {
      {/*return new Array(routingnumber.length - 9)
        .join('x')
        + routingnumber.substr(routingnumber.length - 4, 4); */}
    }
    return routingnumber;

  }
  static validateAccountNumber(value) {
    if (this.validateNumber(value, "Account Number")) {

      if ((value.length > 7 && value.length < 18) === false) {
        toastr.error('Account number should be minimum of 8 characters and maximum of 17 characters.');
        return false;
      }
      return true;
    }
    else {
      return false;
    }
  }
  static validateRoutingNumber(value) {
    if (this.validateNumber(value, "Routing Number")) {
      if (value.length !== 9) {
        toastr.error('Routing number should be 9 characters.');
        return false;
      }
      return true;
    }
    else {
      return false;
    }
  }
  static getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  static getPaginationOptions() {
    return [
      { key: '5', value: '5', text: 'View 5 at a time' },
      { key: '10', value: '10', text: 'View 10 at a time' },
      { key: '15', value: '15', text: 'View 15 at a time' },
      { key: '20', value: '20', text: 'View 20 at a time' },
      { key: '0', value: '0', text: 'View All at a time' }
    ];
  }
  static getSortByOptions() {
    return [
      { key: '1', value: 'name', text: 'name' }
    ]
  }
  static getUserTypeOptions(){
    return[
      {key:'1',value:'user',text:'User'},
      {key:'2',value:'admin',text:'Admin'}
    ]
  }
  static getUserName() {
    return loginStore.getDbUser().firstName + ' ' + loginStore.getDbUser().lastName;
  }
  static getOrgName() {
    return adminStore.getOraganization().name;
  }
  static getFormatedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    const hour = String(d.getHours());
    const min = String(d.getMinutes());
    const sec = String(d.getSeconds());
    //if (month.length < 2) month = '0' + month;
    //if (day.length < 2) day = '0' + day;
    month = month_names[month];
    return `${day}/${month}/${year} ${hour}:${min}:${sec}`;
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}