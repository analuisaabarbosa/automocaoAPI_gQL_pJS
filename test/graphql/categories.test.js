const { spec } = require('pactum');

beforeEach(async () => {
    const response = await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withGraphQLQuery(`
            mutation AuthUser($email: String, $password: String) {
                authUser(email: $email, password: $password) {
                success
                token
            }
         }           
    `)
        .withGraphQLVariables({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.authUser.token')

        token = response;
});

it('Should add a category in the list', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withHeaders("Authorization", `Bearer ${token}`)
        .withGraphQLQuery(`
            mutation AddCategory($name: String, $photo: String) {
                addCategory(name: $name, photo: $photo) {
                name
                photo
            }
         }      
    `)
        .withGraphQLVariables({
            "name": "Bags",
            "photo": "https://www.zipmaster.com/wp-content/uploads/2022/04/Reusable-Cloth-Shopping-Bags-Rainbow-Pack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.webp"
        })
        .expectStatus(200);
});

it('Should delete a category', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withGraphQLQuery(`
        mutation DeleteCategory($deleteCategoryId: ID!) {
            deleteCategory(id: $deleteCategoryId) {
            name
         }
       }        
    `)
        .withGraphQLVariables({
            "deleteCategoryId": "66f567bc4252422517015341"
        })
        .expectStatus(200);
});

it('Should edit a category', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withGraphQLQuery(`
            mutation EditCategory($editCategoryId: ID!, $name: String, $photo: String) {
                editCategory(id: $editCategoryId, name: $name, photo: $photo) {
                name
                photo
            }
        }
    `)
        .withGraphQLVariables({
            "editCategoryId": "66d9fc36a60ca1ef7fa05cef",
            "name": "Iphone 16",
            "photo": null
        })
        .expectStatus(200)
});