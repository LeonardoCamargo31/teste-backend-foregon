const moment = require('moment')

function isValidDate(str){
    console.log('srt',str)
	// STRING FORMAT yyyy-mm-dd
	if(str=="" || str==null){return false;}								
	
	// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'					
	var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);
	
	// STR IS NOT FIT m IS NOT OBJECT
	if( m === null || typeof m !== 'object'){return false;}				
	
	// CHECK m TYPE
	if (typeof m !== 'object' && m !== null && m.size!==3){return false;}
				
	var ret = true; //RETURN VALUE						
	var thisYear = new Date().getFullYear(); //YEAR NOW
	var minYear = 1900; //MIN YEAR
	
	// YEAR CHECK
	if( (m[1].length < 4) || m[1] < minYear || m[1] > thisYear){ret = false;}
	// MONTH CHECK			
	if( (m[2].length < 2) || m[2] < 1 || m[2] > 12){ret = false;}
	// DAY CHECK
	if( (m[3].length < 2) || m[3] < 1 || m[3] > 31){ret = false;}
	console.log('data',ret)
	return ret;			
}

function validateMinAge(str){
    const age = moment().diff(str, 'years')
    return age >= 18
}

function validateMaxAge(str){
    const age = moment().diff(str, 'years');
    return age <= 65
}


const validateCPF=(cpf)=>{
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (cpf.length < 11)
        return false;
  for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1))
              {
              digitos_iguais = 0;
              break;
              }
  if (!digitos_iguais)
        {
        numeros = cpf.substring(0,9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
              soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
              return false;
        numeros = cpf.substring(0,10);
        soma = 0;
        for (i = 11; i > 1; i--)
              soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
              return false;
        return true;
        }
  else
      return false;
}

const extractErrors = erro => {
      //para reduzir meus erros em um unico erro
      const erros = erro.reduce((prev, curr) => {
          if (prev[curr.param]) {//se existir esse cara
              prev[curr.param].push(curr.msg)
          }
          else {
              prev[curr.param] = []
              prev[curr.param].push(curr.msg)
          }
          return prev
      }, {})
      return erros
  }

module.exports={
    isValidDate,
    validateMinAge,
    validateMaxAge,
    validateCPF,
    extractErrors
}