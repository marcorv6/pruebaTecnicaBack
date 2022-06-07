const moment = require('moment');
const validator = require('validator');

// Caractéres especiales permitidos en una string
const caracterEspecial = (char) => {
  const charset = [
    ' ',
    '.',
    ',',
    ':',
    ';',
    '?',
    '¿',
    '!',
    '¡',
    '(',
    ')',
    '"',
    "'",
    '-',
    '_',
    '/',
    '#',
    '%',
    '\n',
  ];

  for (let i = 0; i < charset.length; i++) if (charset[i] === char) return true;
  return false;
};

const alreadyExists = (campo, m) => {
  throw new Error(`Ya se encuentra en uso ${m ? 'el' : 'la'} ${campo}.`);
};

const notValid = (campo, m, razon) => {
  throw new Error(
    `${m ? 'El' : 'La'} ${campo} no es valid${m ? 'o' : 'a'}, ${razon}.`
  );
};

/*
  Valida que la variable contenga un valor, de lo contrario saca un error.
*/
const thereIsnt = (variable, campo, m) => {
  if (!variable) throw new Error(`No se mando ${m ? 'el' : 'la'} ${campo}.`);
};

/*
  Valida que la variable sea una string y, si se necesita, que mida igual 
  o menor que una longitud determinada.
*/
const basicStrValidation = (texto, campo, m, length) => {
  thereIsnt(texto, campo, m);
  if (typeof texto !== 'string') notValid(campo, m, 'no se mando una string');
  if (length && texto.length > length)
    notValid(campo, m, 'tiene más carecteres de lo permitido');
  return texto;
};

/*
  Valida que la variable sea un numero entero, ya sea que recibe una string o
  un number. Usualmente se usa para validar ids.
*/
const isInteger = (numero, campo, m = true) => {
  thereIsnt(numero, campo, m);
  if (typeof numero === 'number') numero = numero.toString();
  if (typeof numero !== 'string')
    notValid(campo, m, 'no se mando una string o un number');
  if (!validator.isNumeric(numero, { no_symbols: true }))
    notValid(campo, m, 'no es un número entero valido');
  return Number(numero);
};

/*
  Valida que la stirng mandada sea un correo valido.
*/
const isValidEmail = (correo, campo = 'correo', m = true, length) => {
  basicStrValidation(correo, campo, m, length);
  if (!validator.isEmail(correo)) notValid(campo, m, 'no es un correo válido');
  return correo;
};

/*
  Valida que la stirng mandada sean caracteres del abcdario.
  Usualmente se usa para validar nombres, apellidos, etc.
*/
const isText = (texto, campo, m, length) => {
  basicStrValidation(texto, campo, m, length);
  for (let i = 0; i < texto.length; i++)
    if (
      !validator.isAlpha(texto[i], 'es-ES') &&
      texto[i] != ' ' &&
      texto[i] != '.'
    )
      notValid(campo, m, 'contiene caracteres no validos');
  return texto;
};

/*
  Lo mismo que el de arriba pero este permite números y 
  caracteres especiales.
*/
const isValidAphanumeric = (texto, campo, m, length) => {
  basicStrValidation(texto, campo, m, length);
  for (let i = 0; i < texto.length; i++) {
    if (caracterEspecial(texto[i])) continue;
    if (!validator.isAlphanumeric(texto[i], 'es-ES'))
      notValid(campo, m, 'contiene caracteres no validos');
  }
  return texto;
};

/*
  Lo mismo que el de arriba pero este permite números y 
  caracteres especiales.
*/
const isValidUser = (texto, campo, m, maxlength, minlength) => {
  isValidAphanumeric(texto, campo, m, maxlength);
  if(texto.length < minlength) notValid(campo, m, 'tiene menos caracteres de los especificados');
  return texto;
};

/*
  Valida que la variable sea una fecha moment valida.
*/
const isDate = (fecha, campo, m) => {
  let fechaMoment = moment(fecha);

  thereIsnt(fecha, campo, m);
  if (!fechaMoment.isValid()) notValid(campo, m, 'no es una fecha válida');
  return fechaMoment;
};

/*
  Valida que una string contenga solo números
*/
const isNumber = (
  numero,
  campo,
  m,
  length,
  no_symbols = true,
  makeNumber = false
) => {
  basicStrValidation(numero, campo, m, length);
  if (!validator.isNumeric(numero, { no_symbols }))
    notValid(campo, m, 'tiene caracteres que no son números');
  if (makeNumber) return Number(numero);
  return numero;
};

// const validarAccesibilidad = (usuariosValidos = [], idTipoUsuario) => {
//   for (let i = 0; i < usuariosValidos.length; i++)
//     if (idTipoUsuario === usuariosValidos[i]) return;
//   throw new Error('Este usuario no tiene permitido usar esta linea de la API.');
// };

/*
  Te dice si un objeto esta vacio o no.
*/
const noEmptyObj = (obj) => {
  for (let key in obj) if (obj.hasOwnProperty(key)) return false;
  return true;
};

// Validar que la password contenga una mayuscula, una minuscula, un simbolo, un número y que tenga por lo menos 10 caracteres

const hasLowerCase = str => {
  return (/[a-z]/.test(str));
}

const hasUpperCase = str => {
  return (/[A-Z]/.test(str));
}

const hasSymbol = str => {
  return (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str));
}

const hasNumber = str => {
  return (/[1-9]+/.test(str));
}

const checkPassword = str => {
  if(hasLowerCase(str) && hasUpperCase(str) && hasSymbol(str) && hasNumber(str) && str.length >= 10) return str
  throw new Error("Esta contraseña NO cumple con los parámetros solicitados.")
}

module.exports = {
  alreadyExists,
  notValid,
  thereIsnt,
  basicStrValidation,
  isInteger,
  isValidEmail,
  isText,
  isValidAphanumeric,
  isDate,
  isValidUser,
  isNumber,
  noEmptyObj,
  checkPassword
};
