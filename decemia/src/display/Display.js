import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./Display.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Display extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    console.log("Data" + this.props.data.data);
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        {this.props.data.title}
        <Document
          file={this.props.data.data}
          onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    );
  }
}

export default Display;
