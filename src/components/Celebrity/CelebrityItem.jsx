import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { BiTrash, BiEditAlt } from 'react-icons/bi';
import { CgCheckO, CgCloseO } from 'react-icons/cg';
import './celebrityItem.css';
import { calculateAge } from '../../utils/calculateAge';
import useFormValidation from '../../hooks/useFormValidation';

function CelebrityItem({
  id,
  celeb,
  isOpen,
  setActiveAccordion,
  modalHandler,
  saveCelebrityChanges,
  setIsEditModeActive,
}) {
  const dob = calculateAge(celeb.dob);
  const [celebName, setCelebName] = useState(`${celeb.first} ${celeb.last}`);
  const [age, setAge] = useState(dob);
  const [gender, setGender] = useState(celeb.gender);
  const [country, setCountry] = useState(celeb.country);
  const [description, setDescription] = useState(celeb.description);
  const [isEditMode, setIsEditMode] = useState(false);

  // custom hook to handle form validation
  const { validate, errors, resetErrors } = useFormValidation();

  const legalAge = dob > 18 ? true : false;
  const { nameError, ageError, countryError, genderError, descriptionError } =
    errors;

  // boolean to handle save button state
  let noErrors =
    !nameError &&
    !ageError &&
    !countryError &&
    !genderError &&
    !descriptionError;


  const changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    validate(name, value);

    switch (name) {
      case 'name':
        setCelebName(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  // confirms changes
  const confirmationHandler = () => {

    const [first, last] = celebName.split(' ');

    // create a new celebrity object & replace old details with new details
    const updatedCelebrity = {
      ...celeb,
      first,
      last,
      age,
      gender,
      country,
      description,
    };
    // pass updated celebrity object and revert back to displaying mode
    saveCelebrityChanges(updatedCelebrity);
    setIsEditMode(false);
    setIsEditModeActive(false);
  };

  // reverts changes
  const revertChangesHandler = () => {
    setCelebName(`${celeb.first} ${celeb.last}`);
    setAge(dob);
    setGender(celeb.gender);
    setCountry(celeb.country);
    setDescription(celeb.description);
  };

  // open accordion button
  const openAccordionBtnHandler = () => {
    setActiveAccordion(isOpen ? null : id);
  };

  // cancel edit button
  const cancelEditBtnHandler = () => {
    setIsEditMode(false);
    setIsEditModeActive(false);
    revertChangesHandler();
    resetErrors();
  };

  // save edit button
  const saveEditBtnHandler = () => {
    if (noErrors) {
      setIsEditMode(false);
      setIsEditModeActive(false);
      confirmationHandler();
      resetErrors();
    }
  };

  // delete/trash button
  const trashBtnHandler = () => {
    modalHandler(true, id);
  };

  // edit button
  const editBtnHandler = () => {
    if (legalAge) {
      setIsEditMode(true);
      setIsEditModeActive(true);
    }
  };

  return (
    <>
      <article className='flex flex-col justify-around p-4 border border-gray-300 mb-6 rounded-lg h-auto min-h-max'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <img
              src={celeb.picture}
              alt=''
              className='border border-gray-400 rounded-full w-12 h-12'
            />
            {isEditMode ? (
              <div className='flex flex-col mx-3'>
                <input
                  type='text'
                  value={celebName}
                  onChange={changeHandler}
                  className='p-2 border border-gray-400 rounded-md text-lg'
                  name='name'
                />
                {nameError && (
                  <p className='text-xs text-red-600 pt-1'>{nameError}</p>
                )}
              </div>
            ) : (
              <h3 className='text-lg ml-4'>{celebName}</h3>
            )}
          </div>
          <span
            className={`p-3 more-icon ${isOpen ? 'show-details' : ''}`}
            onClick={openAccordionBtnHandler}
          >
            <HiChevronDown
              className='cursor-pointer'
              aria-hidden='false'
              size={20}
              id={id}
            />
          </span>
        </div>
        <div
          className={`details ${isOpen ? 'show-details' : ''} cursor-default`}
        >
          <div
            className={`flex justify-between w-full mt-4 ${
              isEditMode ? 'flex-col items-stretch md:flex-row gap-2' : ''
            }`}
          >
            <div className='flex flex-col justify-start flex-1'>
              <label htmlFor='Age' className='text-sm text-gray-500'>
                Age
              </label>

              {isEditMode ? (
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <input
                      type='number'
                      value={age}
                      onChange={changeHandler}
                      className='inline border border-gray-400 rounded-md p-2 pl-2 w-20'
                      name='age'
                    />
                    <span className='mx-3'> years</span>
                  </div>
                  {ageError && (
                    <p className='text-xs text-red-600 pt-1'>{ageError}</p>
                  )}
                </div>
              ) : (
                <p>{`${age} years`}</p>
              )}
            </div>
            <div className='flex flex-col justify-start flex-1'>
              <label htmlFor='Gender' className='text-sm text-gray-500'>
                Gender
              </label>
              {isEditMode ? (
                <div className='flex flex-col'>
                  <select
                    type='select'
                    value={gender}
                    onChange={changeHandler}
                    className='w-full cursor-pointer border border-gray-400 rounded-md p-[0.6rem]'
                    name='gender'
                  >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='transgender'>Transgender</option>
                    <option value='rather not say'>Rather not say</option>
                    <option value='other'>Other</option>
                  </select>

                  {genderError && (
                    <p className='text-xs text-red-600 pt-1'>{genderError}</p>
                  )}
                </div>
              ) : (
                <p className='capitalize'>{gender}</p>
              )}
            </div>

            <div className='flex flex-col justify-start flex-1'>
              <label htmlFor='Age' className='text-sm text-gray-500'>
                Country
              </label>
              {isEditMode ? (
                <div className='flex flex-col'>
                  <input
                    type='text'
                    value={country}
                    onChange={changeHandler}
                    className='border border-gray-400 rounded-md p-2 w-full'
                    name='country'
                  />
                  {countryError && (
                    <p className='text-xs text-red-600 pt-1'>{countryError}</p>
                  )}
                </div>
              ) : (
                <p>{country}</p>
              )}
            </div>
          </div>
          <div className='my-2'>
            <label htmlFor='Description' className='text-sm text-gray-500 my-2'>
              Description
            </label>
            {isEditMode ? (
              <div className='flex flex-col'>
                <textarea
                  name='description'
                  className='border border-gray-400 rounded-md p-3 w-full'
                  rows='5'
                  onChange={changeHandler}
                  value={description}
                ></textarea>
                {descriptionError && (
                  <p className='text-xs text-red-600 pt-1'>
                    {descriptionError}
                  </p>
                )}
              </div>
            ) : (
              <p>{description}</p>
            )}
          </div>
          {isEditMode ? (
            <span className='flex justify-end mt-2'>
              <CgCloseO
                color='red'
                size={24}
                className='mx-2 cursor-pointer hover:scale-110 transition-all'
                onClick={cancelEditBtnHandler}
              />
              <CgCheckO
                color={noErrors ? 'green' : 'gray'}
                size={24}
                className='mx-2 cursor-pointer hover:scale-110 transition-all'
                onClick={saveEditBtnHandler}
              />
            </span>
          ) : (
            <span className='flex justify-end mt-2'>
              <BiTrash
                color='red'
                size={24}
                className='mx-2 cursor-pointer hover:scale-110 transition-all'
                onClick={trashBtnHandler}
              />
              <BiEditAlt
                color={` ${legalAge ? 'green' : 'gray'} `}
                size={24}
                className='mx-2 cursor-pointer hover:scale-110 transition-all'
                onClick={editBtnHandler}
              />
            </span>
          )}
        </div>
      </article>
    </>
  );
}

export default CelebrityItem;
