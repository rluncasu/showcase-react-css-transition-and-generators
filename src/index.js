import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { render } from "react-dom";
import "./main.css";

function* continuosArrayIterator(arr) {
  let idx = 0;
  while (idx < arr.length) {
    let ret = arr[idx];
    idx++;
    if (idx === arr.length) {
      idx = 0;
    }
    yield ret;
  }
}

class App extends Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.items = [
      {
        id: 1,
        text: "item1",
        img: "https://mirrors.creativecommons.org/presskit/icons/cc.large.png"
      },
      {
        id: 2,
        text: "item2",
        img: "https://mirrors.creativecommons.org/presskit/icons/by.large.png"
      },
      {
        id: 3,
        text: "item3",
        img: "https://mirrors.creativecommons.org/presskit/icons/nc.large.png"
      },
      {
        id: 4,
        text: "item4",
        img:
          "https://mirrors.creativecommons.org/presskit/icons/nc-eu.large.png"
      }
    ];
    this.imageIterator = continuosArrayIterator(this.items);
    this.state = {
      image: this.imageIterator.next().value
    };
  }

  clickHandler(event) {
    return this.setState({
      image: this.imageIterator.next().value
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>Next Image</button>
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionLeaveTimeout={500}
          transitionEnterTimeout={500}
          className="container"
          transitionName="example"
        >
          <div
            key={this.state.image.id}
            style={{
              position: "absolute",
              backgroundImage: `url(${this.state.image.img}`,
              backgroundSize: "auto 100px",
              height: "100px",
              width: "100px"
            }}
          />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
