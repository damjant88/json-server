/// <reference types="cypress" />

describe("Update request", () => {

    it("Update an existing post via the /post api", () => {
        cy.request({
            method: "PUT",
            url: "http://localhost:3000/posts/2",
            body: {
                title: "Where I can buy apples",
                author: "Damjan T"
            }
        }).then(response => {
            expect(response.status).to.be.equal(200)
        })
    });

    // it("Validate most recent post", () => {
    //     cy.request({
    //         method: "GET",
    //         url: "http://localhost:3000/posts",
    //         headers: {
    //             accept: "application/json"
    //         }
    //     }).then(response => {
    //         let body = JSON.parse(JSON.stringify(response.body))
    //         cy.log(body);
    //         expect(response.status).to.be.equal(200)
    //         body.forEach(function (item) {
    //             titleOfPosts.push(item["title"])
    //         })

    //     }).then(() => {
    //         var latestPost = titleOfPosts[titleOfPosts.length - 1]
    //         expect(latestPost).to.eql(randomTitle);
    //     })
    // });
})