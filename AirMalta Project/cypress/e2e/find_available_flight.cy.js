///<reference types="cypress-xpath"/>
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
describe('flight_search', () => {
  before(function(){
    cy.fixture('locators').then(function(data){
        this.data = data;
    })
  })
  
  it('select_first_available_flight', function () { 
    
    // Go to main Page
    cy.visit(this.data.url);
    
    // Enter the Deperture City
    cy.get(this.data.cookie).should('be.visible').click(); 
    cy.get(this.data.Dep_City).first().click();
    cy.get(this.data.Input_Dep).should('be.visible')
    .type(this.data.Departure)
    .should('have.value', this.data.Departure);
    cy.get(this.data.Airport_Name).should('be.visible').click();
    
    // Enter the arrival Destination
    cy.get(this.data.Arr_City).should('be.visible').click();
    cy.get(this.data.Input_Arr)
    .type(this.data.Arrival)
    .should('have.value',this.data.Arrival);
    cy.get(this.data.AirPort_Name).should('be.visible').click();

    
    // Select departure date  
    cy.get(this.data.Dep_date).should('be.visible').click();
    cy.get(this.data.Date_Picker).click();

    // Select Arrival date
    cy.wait(2000);
    cy.scrollTo('center')
    cy.get(this.data.Arr_Date).scrollIntoView().should('be.visible').trigger('click'); // click(); funtion did not work. There are some bug reports about this.
    // sometimes trigger('click') function might fail, restarting the test will work.

    //send the query
    cy.get('iframe');
    cy.get(this.data.search_flight).scrollIntoView().should('be.visible').click({force:true});
    
    // Select Flexible option
    cy.get(this.data.flex_date).then(($flex) => {
      if ($flex.is(':visible')) {
        cy.wrap($flex).click();
      } else {
          // Perform another action
          pass
      }
  });
      // Select the first available flight  
    cy.viewport(1780, 760)
    cy.wait(5000)
    cy.get('iframe');
    cy.scrollTo('center')
    cy.xpath(this.data.Price).should('be.visible').scrollIntoView().then(($price) => {
      const cost = $price.text();
      

    // extract the price with regex
    let regex = /([0-9]{2}\s[A-Za-z]{3})([0-9]{2}\.[0-9]{2})/g;
    let match = regex.exec(cost);
    let Flight_price = match[2] // put the second index of the array returned by the exec method into a variable
    cy.log("First Available Flight is ======>", Flight_price);

    })
    

  })  
 
 })

