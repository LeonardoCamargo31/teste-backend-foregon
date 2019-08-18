const request = require('supertest')
const app = require('../src/app')
const expect = require('chai').expect

const Solicitation = require('../src/models/solicitation')
const mongoose = require('mongoose')
const mongo = 'mongodb://localhost:27017/teste-backend-foregon-test'
mongoose.Promise = global.Promise

describe('Testando RestAPI', () => {
    before('conectando ao mongo db', async () => {
        await mongoose.connect(mongo, { useNewUrlParser: true })
        return true
    })

    it('Deve salvar somente o nome', done => {
        request(app)
            .post('/partial')
            .send({ name: 'Felipe Smith' })
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).be.true
                expect(res.body.token).be.string
                done()
            })
    })


    it('Deve salvar somente o nome e depois o email', done => {
        request(app)
            .post('/partial')
            .send({ name: 'Felipe Smith' })
            .expect(200)
            .end((err, res) => {
                if (expect(res.body.success).be.true) {
                    request(app)
                        .post('/partial')
                        .send({
                            token: res.body.token,
                            email: 'felipe.smith@gmail.com'
                        })
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body.success).be.true
                            expect(res.body.token).be.string
                            done()
                        })
                } else {
                    expect(res.body.success).be.true
                    expect(res.body.token).be.string
                    done()
                }
            })
    })

    describe('Testes em /final', () => {
        let token = ''
        before('get token', (done) => {
            request(app)
                .post('/partial')
                .send({ name: 'Felipe Smith' })
                .expect(200)
                .end((err, res) => {
                    token = res.body.token
                    done()
                })
        })

        it('Deve dar erro ao não enviar o token', done => {
            request(app)
                .post('/final')
                .send({ name: 'Felipe Smith' })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.errors.token[0]).to.equal('Deve informar o token')
                    expect(res.body.success).be.false
                    done()
                })
        })

        it('Deve dar erro ao tentar salvar somente o nome', done => {
            request(app)
                .post('/final')
                .send({ token, name: 'Felipe Smith', cpf:'44411026821', birthdate:'2005-05-31'})
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).be.false
                    expect(res.body.title).to.equal('Erro na validação de um ou mais campos.')
                    done()
                })
        })

        it('Deve salvar com sucesso', done => {
            request(app)
                .post('/final')
                .send({ 
                    token,
                    product:55, 
                    name: 'Felipe Smith', 
                    email: 'felipe.smith@gmail.com',
                    cpf:'44411026821', 
                    birthdate:'1996-05-31',
                    phone: '18 3903-6805'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).be.true
                    expect(res.body.token).be.string
                    done()
                })
        })


        it('Erro ao tentar solicitar duas vezes com mesmo cpf', done => {
            request(app)
                .post('/final')
                .send({ 
                    token,
                    product:55, 
                    name: 'Felipe Smith', 
                    email: 'felipe.smith@gmail.com',
                    cpf:'44411026821', 
                    birthdate:'1996-05-31',
                    phone: '18 3903-6805'
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).be.false
                    expect(res.body.title).to.equal('Um mesmo CPF não pode ter uma nova proposta por 90 dias.')
                    done()
                })
        })

    })

    after('Limpar registros do banco de dados de teste',async()=>{
        await Solicitation.deleteMany()
    })
})

