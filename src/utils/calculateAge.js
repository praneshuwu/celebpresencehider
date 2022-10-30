const currYear = new Date().getFullYear();
export function calculateAge(dob) {
  return currYear - new Date(dob).getFullYear();
}
