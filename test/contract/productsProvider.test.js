const { reporter, flow } = require('pactum');
const pf = require('pactum-flow-plugin');
const { faker } = require('@faker-js/faker');

function addFlowReporter() {
    pf.config.url = 'http://localhost:8080';
    pf.config.projectId = 'lojaebac_api';
    pf.config.projectName = 'Loja Ebac API';
    pf.config.version = '1.0.0';
    pf.config.username = 'scanner';
    pf.config.password = 'scanner';
    reporter.add(pf.reporter);
}

before(async () => {
    addFlowReporter();
});

after(async () => {
    await reporter.end();
});

let token;
beforeEach(async () => {

    token = await flow("Login")
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({
            "email": "admin@admin",
            "password": "admin123"
        })
        .returns('data.token')

});

it('API - Should add a product', async () => {

    const productName = faker.commerce.product()

    await flow("Add product")
        .post('http://lojaebac.ebaconline.art.br/api/addProduct')
        .withHeaders('Authorization', token)
        .withJson({
            "name": productName,
            "price": 350.00,
            "quantity": 1
        })
        .expectStatus(200)
        .expectJson('success', true);

});

let id;
it('API - Should delete a product', async () => {

    // Pegando o id do segundo produto da lista para poder deletar
    id = await flow("Take id of a product")
        .get('http://lojaebac.ebaconline.art.br/public/getProducts')
        .withHeaders('Authorization', token)
        .returns('products[1]._id')

    await flow("Delete product")
        .delete(`http://lojaebac.ebaconline.art.br/api/deleteProduct/${id}`)
        .withHeaders('Authorization', token)
        .expectStatus(200)
        .expectJson('success', true);
});

it('API - Should edit a product', async () => {

    const productName = faker.commerce.product()

    // Pegando o id do terceiro produto da lista para poder editar
    id = await flow("Take id of a product")
        .get('http://lojaebac.ebaconline.art.br/public/getProducts')
        .withHeaders('Authorization', token)
        .returns('products[2]._id')

    await flow("Edit product")
        .put(`http://lojaebac.ebaconline.art.br/api/editProduct/${id}`)
        .withHeaders('Authorization', token)
        .withJson({
            "name": productName,
            "price": 100.00,
            "quantity": 500
        })
        .expectStatus(200)
        .expectJson('success', true)
});
