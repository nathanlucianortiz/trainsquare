import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

function InfoCarousel(props) {
    return (
        <React.Fragment>
            <Carousel className="car-card" variant={props.carInfo.variant}>
                <Carousel.Item interval={props.carInfo.intervalOne}>
                    <img className="card-img-top car-img" src={props.carInfo.imgOne} alt={props.carInfo.altOne} />
                    <div className="caption-info cap-one">
                        <h4 className="car-head header-one">{props.carInfo.headerOne}</h4>
                        <p className="car-p p-one">{props.carInfo.pOne}</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={props.carInfo.intervalTwo}>
                    <img className="card-img-top car-img" src={props.carInfo.imgTwo} alt={props.carInfo.altTwo} />
                    <div className="caption-info cap-two">
                        <h4 className="car-head header-two">{props.carInfo.headerTwo}</h4>
                        <p className="car-p p-two">{props.carInfo.pTwo}</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={props.carInfo.intervalThree}>
                    <img className="card-img-top car-img" src={props.carInfo.imgThree} alt={props.carInfo.altThree} />
                    <div className="caption-info cap-three">
                        <h4 className="car-head header-three">{props.carInfo.headerThree}</h4>
                        <p className="car-p p-three">{props.carInfo.pThree}</p>
                    </div>
                </Carousel.Item>
            </Carousel>
        </React.Fragment>
    );
}
InfoCarousel.propTypes = {
    carInfo: PropTypes.shape({
        variant: PropTypes.string,
        intervalOne: PropTypes.number.isRequired,
        intervalTwo: PropTypes.number,
        intervalThree: PropTypes.number,
        imgOne: PropTypes.string.isRequired,
        imgTwo: PropTypes.string,
        imgThree: PropTypes.string,
        altOne: PropTypes.string,
        altTwo: PropTypes.string,
        altThree: PropTypes.string,
        headerOne: PropTypes.string.isRequired,
        headerTwo: PropTypes.string,
        headerThree: PropTypes.string,
        pOne: PropTypes.string.isRequired,
        pTwo: PropTypes.string,
        pThree: PropTypes.string,
    }),
};

export default InfoCarousel;
