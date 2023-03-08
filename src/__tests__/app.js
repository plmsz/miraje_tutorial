import { visit } from "../lib/test-helpers"
import { screen, waitForElementToBeRemoved } from "@testing-library/react"
import makeServer from "../server"

describe('Reminders', ()=> {
    test("it shows a message when there are no reminders", async () => {
      makeServer('test')
      visit("/")
      await waitForElementToBeRemoved(() => screen.getByText("Loading..."))
    
      expect(screen.getByText("All done!")).toBeInTheDocument()
    })
})

// The All screen shows all Reminders, along with tags showing which List they belong to
// A List only shows Reminders that belong to that List
// The user can delete a Reminder
// The user can create a List
// The user can delete a List