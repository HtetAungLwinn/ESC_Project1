Feature 1: Destination search

You should provision a simple destination search feature. This is a text-based autocomplete search that should be fast from the customer’s perspective. You’re free to use any tools/ techniques that can facilitate a fast return of results.

Using the destination selected will allow you to search for hotels relevant to that destination.

Deliverable:

A simple form with a destination search dropdown that can suggest you relevant places / destinations as you type a destination
Dropdown results should be displayed as fast as possible (the faster the better)
Incorporate a datepicker to allow users to select their dates of stay
Incorporate a dropdown (or any other UI) for users to specify the number of guests & number of rooms (the format of API request params for guests & rooms are in Appendix 3.1)
Bonus: could process simple typos (e.g. Sinagpore → Singapore), you could choose to use an external library for this
Form submission & validation, redirecting to Feature 2.


Feature 2: Hotel Search Results

Customers should be able to view hotel search results relatively quickly.

For a given destination, dates of stay and number of rooms/guests, a list of matching hotels and the cheapest room for each hotel would be given by our mock API. This is typically used to render a listings view of all available hotels and the cheapest room of each hotel.


Deliverables:
A web page that displays a list of all available hotels for the selected parameters (e.g. destination, dates, no. of guests, no. of rooms) in Feature 1.
Since the list of hotels would be very long, your web page might be laggy or freezing while rendering the list. Consider how you can solve this problem (hint: lazy loading? paginations?)
A filter panel that could filter hotels displayed by star ratings, guest ratings, and price range.
A select button for each list item where you can select a hotel and redirect to Feature 3.
Sort the list of hotels based on price & ratings
[Bonus] Build a map view to browse & select hotels from the map view


Feature 3: Hotel Room Details


For a given hotel (chosen from the list from feature 2), dates of stay, and number of rooms/guests, this API call will provide a list of all matching room types that can be provided by the specified hotel. This is typically used to render a view of all room listings that are available for booking in the specified hotel, as well as some additional information of the hotel.

Given that room rates between views could vary, consider how you would maintain the customer experience by ensuring the most accurate rates across views.

Deliverables:
A web page that displays more detailed hotel information and a list of all available rooms for the selected hotel in Feature 2.
A map that shows the hotel’s location (notice that the mock API will return the longitude and latitude of the hotel in Appendix 3.3.4)
Select button for each room option to redirect to Feature 4


Feature 4: Booking data

A customer will be making their booking and providing payment via a payment gateway. You are not required to create a mock payment gateway, but using a payment gateway would be a plus (+ it might help you handle some payment security). You can assume that a booking is successful once the user submits a valid form with the relevant guest information (see deliverables).

The data here is used to display booking information about the stay & for tracking customer support purposes. Here’s a sample booking information:

Information
Description
Destination ID
-
Hotel ID
-
Booking display information
Number of nights, start date, end date, adults, children, message to hotel, room types
Price
The price paid for this booking
Booking reference
Your system’s booking ID
Guest  information
Salutation, first name, last name
Payee information
Payment ID, Payee ID


Deliverables: 

A form that collects the user’s guest information:
First Name & Last Name
Phone Number & Email Address
Special requests to hotel
Payment information (credit card number, expiry date, CVV/CVC)
Billing address
A submit button that calls a Create Booking API (you should implement the API yourself)
Booking information that you store in your database should look something like the table above. Make sure you have some privacy security in place (see non-functional requirements).


# ESC_Project
# ESC_Project
