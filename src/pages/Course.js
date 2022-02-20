// Pertains to a single course page
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseData } from "../coursedata";
const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] };
export default function Course() {
  const params = useParams();
  const { id } = params;

  const article = courseData.find((course) => course.id === Number(id));
  const ref = useRef(null);
  const [imageHeight, setImageHeight] = useState(null);

  useEffect(() => {
    if (ref) {
      setImageHeight(ref.current.clientHeight + 40);
    }
  }, [ref]);

  const detailsVariants = {
    initial: { y: "25px", opacity: 0 },
    animate: {
      y: "0",
      opacity: 1,
      transition: { ...transition, staggerChildren: 0.3, delay: 1 }
    }
  };
  const detailsSubVar = {
    initial: { y: "25px", opacity: 0 },
    animate: { y: "0", opacity: 1 }
  };
  const navigate = useNavigate();
  return (
    <AnimatePresence exitBeforeEnter>
      <section className="single">
        <motion.figure
          initial={{ left: "30px", height: "420px" }}
          animate={{
            left: "43vw",
            top: "30%",
            transition: { ...transition }
          }}
          ref={ref}
          className="cover-img"
        >
          <img src={article.coverImage} alt="" />
        </motion.figure>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back
        </button>
        <motion.div
          initial={{ width: "50vw" }}
          animate={{ width: "40vw", transition }}
          className="article-wrapper"
        >
          <motion.article
            variants={detailsVariants}
            initial="initial"
            animate="animate"
          >
            <motion.h1 variants={detailsSubVar}>{article.title}</motion.h1>
            <motion.figure variants={detailsSubVar}>
              <img src="/images/rating.svg" alt="" />
            </motion.figure>
            <motion.h5 variants={detailsSubVar}>Course Instructor</motion.h5>
            <motion.ul variants={detailsSubVar} className="instructors">
              {article.instructors.map((inst) => (
                <li>
                  <img src={inst.image} alt={inst.name} />
                  {inst.name}
                </li>
              ))}
            </motion.ul>
            <motion.button variants={detailsSubVar}>Enroll Now</motion.button>
          </motion.article>
        </motion.div>

        {imageHeight && (
          <article className="details">
            <motion.div
              variants={detailsVariants}
              initial="initial"
              animate="animate"
            >
              <motion.h4 variants={detailsSubVar}>overview</motion.h4>
              <motion.p variants={detailsSubVar}>{article?.overview}</motion.p>
              <hr />
              <motion.h4 variants={detailsSubVar}>
                What you will learn
              </motion.h4>
              <motion.ul variants={detailsSubVar}>
                {article.thingsToLearn.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </motion.ul>
            </motion.div>
          </article>
        )}
      </section>
    </AnimatePresence>
  );
}
