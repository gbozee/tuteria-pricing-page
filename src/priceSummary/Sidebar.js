import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { range } from 'lodash';
import MobileAffix from './Summary';
import TutorSummary from './TutorSummary';
import ExtraInfo from './ExtraInfo';
import InitialFormSummary from './InitialFormSummary';
import {connect} from 'react-redux';

function toTitle(name) {
  return name.toLowerCase()
    .split(' ')
    .map(i => i[0].toUpperCase() + i.substring(1))
    .join(' ');
}
const styles = StyleSheet.create({
  background_cover: {
    backgroundImage: 'url(/static/img/user/mini/tuteria.jpg)',
    height: '140px',
    backgroundSize: 'cover',
    backgroundPosition: '30%',
  },
  summary_card: {
    marginBottom: 0,
    marginRight: '30px',
    // marginTop: '-25px',
    float: 'right',
  },
  media: {
    backfaceVisibility: 'hidden',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'bottom',
    overflow: 'hidden',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    border: '2px solid #fff',
  },
  img: {
    height: '60px',
    width: '60px',
  },
  mobile: {
    '@media(max-width: 768px)': {
      marginBottom: 0,
    },
  },
});

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      mobile: false,
    };
    this.onMobileClick = this.onMobileClick.bind(this);
  }
  onMobileClick() {
    this.setState({ mobile: !this.state.mobile });
  }
  render() {
    const { mobile = false, phone_number, urgency, subject, alt_text, image, rating, price, reviews, location, heading } = this.props;
    const rating_decimal = (parseFloat(rating) % 1) > 0.2;
    const r = range(Math.floor(parseFloat(rating)));
    return (
      <div className="summary-card col-center">
        {/* <div className={css(styles.background_cover) }></div>*/}
        <div className={css(styles.summary_card) } >
          <div className={css(styles.media) }>
          </div>
        </div>
        <div style={{ border: "1px solid #eeeeee" }} className={`panel ${css(styles.mobile)}`}>
          <TutorSummary {...{
            heading, rating_decimal, rating, reviews: r, location, first_name: alt_text
          }}
            />
          <MobileAffix mobile={mobile} action={this.state.mobile} price={price} />
          <div onClick={this.onMobileClick} className="visible-xs panel-body text-center">
            <a> View pricing and trip summary</a >
          </div>
        </div >
        <div style={{ marginBottom: 0 }} className="panel">
          <ExtraInfo the_class={`${this.state.mobile ? 'visible-xs' : 'hidden'}`} {...{
            phone_number
          }}/>
          <ExtraInfo the_class={`hidden-xs`} {...{
            phone_number
          }} />
        </div>
      </div>
    );
  }
}
Sidebar.propTypes = {
  alt_text: PropTypes.string,
  location: PropTypes.string,
  urgency: PropTypes.string,
  heading: PropTypes.string,
  mobile: PropTypes.bool,
  price: PropTypes.string,
};

const App = props =>
  <div className="row">
    <div className="hidden-xs">
      <div>
        <Sidebar {...props} />
      </div>
    </div>
    <div className="visible-xs">
      <Sidebar mobile {...props} />
    </div>
  </div>
const mapStateToProps = (state, ownProps) => {
  const selected = state.priceOptions.filter(x=>x.selected)[0]
  return {
    alt_text: `${selected.heading} Package`,
    price: selected.perHour,
    heading: `${state.subject ? state.subject : "Academic"} Lessons`,
    phone_number: "09094526878"
  }
}
export default connect(mapStateToProps)(App)