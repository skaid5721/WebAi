document.getElementById("siteForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const companyName = document.getElementById("companyName").value;
    const businessDesc = document.getElementById("businessDesc").value;
    const resultDiv = document.getElementById("generatedPage");

    resultDiv.innerHTML = "Generowanie strony...";

    // API AI do generowania treści (np. OpenAI)
    const prompt = `Stwórz stronę internetową dla firmy "${companyName}", która zajmuje się "${businessDesc}". Wygeneruj nagłówki, opisy i CTA.`;

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer TWÓJ_KLUCZ_API"
            },
            body: JSON.stringify({
                model: "gpt-4",
                prompt: prompt,
                max_tokens: 500
            })
        });

        const data = await response.json();
        resultDiv.innerHTML = `<h3>Twoja wygenerowana strona:</h3><p>${data.choices[0].text}</p>`;
    } catch (error) {
        resultDiv.innerHTML = "<p>Błąd podczas generowania strony.</p>";
        console.error(error);
    }
});
