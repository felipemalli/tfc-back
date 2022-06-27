const matchValidationSchema = {
  blank: (values:Array<unknown>) => values.some((value) => !value && value !== 0),

  isNotNumber: (values:Array<unknown>) => values
    .some((value) => !Number(value) && Number(value) !== 0),
};

export default matchValidationSchema;
