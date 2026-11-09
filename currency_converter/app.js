// Primary API URL for fetching currency exchange rates
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Backup API URL if the primary API fails
const FALLBACK_URL = "https://latest.currency-api.pages.dev/v1/currencies";

// Select all currency dropdowns (From and To)
const dropdowns = document.querySelectorAll(".dropdown select");

// Select the exchange rate button
const btn = document.querySelector("form button");

// Select the From and To currency dropdowns individually
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// Select the element where the conversion result will be displayed
const msg = document.querySelector(".msg");

// Select the currency swap icon
const swapIcon = document.querySelector(".dropdown i");

// Loop through both currency dropdowns
for (let select of dropdowns) {
  // Loop through all currency codes in the countryList object
  for (let currCode in countryList) {
    // Create a new HTML option element
    let newOption = document.createElement("option");

    // Set the visible text and value of the option
    newOption.innerText = currCode;
    newOption.value = currCode;

    // Set USD as the default currency in the From dropdown
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
      // Set INR as the default currency in the To dropdown
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    // Add the option to the current dropdown
    select.append(newOption);
  }

  // Update the flag when the selected currency changes
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to fetch the exchange rate and calculate the converted amount
const updateExchangeRate = async () => {
  // Select the input field containing the amount
  let amount = document.querySelector(".amount input");

  // Convert the entered value to a number
  let amtVal = Number(amount.value);

  // Check whether the amount is invalid or less than/equal to zero
  if (!Number.isFinite(amtVal) || amtVal <= 0) {
    msg.innerText = "Please enter an amount greater than 0.";
    return;
  }

  // Display a loading message while fetching the exchange rate
  msg.innerText = "Getting exchange rate…";

  // Get the selected currency codes and convert them to lowercase
  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  try {
    // Variable to store the API response
    let response;

    try {
      // Try fetching exchange rates from the primary API
      response = await fetch(`${BASE_URL}/${from}.json`);

      // Use the backup API if the primary request fails
      if (!response.ok) throw new Error("Primary API failed");
    } catch {
      // If the primary API fails, fetch data from the backup API
      response = await fetch(`${FALLBACK_URL}/${from}.json`);
    }

    // Convert the API response into a JavaScript object
    const data = await response.json();

    // Get the exchange rate for the selected destination currency
    const rate = data[from]?.[to];

    // Check whether the exchange rate exists
    if (rate !== undefined) {
      // Multiply the amount by the exchange rate and format to 2 decimal places
      const finalAmount = (amtVal * rate).toFixed(2);

      // Display the final converted amount
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } else {
      // Display a message if the exchange rate is unavailable
      msg.innerText = `Exchange rate for ${fromCurr.value} to ${toCurr.value} is not available`;
    }
  } catch (error) {
    // Display an error message if fetching or processing the data fails
    msg.innerText = "Something went wrong while fetching exchange rate.";
    console.error("Error fetching exchange rate:", error);
  }
};

// Function to update the flag based on the selected currency
const updateFlag = (element) => {
  // Get the selected currency code
  let currCode = element.value;

  // Get the corresponding country code from countryList
  let countryCode = countryList[currCode];

  // Continue only if a country code exists
  if (countryCode) {
    // Construct the flag image URL using the country code
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    // Find the flag image next to the selected dropdown
    let img = element.parentElement.querySelector("img");

    // Update the flag image if the image element exists
    if (img) {
      img.src = newSrc;
    }
  }
};

// Listen for clicks on the swap icon
if (swapIcon) {
  swapIcon.addEventListener("click", () => {
    // Store the current From currency temporarily
    let tempCode = fromCurr.value;

    // Swap the selected currencies
    fromCurr.value = toCurr.value;
    toCurr.value = tempCode;

    // Update the From and To flags
    updateFlag(fromCurr);
    updateFlag(toCurr);

    // Fetch the exchange rate for the swapped currencies
    updateExchangeRate();
  });
}

// Listen for clicks on the Get Exchange Rate button
btn.addEventListener("click", (evt) => {
  // Prevent the form from submitting and reloading the page
  evt.preventDefault();

  // Fetch the exchange rate and display the converted amount
  updateExchangeRate();
});

// Run the conversion automatically when the page finishes loading
window.addEventListener("load", () => {
  updateExchangeRate();
});
