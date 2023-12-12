/// <reference types="cypress" />

describe("Get Request", () => {
    var result;
    it("Validate Status Code of the POST api", () => {
        result = cy.request("http://localhost:3000/posts");
        result.its("status").should("equal", 200)
    })

    it("Validate /postapi contains the correct keys and values", () => {
        cy.request({
            method: "GET", 
            url: "http://localhost:3000/posts",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body);

            expect(body[0]).has.property("title", "Example Json Server");
            expect(body[0]).has.property("id", 1);
            expect(body[0]).has.property("author", "Gianni B");

            body.forEach(function(item) {
                expect(item).to.have.all.keys("id", "title", "author");
                cy.log("Author: " + item["author"] + " & Titile: " + item["title"])
            });
        })
    })
})