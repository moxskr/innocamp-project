import React from 'react';
import ModalHeader from '../components/Modal/ModalHeader';
import ModalForm from '../components/Modal/ModalForm';
import ModalFooter from '../components/Modal/ModalFooter';
import { validate, validateFile } from '../utils/validate';
import { getId } from '../utils/api';

const modalStyle = {
  position: 'fixed',
  zIndex: 100,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    const editItem = props.editId !== null ? props.todoList.filter(item => item.id === props.editId)[0] : null;
    if (!!editItem) {
      this.state = {
        title: editItem.title,
        description: editItem.description,
        priority: editItem.priority,
        deadline: editItem.deadline,
        currentTagList: editItem.currentTagList,
        file: editItem.file,
        titleError: '',
        priorityError: '',
        fileTypeError: '',
        fileSizeError: '',
      };
    } else {
      this.state = {
        title: '',
        description: '',
        priority: '',
        deadline: '',
        file: '',
        currentTagList: [],
        titleError: '',
        priorityError: '',
        fileTypeError: '',
        fileSizeError: '',
      };
    }
  }

  handleChange = (e) => {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value
    });
  };

  handleTagChange = (newVal) => {
    const tag = newVal;
    if (this.state.currentTagList.includes(tag) || tag === undefined) {
      return;
    }
    this.setState((prevState) => {
      return {
        currentTagList: [...prevState.currentTagList, tag],
      };
    });
  };

  handleDeleteTag = (tag) => {
    this.setState((prevState) => {
      return {
        currentTagList: prevState.currentTagList.filter(item => item !== tag)
      };
    });
  };

  handleFileChange = (files) => {
    this.setState({
      fileTypeError: '',
      fileSizeError: ''
    });


    if (files.length !== 0) {
      const file = files[0];
      const { isError, errors } = validateFile(file);
      if (!isError) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let fileAsString = e.target.result;
          this.setState({
            file: fileAsString
          });
        };
        reader.readAsDataURL(file);

      } else {
        this.setState({
          fileTypeError: errors.fileType,
          fileSizeError: errors.fileSize
        });
      }
    } else {
      this.setState({
        file: ''
      });
    }
  };
  handleDeleteFile = () => {
    this.setState({
      file: ''
    });
  };

  handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleDragDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;

    this.handleFileChange(files);
  };

  submit = (e) => {
    const { editFunc, addFunc, modalFunc } = this.props;
    e.preventDefault();
    const { title, description, priority, deadline, currentTagList, file } = this.state;
    const { isError, errors } = validate(title, priority);

    if (!isError) {
      if (this.props.editId !== null) {
        editFunc({
          title,
          description,
          priority,
          deadline,
          currentTagList,
          file,
          id: this.props.editId,
        });
      } else {
        addFunc({
          title,
          description,
          priority,
          deadline,
          currentTagList,
          file,
          id: getId(),
          done: false
        });
      }
      modalFunc();
    } else {
      this.setState({
        titleError: errors.title,
        priorityError: errors.priority
      });
    }
  };

  render() {
    const { title, description, priority, titleError, priorityError, deadline, currentTagList, file, fileTypeError, fileSizeError } = this.state;
    const { modalFunc, tagList } = this.props;
    return (
      <div style={modalStyle} className="modal" onClick={modalFunc}>
        <div className="modal-container bg-white py-1 px-lg-4 col-md-9 col-lg-7 m-2 " style={{    overflow: 'auto',
          maxHeight: '100vh'}} onClick={(e) => {e.stopPropagation();}}>
          <form onSubmit={this.submit}>
            <ModalHeader
              modalFunc={modalFunc}
            />
            <ModalForm
              tagList={tagList}
              changeFunc={this.handleChange}
              changeTagFunc={this.handleTagChange}
              deleteTagFunc={this.handleDeleteTag}
              changeFileFunc={this.handleFileChange}
              deleteFileFunc={this.handleDeleteFile}
              dragEnterFunc={this.handleDragEnter}
              dragOverFunc={this.handleDragOver}
              dragDropFunc={this.handleDragDrop}
              formInputs={{
                title,
                description,
                priority,
                deadline,
                currentTagList,
                file,
              }}
              errors={{
                title: titleError,
                priority: priorityError,
                fileType: fileTypeError,
                fileSize: fileSizeError,
              }}
            />
            <ModalFooter
              modalFunc={modalFunc}
              submitFunc={this.submit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
