import writeGood from "write-good";
import "./styles.css";

const textarea = document.getElementById("input");
const results = document.getElementById("results");
const analyzeBtn = document.getElementById("analyze-btn");

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function analyzeText() {
  const text = textarea.value.trim();

  if (!text) {
    results.innerHTML =
      "<p class='empty'>Please enter some text.</p>";
    return;
  }

  const suggestions = writeGood(text);

  if (suggestions.length === 0) {
    results.innerHTML =
      "<div class='success'>✅ No issues detected.</div>";
    return;
  }

  results.innerHTML = suggestions
    .map(
      (item) => `
        <div class="suggestion">
          <div class="reason">${escapeHtml(item.reason)}</div>
          <div><strong>Matched:</strong> ${escapeHtml(item.match)}</div>
          <div><strong>Position:</strong> ${item.index}</div>
        </div>
      `
    )
    .join("");
}

analyzeBtn.addEventListener("click", analyzeText);
