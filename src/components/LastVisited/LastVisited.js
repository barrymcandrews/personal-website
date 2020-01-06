import React, {Component} from "react";
import cookie from 'react-cookies'

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const now = new Date();
const day = days[now.getDay()];
const month = months[now.getMonth()];
const currentDateString = `${day} ${month} ${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;


export default class LastVisited extends Component {

  constructor() {
    super();
    let lastDate = cookie.load("lastDate");
    this.dateString = (lastDate != null) ? lastDate : "never";
    cookie.save("lastDate", currentDateString, {path: "/"});
  }


  render() {
    return (
        <code className="m-5">
          Last login: {this.dateString} on ttys000<br/>
          $ curl https://www.bmcandrews.com
        </code>
    );
  }
}

