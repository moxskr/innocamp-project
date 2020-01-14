import React from 'react';
import Tag from '../Tag';

const ModalForm = ({ formInputs, changeFunc, errors, deleteTagFunc, tagList, changeTagFunc, changeFileFunc, deleteFileFunc, dragEnterFunc, dragOverFunc, dragDropFunc }) => {
  return (
    <div className="modal-form m-4">

      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Title*</span>
        </div>
        <input
          maxLength="20"
          className="form-control"
          type="text"
          value={formInputs.title}
          name="title"
          onChange={changeFunc}
          required
        />
      </div>
      {errors.title.length !== 0 && <span className="text-danger">{errors.title}</span>}

      <textarea
        className="form-control mt-2"
        value={formInputs.description}
        name="description"
        onChange={changeFunc}
        placeholder="Description..."
        rows="2"
      />

      <div className="form-row">
        <div className="col-md">
          <div className="input-group mt-2">
            <div className="input-group-prepend">
              <span className="input-group-text">Priority*</span>
            </div>
            <select className="form-control" name="priority" value={formInputs.priority}
                    onChange={changeFunc}>
              <option value="">Select priority</option>
              <option value="low">low</option>
              <option value="middle">middle</option>
              <option value="high">high</option>
            </select>
          </div>
          {errors.priority.length !== 0 && <span className="text-danger">{errors.priority}</span>}
        </div>
        <div className="col-md">
          <div className="input-group mt-2">
            <input
              className="form-control"
              type="date"
              value={formInputs.deadline}
              name="deadline"
              onChange={changeFunc}
            />
          </div>
        </div>
      </div>

      <div className="shadow-sm mt-3">
        <button type="button" className="btn btn-light dropdown-toggle btn-block"
                data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
          Add search tag
        </button>
        <div className="dropdown-menu">
          {tagList.filter(tag => !formInputs.currentTagList.includes(tag))
            .map((tag) => {
              return (
                <a onClick={() => changeTagFunc(tag)} className="dropdown-item"
                   key={tag}>#{tag}</a>
              );
            })}
        </div>
        <div className='tagList px-3 py-2'>
          <span>
            Tags:
            {formInputs.currentTagList.map((tag) => {
              return (
                <Tag key={tag} tag={tag} deleteFunc={() => deleteTagFunc(tag)}/>
              );
            })}
          </span>
        </div>
      </div>
      <div className="shadow-sm p-3 mt-3" onDragEnter={dragEnterFunc} onDragOver={dragOverFunc} onDrop={dragDropFunc}>
        {formInputs.file === '' &&
        <>
          <div>
            You can drag and drop file here.
          </div>
          <br/>
          <div className="custom-file">
            <input accept="image/*" type="file" className="custom-file-input"
                   onChange={(e) => changeFileFunc(e.target.files)}/>
            <label className="custom-file-label">Choose file</label>
          </div>

          {errors.fileType.length !== 0 &&
          <span className="errors text-danger">{errors.fileType}</span>}
          <br/>
          {errors.fileSize.length !== 0 &&
          <span className="errors text-danger">{errors.fileSize}</span>}
        </>}

        {formInputs.file !== '' &&
        <>
          <p>Attached image:</p>
          <img src={formInputs.file} alt="nice image" style={{
            height: 50,
            paddingRight: 5
          }}/>
          <button onClick={deleteFileFunc} type="button" className="btn btn-danger">Delete image
          </button>
        </>}
      </div>
    </div>
  );
};

export default ModalForm;

