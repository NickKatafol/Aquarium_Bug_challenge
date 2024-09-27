
describe('Progect is runing successfully', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h3', 'Aquarium')
  })
})

describe('The bug checkout', () => {
  it('moving of the fish', () => {

    //visit the target page
    cy.visit('/')
    cy.contains('h3', 'Aquarium')

    //add the fish
    cy.contains('button', 'Add the random fish').click()
    cy.contains('button', 'Add the random fish').click()
    cy.contains('button', 'Add the random fish').click()


    //select one of the fish and detect its id
    let fishID = 0
    cy.get('img').first()
      .invoke('attr', 'data-fish-ind')
      .then(id => { fishID = id })

    cy.get('img').then(els => {
      let success = false

      


    })

  })
})




