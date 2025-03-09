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
                "Authorization": "Bearer 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"
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
document.getElementById("siteForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const companyName = document.getElementById("companyName").value;
    const businessDesc = document.getElementById("businessDesc").value;
    const domainName = document.getElementById("domainName").value.trim();
    const resultDiv = document.getElementById("generatedPage");
    const domainCheckResult = document.getElementById("domainCheckResult");

    resultDiv.innerHTML = "Generowanie strony...";
    domainCheckResult.innerHTML = "Sprawdzanie dostępności domeny...";

    // Sprawdzenie dostępności domeny
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/dnslookup?domain=${domainName}.pl`, {
            method: "GET",
            headers: { "X-Api-Key": "KJqBMpPWt7/Kn910jJ0AjA==eWc8mAf8ugotum0B" }
        });

        const data = await response.json();
        if (data.error) {
            domainCheckResult.innerHTML = `<p style="color: green;">Domena ${domainName}.pl jest dostępna!</p>`;
        } else {
            domainCheckResult.innerHTML = `<p style="color: red;">Domena ${domainName}.pl jest już zajęta.</p>`;
        }
    } catch (error) {
        domainCheckResult.innerHTML = "<p>Błąd podczas sprawdzania domeny.</p>";
        console.error(error);
    }

    // Generowanie treści strony (KJqBMpPWt7/Kn910jJ0AjA==eWc8mAf8ugotum0B)
});
