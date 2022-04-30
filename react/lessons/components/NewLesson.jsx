import React from 'react';
import { Link } from 'react-router-dom';
import LessonForm from './LessonForm';
import InfoCarousel from './InfoCarousel';
import './css/new-lesson.css';

function NewLesson() {
    const carouselInfo = {
        variant: 'dark',
        intervalOne: 5000,
        intervalTwo: 5000,
        intervalThree: 6000,
        imgOne: 'https://bit.ly/38SGSRA',
        imgTwo: 'https://bit.ly/393QMA5',
        imgThree: 'https://bit.ly/3vldaMW',
        altOne: 'First Slide',
        altTwo: 'Second Slide',
        altThree: 'Third Slide',
        headerOne: 'Skill Level',
        headerTwo: 'Image',
        headerThree: 'Description',
        pOne: 'Choosing a skill level for your lesson is important for the safety and satisfaction of everyone. Check out our helpful guide in FAQ for some tips.',
        pTwo: 'Although a picture is not required, it can be the perfect way to grab the attention of others. Increase your volume of bookings and pick a great one!',
        pThree: 'A detailed description can help your bookers know what to expect. Some choose to provide materials, some do not. We leave it up to the host! There is nothing worse than showing up to plant a tree without a shovel.',
    };

    return (
        <React.Fragment>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
            <div className="container-fluid">
                <h4 className="new-header">New Lesson</h4>
                <Link className="btn lessons-back" to="/lessons/creator">
                    <i className="bi bi-arrow-left"></i>
                    Back to My Lessons
                </Link>

                <div className="row">
                    <div className="col-4">
                        <LessonForm />
                    </div>
                    <InfoCarousel carInfo={carouselInfo} />
                </div>
            </div>
        </React.Fragment>
    );
}
export default NewLesson;
