/// <reference types="cypress" />
import { login } from "./auth";

let cachedTokenExpiryTime = new Date().getTime();
let cachedTokenResponse = null;

Cypress.Commands.add("login", () => {
  // Clear our cache if tokens are expired
  if (cachedTokenExpiryTime <= new Date().getTime()) {
    cachedTokenResponse = null;
  }

  return login(cachedTokenResponse).then((tokenResponse) => {
    cachedTokenResponse = tokenResponse;
    // Set expiry time to 50 minutes from now
    cachedTokenExpiryTime = new Date().getTime() + 50 * 60 * 1000;
  });
});

describe('Login test', () => {
  beforeEach(function () {
    cy.login();
  });

  it('Successfully logged in', () => {
    cy.get('button[type="submit"]').should("be.visible").click()
    cy.get('#fetchWorkouts').should("be.visible")
    cy.get('#logout').should("be.visible")
  })
})

describe('Post and getting workout', () => {
  beforeEach(function () {
    cy.login();
  });

  it('Successfully post and fetch workout', () => {
    cy.get("#workoutName").should("be.visible").type("workout1")
    cy.get("#exerciseName").should("be.visible").type("excercise1")
    cy.get("#weight").should("be.visible").type("1")
    cy.get("#sets").should("be.visible").type("2")
    cy.get("#reps").should("be.visible").type("3")
    cy.get('button[type="submit"]').should("be.visible").click()
    
    cy.get('#fetchWorkouts').should("be.visible").click()
    cy.contains("workout1").should("be.visible")
  })
})