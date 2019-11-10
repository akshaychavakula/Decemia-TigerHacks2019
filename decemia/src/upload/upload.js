import React, { Component } from "react";
import "./upload.css";
import Dropzone from "../dropzone/Dropzone";
import Progress from "../progress/Progress";
import { UserSession, AppConfig } from "blockstack";
const MD5 = require("crypto-js/md5");
const blockstack = require("blockstack");

class upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      hash: ""
    };

    const appConfig = new AppConfig(["store_write", "publish_data"]);
    this.userSession = new UserSession({ appConfig });

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.writeMD5 = this.writeMD5.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFiles = async () => {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  };

  sendRequest = file => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };

          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);
      this.uploadFile(file).bind(this);
    });
  };

  uploadFile = file => {
    let originalFile = file;
    //Check File is not Empty

    // Select the very first file from list
    let fileToLoad = file;
    // FileReader function for read the file.
    let fileReader = new FileReader();
    // Onload of file read the file content
    fileReader.onload = function(fileLoadedEvent) {
      file = fileLoadedEvent.target.result;
      // Print data in console
      console.log(file);
      console.log(originalFile.name);
      //this.uploadToChain(file);
      const options = {
        encrypt: false
      };

      var payload = {
        data: file,
        title: originalFile.name,
        approvals: []
      };

      var hash1 = MD5(file);

      blockstack
        .putFile(originalFile.name + ".json", JSON.stringify(payload), options)
        .then(results => {
          console.log(results);
          window.location.href = "/dashboard?id=" + hash1;
        })
        .finally(() => {
          console.log("Finally");
        });
    };
    // Convert data to base64
    fileReader.readAsDataURL(fileToLoad);
  };

  writeMD5 = data => {
    this.setState({
      hash: data
    });
  };

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        {this.state.hash.length > 0 ? (
          <h2>Success</h2>
        ) : (
          <div className="Content">
            <div>
              <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={
                  this.state.uploading || this.state.successfullUploaded
                }
              />
            </div>
            <div className="Files">
              {this.state.files.map(file => {
                return (
                  <div key={file.name} className="Row">
                    <span className="Filename">{file.name}</span>
                    {this.renderProgress(file)}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default upload;
