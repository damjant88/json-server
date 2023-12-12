/// <reference types="cypress" />

describe("Delete request", () => {

    it("Delete a post via the /post api", () => {
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/posts/13"
        }).then(response => {
            expect(response.status).to.be.equal(200)
        })
    });
})