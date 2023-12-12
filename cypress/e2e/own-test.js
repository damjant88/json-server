/// <reference types="cypress" />

describe("Own test", () => {
    var bodyOfPosts = new Array();
    let randomBody = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
    var randomId = Math.floor(Math.random() * 1000 +1);
    it("Create new comment via the /comments api", () => {
        cy.request({
            method: "POST",
            url: "http://localhost:3000/comments",
            body: {
                body: randomBody,
                postId: randomId
            }
        }).then(response => {
            expect(response.status).to.be.equal(201)
        })
    });

    it("Validate most recent post", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:3000/comments",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            expect(response.status).to.be.equal(200)
            body.forEach(function(item) {
                bodyOfPosts.push(item["body"])
            })

        }).then(() => {
            var latestPost = bodyOfPosts[bodyOfPosts.length - 1];
            expect(latestPost).to.eql(randomBody);
        })
    });
    
    it("Delete a post via the /comments api", () => {       
        cy.request({
            method: "DELETE",
            url: `http://localhost:3000/comments/${bodyOfPosts.length}`
        }).then(response => {
            expect(response.status).to.be.equal(200);
        })
    });
})