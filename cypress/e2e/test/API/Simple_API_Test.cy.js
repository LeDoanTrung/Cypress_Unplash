describe('Simple API Test', { tags: ['@api'] }, function () {
  it('Should pass a simple test', function () {
    expect(true).to.be.true;
  });
  
  it('Should handle a simple HTTP request', function() {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
      });
  });
});
