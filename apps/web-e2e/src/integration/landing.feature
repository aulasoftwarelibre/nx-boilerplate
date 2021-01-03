Feature: Landing page

  Scenario: The application displays the welcome message.
    Given the user is logged in
    Then the "Next.js example" message is displayed
