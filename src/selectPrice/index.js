import React from "react";
import {
  Li,
  P,
  Span,
  Ul,
  Wrapper,
  H3,
  SelectDiv,
  Ol,
  Select,
  SelectBox,
  Div,
  Label,
  List,
} from "./components";
import { Provider } from "react-redux";
import store from "../store";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../sagas";
import { getFullDetails, noOfWeeksDisplay, getCssStyle } from "./details";

const Button = ({ selected, ...rest }) => (
  <button
    className={`btn ${
      selected ? "btn-primary" : "btn-tutor"
    } btn-lg col-xs-12 col-sm-8 col-sm-offset-2`}
    {...rest}
  />
);

const SinglePrice = ({
  heading,
  price,
  subject = null,
  weeks,
  selected,
  selectPrice,
}) => {
  const { description, portfolio } = getFullDetails(heading, subject);
  const duration = noOfWeeksDisplay(weeks);
  const newPrice = new Number(price);
  const classType = getCssStyle(heading);
  const onClick = () => {
    if (selected) {
      console.log("yes");
    } else {
      selectPrice(heading, true);
      window.$("html, body").animate(
        {
          scrollTop: window.$("#root").offset().top,
        },
        1000
      );
      // document.getElementById("root").scrollIntoView();
    }
  };
  return (
    <Li {...{ classType }}>
      <Wrapper>
        <H3>{heading}</H3>
        {classType === "two" && <Label>Most popular</Label>}
        <P>
          <Span country className="country">
            &#x20A6;{" "}
          </Span>
          <Span dollar dollarOrMonth className="dollars">
            {newPrice.toLocaleString()}
          </Span>
          <Span month dollarOrMonth className="month">
            {duration}
          </Span>
        </P>
        {/* {description} */}
        {/* <p className="blue-font font-head">PORTFOLIO</p> */}
        <Ul>
          {portfolio.map((p, index) => (
            <List key={index}>{p}</List>
          ))}
        </Ul>
        <SelectDiv>
          <Button
            selected={selected}
            {...{
              children: selected ? "Selected" : "Proceed",
              onClick,
            }}
          />
        </SelectDiv>
      </Wrapper>
    </Li>
  );
};

const SelectItem = ({
  options,
  heading,
  displayKey,
  plural,
  value = "",
  onChange,
}) => (
  <SelectBox className="select-box">
    <Select className="form-control filter-form" {...{ value, onChange }}>
      <option value="">{heading}</option>
      {options.map((opt, index) => (
        <option key={index} value={opt}>{`${opt} ${
          opt === 1 ? displayKey : plural
        }`}</option>
      ))}
    </Select>
  </SelectBox>
);

const FilterForm = ({
  selectNoOfStudent,
  selectHours,
  selectDays,
  priceFactor,
}) => {
  return (
    <div className="row" id="calc-host-container">
      <Div className="host_7w28ng">
        <SelectItem
          {...{
            options: [1, 2, 3, 4, 5],
            heading: "No. of Students",
            displayKey: "student",
            plural: "students",
            value: priceFactor.no_of_students,
            onChange: (e) => {
              selectNoOfStudent(e.target.value);
            },
          }}
        />
        <SelectItem
          {...{
            options: [1, 2, 3, 4, 5, 6, 7],
            heading: "Lessons per week",
            displayKey: "lesson/week",
            plural: "lessons/week",
            value: priceFactor.noOfDays,
            onChange: (e) => {
              selectDays(e.target.value);
            },
          }}
        />
        <SelectItem
          {...{
            options: [1, 1.5, 2, 2.5, 3, 4, 5],
            heading: "Hours per Lesson",
            displayKey: "hour/lesson",
            plural: "hours/lesson",
            value: priceFactor.hours_per_day,
            onChange: (e) => {
              selectHours(e.target.value);
            },
          }}
        />
      </Div>
    </div>
  );
};

const Root = ({
  priceOptions,
  selectPrice,
  selectNoOfStudent,
  selectHours,
  selectDays,
  priceFactor,
}) => (
  <div>
    <div className="text-center padding-bottom-15">
      <h1 className="dollars blue-font">Select a Lesson Plan</h1>
      <div className="row">
        <p className="col-md-8 col-md-offset-2 padding-down-10 level-font">
          {window.PriceHeading}
        </p>
      </div>
    </div>

    <FilterForm
      {...{ selectNoOfStudent, selectHours, selectDays, priceFactor }}
    />
    <div className="row">
      <Ol>
        {priceOptions.map((price, index) => (
          <SinglePrice
            {...{
              key: index,
              ...price,
              weeks: priceFactor.noOfWeeks,
              selectPrice,
            }}
          />
        ))}
      </Ol>
    </div>
  </div>
);

const App = connect(mapStateToProps, mapDispatchToProps)(Root);

const Pricing = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
store.dispatch({ type: "ON_LOAD" });

window.$(document).ready(() => {
  let uu = store.getState();
  console.log({ uu });
  let { selected } = mapStateToProps(store.getState());
  if (selected) {
    window.$("#the-form-section").removeClass("hidden");

    document.getElementById("root").scrollIntoView();
  }
});
export default Pricing;
