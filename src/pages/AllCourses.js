import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { courseData } from "../coursedata";
import { useEffect, useState } from "react";
export default function AllCourses() {
  const [currentArticleId, setCurrentArticleId] = useState(1);
  useEffect(() => {
    setCurrentArticleId(currentArticleId);
  }, [currentArticleId]);
  return (
    <section className="allcourses">
      <div className="courses-container">
        <div className="slider-container">
          <Swiper
            // spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={Infinity}
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true
            }}
            navigation
            slideToClickedSlide={true}
            watchSlidesProgress
          >
            {courseData.map((course) => (
              <AnimatePresence key={course.id}>
                <SwiperSlide key={course.id}>
                  {({ isVisible }) => {
                    if (isVisible) {
                      setCurrentArticleId(course.id);
                    }
                    return (
                      <Link to={`/${course.id}`}>
                        <motion.img src={course.coverImage} />
                      </Link>
                    );
                  }}
                </SwiperSlide>
              </AnimatePresence>
            ))}
          </Swiper>
        </div>
      </div>
      <Article currentArticleId={currentArticleId} />
    </section>
  );
}

/*
  1. install react slider library
  2. position the slider container to absolute
  3. make the blue half overflow-hidden;
  4. determine the position of central image of the coursel at in instance
  
 */

const Article = ({ currentArticleId }) => {
  const filterArticle = (id) => {
    let article = courseData.find((course) => course.id === id);
    return article;
  };
  const [currentArticle, setCurrentArticle] = useState(() =>
    filterArticle(currentArticleId)
  );

  useEffect(() => {
    let article = filterArticle(currentArticleId);
    setCurrentArticle(article);
  }, [currentArticleId]);
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.article
        key={currentArticle.id}
        initial={{ y: "20px", opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { ease: "easeInOut", duration: 0.5 }
        }}
        exit={{
          y: "-20px",
          opacity: 0,
          transition: { ease: "easeInOut", duration: 0.5 }
        }}
      >
        <h1>
          <motion.span className="num">0{currentArticle.id}</motion.span>
          {currentArticle.title}
        </h1>
        <p>
          course by {currentArticle.instructors[0]?.name} &{" "}
          {currentArticle.instructors[1]?.name}
        </p>
        <figure>
          <img src="/images/rating.svg" alt="" />
        </figure>
        <p className="overview">{currentArticle.overview}</p>
        <Link to={`/${currentArticle.id}`}>
          <button>Explore Course</button>
        </Link>
      </motion.article>
    </AnimatePresence>
  );
};
