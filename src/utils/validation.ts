export interface Validation {
  message: string;
  error: boolean;
}

export const validateNumber = (number: any, label?: any): Validation => {
  let message = '';
  let error = false;
  let regex = number.match(/^[0-9]*$/);

  if (regex === null) {
    message = `${label} tidak sesuai`;
    error = true;
  } else if (Number(number) <= 0) {
    message = `${label} tidak boleh kosong`;
    error = true;
  }

  return {message, error};
};
