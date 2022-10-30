import { useState } from "react";
import CelebrityItem from "../Celebrity/CelebrityItem.jsx";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
let celebritiesData = require("../../celebrities.json");

function CelebList() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [celebrities, setCelebrities] = useState(celebritiesData);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [deleteAccordionId, setdeleteAccordionid] = useState(null);

  const deleteItemHandler = () => {
    const newCelebList = celebrities.filter((celebrity) => {
      return celebrity.id !== deleteAccordionId;
    });
    setCelebrities(newCelebList);
    setActiveAccordion(null);
    modalHandler(false);
  };

  const modalHandler = (open, id) => {
    if (open) {
      setIsModalActive(true);
      setdeleteAccordionid(id);
    } else {
      setIsModalActive(false);
      setdeleteAccordionid(null);
    }
  };

  const saveCelebrityChanges = (updatedCelebrity) => {
    const updatedCelebrities = celebrities.filter(
      (celeb) => celeb.id !== updatedCelebrity.id
    );
    updatedCelebrities.push(updatedCelebrity);
    updatedCelebrities.sort((celeb1, celeb2) => celeb1.id - celeb2.id);
    setCelebrities(updatedCelebrities);
  };

  const setActiveAccordionHandler = (id) => {
    if (!isEditModeActive) {
      setActiveAccordion(id);
    }
  };

  return (
    <>
      {isModalActive ? (
        <ConfirmationModal
          deleteHandler={deleteItemHandler}
          modalHandler={modalHandler}
        />
      ) : null}
      <div className="w-5/6 md:w-4/6 lg:w-3/6 mx-auto relative z-0 pt-4">
        <h2 className="text-xxl mb-5 uppercase font-bold text-center">
          Celebrities
        </h2>
        {celebrities.map((celebrity, index) => {
          const isOpen = celebrity.id === activeAccordion;

          return (
            <CelebrityItem
              key={celebrity.id}
              id={celebrity.id}
              celeb={celebrity}
              isOpen={isOpen}
              setIsEditModeActive={setIsEditModeActive}
              setActiveAccordion={setActiveAccordionHandler}
              onDelete={deleteItemHandler}
              modalHandler={modalHandler}
              saveCelebrityChanges={saveCelebrityChanges}
            />
          );
        })}
      </div>
    </>
  );
}

export default CelebList;
