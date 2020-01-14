import React from 'react';

const ModalFooter = ({ modalFunc, submitFunc }) => {
  return (
    <div className="modal-footer">
      <div>
        <button onClick={() => modalFunc()} type="button" className="btn btn-danger">Cancel</button>
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
};

export default ModalFooter;
