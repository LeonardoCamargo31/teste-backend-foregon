const chai = require('chai')
const expect = chai.expect

const utils = require('../src/utils/index')

describe('testes em utils', function() {
    describe('testes no metodo isValidDate', function() {
        it('ao validar data deve retornar true', function() {
            const res = utils.isValidDate('1996-05-31')
            expect(res).to.be.true;
        })

        it('ao validar data deve retornar false', function() {
            const res = utils.isValidDate('96-05-31')
            expect(res).to.be.false;
        })
    })

    describe('testes no metodo validateCPF', function() {
        it('validar cpf', function() {
            const res = utils.validateCPF('44411026821')
            expect(res).to.be.true;
        })

        it('erro ao validar cpf', function() {
            const res = utils.validateCPF('444.110.268-21')
            expect(res).to.be.false;
        })
    })

    describe('testes no metodo validateMinAge', function() {
        it('data maior de 18 anos', function() {
            const res = utils.validateMinAge('1996-05-31')
            expect(res).to.be.true;
        })

        it('erro ao enviar data menor de 18 anos', function() {
            const res = utils.validateMinAge('2004-05-31')
            expect(res).to.be.false;
        })
    })

    describe('testes no metodo validateMaxAge', function() {
        it('data menor de 65 anos', function() {
            const res = utils.validateMaxAge('1996-05-31')
            expect(res).to.be.true;
        })

        it('erro ao enviar data maior de 65 anos', function() {
            const res = utils.validateMaxAge('1940-05-31')
            expect(res).to.be.false;
        })
    })

})