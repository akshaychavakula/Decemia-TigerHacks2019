import React, { Component } from "react";
import { Document, Page, pdfjs} from "react-pdf";
import "./Display.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Display extends Component {
  // constructor(props) {
  //   super(props);
  // }

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
        <h1>{this.props.data.title}</h1>
        <Document
          file={this.props.data.data}
          onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
        >
          <div className="box"> 
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
          </div>
        </Document>
        
      </div>
    );
  }
}

export default Display;
