const tutorSchema = require('./schema.json');
const Ajv = require('ajv').default;
const ErrorObject = require('ajv').ErrorObject;

const ajValidator = new Ajv({ allErrors: true });
const validate = ajValidator.compile(tutorSchema);

const model = {
  cityId: 1,
  firstName: "Ricardo",
  lastName: "Cuanalo",
  email: "cuanaloricardo@gmail.com",
  password: "perritos",
  address: "12 de octubre",
  phone: "2227420516",
  pricePerHour: "30",
  about: "Just a simple programmer",
  education: "Buap",
  imageUrl: "https://ricardocuanalo.com/img.png"
}

console.log(validate(model))
console.log(validate.errors)
