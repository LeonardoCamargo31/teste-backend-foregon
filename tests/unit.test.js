const chai = require('chai')
const expect = chai.expect

const utils = require('../src/utils/index')

describe('testes em utils', function() {

    describe('testes no método validateCPF', function() {
        it('validar cpf', function() {
            const res = utils.validateCPF('44411026821')
            expect(res).to.be.true;
        })

        it('cpf inválido, informando poucos dígitos', function() {
            const res = utils.validateCPF('444')
            expect(res).to.be.false;
        })

        it('cpf inválido, informando letras', function() {
            const res = utils.validateCPF('abcde')
            expect(res).to.be.false;
        })

        it('cpf válido, informando número e letra', function() {
            const res = utils.validateCPF('44411026821A')
            expect(res).to.be.true;
        })

        it('cpf inválido, informando com formato inválido', function() {
            const res = utils.validateCPF('444.110.268-21')
            expect(res).to.be.false;
        })
    })

    describe('testes no método isValidDate', function() {
        it('ao validar data deve retornar true', function() {
            const res = utils.isValidDate('1996-05-31')
            expect(res).to.be.true;
        })

        it('ao validar data deve retornar false', function() {
            const res = utils.isValidDate('aaaa')
            expect(res).to.be.false;
        })

        it('ao validar data deve retornar false', function() {
            const res = utils.isValidDate('19960531')
            expect(res).to.be.false;
        })

        it('ao validar data deve retornar false', function() {
            const res = utils.isValidDate('96-05-31')
            expect(res).to.be.false;
        })
    })

    describe('testes no método validateMinAge', function() {
        it('data maior de 18 anos', function() {
            const res = utils.validateMinAge('1996-05-31')
            expect(res).to.be.true;
        })

        it('erro ao enviar data menor de 18 anos', function() {
            const res = utils.validateMinAge('2004-05-31')
            expect(res).to.be.false;
        })
    })

    describe('testes no método validateMaxAge', function() {
        it('data menor de 65 anos', function() {
            const res = utils.validateMaxAge('1996-05-31')
            expect(res).to.be.true;
        })

        it('erro ao enviar data maior de 65 anos', function() {
            const res = utils.validateMaxAge('1940-05-31')
            expect(res).to.be.false;
        })
    })

    describe('testes no método validatePhone', function() {
        it('número telefone residencial válido', function() {
            const res = utils.validatePhone('18 3903-6805')
            expect(res).to.be.true;
        })

        it('número telefone celular válido', function() {
            const res = utils.validatePhone('18 8192-2125')
            expect(res).to.be.true;
        })
        it('número telefone celular com nono digito válido', function() {
            const res = utils.validatePhone('18 98192-2125')
            expect(res).to.be.true;
        })

        it('número tudo junto', function() {
            const res = utils.validatePhone('1881922125')
            expect(res).to.be.true;
        })

        it('número inválido, poucos dígitos', function() {
            const res = utils.validatePhone('123456')
            expect(res).to.be.false;
        })

        it('número inválido, muitos dígitos', function() {
            const res = utils.validatePhone('18 98192 21255')
            expect(res).to.be.false;
        })

        it('número inválido com letras', function() {
            const res = utils.validatePhone('aaaa')
            expect(res).to.be.false;
        })
    })
})