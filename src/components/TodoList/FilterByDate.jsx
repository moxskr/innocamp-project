import React, { Component } from 'react';

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

class FilterByDate extends Component {
  render() {
    return (
      <div className="btn-group col-md-auto px-0 px-md-3 pt-2 pt-md-0" role="group"
           aria-label="Basic example">
        <button type="button" className="btn btn-secondary"
                onClick={() => this.props.handleFilterByDate('')}>All
        </button>
        <button type="button" className="btn btn-secondary"
                onClick={() => this.props.handleFilterByDate(new Date())}>Today
        </button>
        <button type="button" className="btn btn-secondary"
                onClick={() => this.props.handleFilterByDate(new Date().addDays(2))}>3 Days
        </button>
        <button type="button" className="btn btn-secondary"
                onClick={() => this.props.handleFilterByDate(new Date().addDays(6))}>Week
        </button>
      </div>
    );
  }
}

export default FilterByDate;
