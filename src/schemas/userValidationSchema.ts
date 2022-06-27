const regexEmail = /\S+@\S+\.\S+/;

const userValidationSchema = {
  blank: (value:string) => (!value),

  incorrectFormat: (value:string) => !regexEmail.test(value),

  isLengthLessThan: (value:string, min:number) => (value.length < min),
};

export default userValidationSchema;
