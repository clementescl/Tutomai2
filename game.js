document.addEventListener("DOMContentLoaded", () => {
  // const modal = document.getElementById("modal");
  // const closeModal = document.getElementById("closeModal");

  // // Close the modal when the 'x' button is clicked
  // closeModal.onclick = () => {
  //   modal.style.display = "none";
  // };

  // // Close the modal when clicking outside of it
  // window.onclick = (event) => {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // };

  // Move the event listeners inside the DOMContentLoaded event
  document.getElementById("neverButton").addEventListener("click", neverHaveIEver);
  document.getElementById("lyricsButton").addEventListener("click", finishTheLyrics);
  document.getElementById("verdadButton").addEventListener("click", truth);
  document.getElementById("retoButton").addEventListener("click", dare);
  
});

function displayResult(text) {
  const result = document.getElementById("result");
  if (result) {
    result.textContent = text;
  }
}

async function neverHaveIEver() {
  const prompt = "Generate a 'Never Have I Ever' statement.";
  await delay(1000);
  const response = await openAIRequest(prompt);
  displayResult(response);
  console.log("Never Have I Ever response:", response);
}

async function finishTheLyrics() {
  const prompt = "Give me a random number between 1 and 6";
  await delay(1000);
  const response = await openAIRequest(prompt);
  displayResult(response);
  console.log("Finish the Lyrics response:", response);
}

async function truth() {
  const prompt = "Give me a truth question for the game Truth or Dare:";
  await delay(1000);
  const response = await openAIRequest(prompt);
  displayResult(response);
  console.log("truth response", response);
}

async function dare() {
  const prompt = "Give me a hot dare for the game Truth or Dare:";
  await delay(1000);
  const response = await openAIRequest(prompt);
  displayResult(response);
  console.log("dare response", response);
  }

  async function openAIRequest(prompt) {
  const apiKey = "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";
  const url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  try {
    const response = await axios.post(url, {
      prompt: prompt,
      max_tokens: 30,
      n: 1,
      stop: null,
      temperature: 1.0
    }, { headers });

    console.log("API response:", response);

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    }
  } catch (error) {
    
    console.error("Error in OpenAI request:", error);

    if (error.response && error.response.status === 429) {
      displayResult("Error: Límite de tasa (rate limit) excedido. Intente de nuevo más tarde.");
      return "";
    } else {
      displayResult("Error: Problema con la API.");
      return "";
    }
  }
  return "";
}