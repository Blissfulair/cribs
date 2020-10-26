import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayNames from './DayNames';
import Week from './Week';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './BookingCalendar.scss';

export default class BookingCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previousDisabled: this.props.disableHistory,
      month: props.selected.clone(),
      selected: props.selected,
    };
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  updatePreviousState() {
    if (this.props.disableHistory) {
      const previousDisabled = this.state.month.isSame(moment(), 'month') && this.state.month.isSame(moment(), 'year');
      this.setState({ previousDisabled });
    }
  }

  handlePrevious() {
    const { month } = this.state;
    month.subtract(1, 'M');
    this.setState({ month });
    this.updatePreviousState();
  }

  handleNext() {
    const { month } = this.state;
    month.add(1, 'M');
    this.setState({ month });
    this.updatePreviousState();
  }

  handleSelect(day) {
    if (this.props.clickable) {
      this.props.handleDayClick(day);
      this.setState({ selected: day.date });
    }
  }
  onChangeValue =(day)=> {
    this.props.onChangeValue(day.date._d)
    this.setState({ selected: day.date });
  }

  renderMonthLabel() {
    return (
      <span className='month-label'>
        {this.state.month.format('MMMM, YYYY')}
      </span>
    );
  }

  renderWeeks() {
    const weeks = [];
    let done = false;
    const date = this.state.month.clone().startOf('month').add('w' - 1).startOf('isoWeek');
    let monthIndex = date.month();
    let count = 0;

    while (!done) {
      weeks.push(<Week
        bookings={this.props.bookings}
        clickable={this.props.clickable}
        date={date.clone()}
        key={date.toString()}
        month={this.state.month}
        selected={this.state.selected}
        selectHandler={this.handleSelect}
        onChangeValue={this.onChangeValue}
      />);
      date.add(1, 'w');
      done = count > 2 && monthIndex !== date.month();
      count += 1;
      monthIndex = date.month();
    }

    return weeks;
  }

  render() {
    return (
      <div className='booking-calendar'>
        <div className='header'>
          <div className='header-content'>
            <button className='icon-previous' disabled={this.state.previousDisabled} onClick={this.handlePrevious}>
              <ArrowBackIcon/>
            </button>
            {this.renderMonthLabel()}
            <button className='icon-next' onClick={this.handleNext}>
                <ArrowForwardIcon/>
            </button>
          </div>
        </div>
        <div className="react-calendar-inner">
            <DayNames />
          {this.renderWeeks()}
        </div>
      </div>
    );
  }

}

BookingCalendar.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  clickable: PropTypes.bool,
  disableHistory: PropTypes.bool,
  selected: PropTypes.instanceOf(moment),
  handleDayClick: PropTypes.func,
  onChangeValue: PropTypes.func
};

BookingCalendar.defaultProps = {
  bookings: [],
  clickable: false,
  disableHistory: false,
  selected: moment().startOf('day'),
  handleDayClick: null,
  onChangeValue: null
};
