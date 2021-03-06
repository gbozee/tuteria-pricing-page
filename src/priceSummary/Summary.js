import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { mapStateToProps } from '../sagas';
import styled from 'styled-components';

const secondStyle = StyleSheet.create({
    td: {
        paddingBottom: 10,
        lineHeight: 2.5,
    },
    summary_card: {
        fontSize: 16,
        width: '100%',
    },
    price: {

    },
    icon: {
        marginLeft: 3,
    },
});
const thirdStyle = StyleSheet.create({
    summary_card: {
        fontSize: 16,
        width: '100%',
        marginBottom: 10,
    },
    td: {
        fontSize: 24,
        lineHeight: '30px',
    },
    extra: {
        marginTop: '20px',
        color: '#757575',
    },
});

const A = styled.a`
&:hover{
    cursor: pointer;
}`
// const AStyle = StyleSheet.create({
//     main:{
//         ':hover':{
//             cursor: "pointer",
//         }
//     }
// })
// const A = props => <a className={css(AStyle.main)} {...props} />
class InviteCode extends React.Component {
    constructor() {
        super();
        this.state = {
            displayForm: false,
            code: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheckCode = () => {
            this.props.validateCode(this.state.code)
        }
    }
    onSubmit() {
        this.setState({ displayForm: !this.state.displayForm })
        
    }
    render() {
        const {referral:{amount}} = this.props;
        return (
            <tr className={css(secondStyle.td) }>
                <td>
                    {amount ?
                        <span>Referral Discount</span> :
                        <div>
                            {!this.state.displayForm ?
                                <A onClick={this.onSubmit}>Referral Code</A> :
                                <div className="input-group">
                                    <input onBlur={e=> this.setState({code: e.target.value})} 
                                    type="text" className="form-control" placeholder="Invite Code" />
                                    <span className="input-group-btn">
                                        <button onClick={this.onCheckCode}  className="btn btn-default" type="button">Apply Code!</button>
                                    </span>
                                </div>    }
                        </div>} 
                </td>
                {amount? <td className="text-right price-item__price">{`- ₦${amount}`}</td>: null}
            </tr>


        )
    }
}

let SecondSection = ({ display = false,referral, summary, totalPrice, validateCode, display2,isFetching }) => (
    <div className={`panel-body hide-sm ${display ? '' : 'hidden-xs'}`}>
        <table className={css(secondStyle.summary_card) }>
            <tbody>
                <tr className={css(secondStyle.td) }>
                    <td >{summary} </td >
                    <td className="text-right price-item__price">
                        <div className="">{totalPrice}</div >
                    </td >
                </tr>
                <tr className={css(secondStyle.td) }>
                    <td> Service fee (one-time)
                        
                    </td >
                    <td className="text-right price-item__price">₦2500</td >
                </tr >
                {display2 && !isFetching ? <InviteCode {...{validateCode, referral}} />: null}

            </tbody >
        </table >
    </div >
);
SecondSection.propTypes = {
    display: PropTypes.bool,
    summary: PropTypes.string,
    totalPrice: PropTypes.string,
    validateCode: PropTypes.func,
};

let ThirdSection = ({ actualPrice, processingFee = 2500 }) => (
    <div className="panel-body hide-sm">
        <div className="sidebar-text-large space-2">
            <table className={css(thirdStyle.summary_card) }>
                <tbody>
                    <tr className={`font-head blue-font ${css(thirdStyle.td)} `}>
                        <td> Total &nbsp; </td >
                        <td className="text-right price-item__price">
                            <div className="">{`₦${actualPrice}`}
                            </div >
                        </td >
                    </tr >
                </tbody >
            </table >
        </div >
    </div >
);
ThirdSection.propTypes = {
    actualPrice: PropTypes.number,
    processingFee: PropTypes.number,
};
SecondSection = connect(mapStateToProps, null)(SecondSection);
ThirdSection = connect(mapStateToProps, null)(ThirdSection);

const MobileAffix = ({ mobile, action, price,referral, processingFee, validateCode, display, isFetching }) => (
    <div>
        {mobile ?
            <div>
                    <SecondSection display={action}  {...{
                        price,
                        display2:display,
                        validateCode,
                        isFetching,
                        referral
                    }}/>
                    <hr style={{ marginTop: 0 }} />
                    <ThirdSection mobile={action}  price={price} />
                </div>
            :
            <div>
                <SecondSection display={action}  {...{
                    price,validateCode,display2:display,isFetching
                }} />
                <hr style={{ marginTop: 0 }} />
                <ThirdSection mobile={action} price={price} />
            </div> }
    </div>
);
export default MobileAffix;
