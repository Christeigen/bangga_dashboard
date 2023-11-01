import React from "react";

const Work = () => {
  const workInfoData = [
    {
      title: "Cheap",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et.",
    },
    {
      title: "Fast and Efficient",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
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
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
