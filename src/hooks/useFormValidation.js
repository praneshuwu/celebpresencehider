import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case 'name':
        if (value.length < 1) {

          setErrors({
            ...errors,
            nameError: 'Name cannot be empty',
          });
        } else {
          setErrors({ ...errors, nameError: null });
        }
        break;
      case 'age':
        if (typeof value !== Number && (value < 18 || value > 120)) {
          setErrors({
            ...errors,
            ageError:
              'Age must be above 18 and below 120',
          });
        } else {
          setErrors({ ...errors, ageError: null });
        }
        break;
      case 'gender':
        if (!value) {
          setErrors({
            ...errors,
            genderError: 'Please select a gender',
          });
        } else {
          setErrors({ ...errors, genderError: null });
        }
        break;
      case 'country':
        if (value.length < 3) {
          setErrors({
            ...errors,
            countryError: 'Country must be at least 3 characters long',
          });
        } else {
          setErrors({ ...errors, countryError: null });
        }
        break;
      case 'description':
        if (value.length < 20) {
          setErrors({
            ...errors,
            descriptionError: 'Description must be at least 20 characters long',
          });
        } else {
          setErrors({ ...errors, descriptionError: null });
        }
        break;
      default:
        break;
    }
  };

  const resetErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validate,
    resetErrors
  };
};

export default useFormValidation;
