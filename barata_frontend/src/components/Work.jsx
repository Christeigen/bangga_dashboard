import React from "react";
import PickMeals from "../Assets/money.jpeg";
import ChooseMeals from "../Assets/electric.jpeg";
import DeliveryMeals from "../Assets/charging-station.jpg";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Cheap",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et.",
    },
    {
      image: ChooseMeals,
      title: "Fast and Efficient",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: DeliveryMeals,
      title: "Easy to Access",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p style={{ color: 'blue' }} className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
