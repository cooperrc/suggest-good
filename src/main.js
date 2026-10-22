import writeGood from "write-good";
import "./styles.css";

const textarea = document.getElementById("input");
const results = document.getElementById("results");

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function updateResults() {
  const text = textarea.value;

  if (!text.trim()) {
    results.innerHTML =
      "<p class='empty'>Enter text above to begin.</p>";
    return;
  }

  const suggestions = writeGood(text);

  if (suggestions.length === 0) {
    results.innerHTML = `
      <div class="success">
        ✅ No issues detected
      </div>
    `;
    return;
  }

  results.innerHTML = suggestions
    .map(
      (item) => `
        <div class="suggestion">
          <div class="reason">
            ${escapeHtml(item.reason)}
          </div>

          <div class="match">
            <strong>Matched:</strong>
            ${escapeHtml(item.match)}
          </div>

          <div class="position">
            <strong>Position:</strong>
            ${item.index}
          </div>
        </div>
      `
    )
    .join("");
}

textarea.addEventListener("input", updateResults);
