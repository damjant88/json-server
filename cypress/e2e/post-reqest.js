/// <reference types="cypress" />

describe("Post Request", () => {
    var titleOfPosts = new Array();
    let randomTitle = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
    var latestPost = new String();
    it("Create new post via the /post api", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3000/posts",
            body: {
                title: randomTitle,
                author: "Damjan T"
            }
        }).then(response => {
            expect(response.status).to.be.equal(201)
        })
    });

    it("Validate most recent post", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/posts",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body);
            expect(response.status).to.be.equal(200)
            body.forEach(function(item) {
                titleOfPosts.push(item["title"])
            })

        }).then(() => {
            var latestPost = titleOfPosts[titleOfPosts.length - 1]
            expect(latestPost).to.eql(randomTitle);
        })
    });

    it("Delete a post via the /post api", () => {
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/posts/${titleOfPosts.length}"
        }).then(response => {
            expect(response.status).to.be.equal(200);
            cy.log(url);
        })
    });
})