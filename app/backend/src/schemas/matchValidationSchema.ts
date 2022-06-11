const matchValidationSchema = {
  blank: (values:Array<unknown>) => values.some((value) => !value && value !== 0),

  isNotNumber: (values:Array<unknown>) => values
    .some((value) => !Number(value) && Number(value) !== 0),

  isLengthLessThan: (value:string, min:number) => (value.length < min),
};

export default matchValidationSchema;
