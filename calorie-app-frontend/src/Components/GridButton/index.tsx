import { Component } from "react";

export class GridButton extends Component {
  constructor(props: any) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }

  btnClickedHandler() {
    (this.props as any).clicked((this.props as any).data);
  }

  render() {
    return (
      <button onClick={this.btnClickedHandler}>
        Edit/Delete
      </button>
    );
  }
}
