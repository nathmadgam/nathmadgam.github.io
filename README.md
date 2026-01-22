<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=0d1117&height=250&section=header&text=Syntax%20Mastery&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlign=50" alt="Project Banner" width="100%"/>

  <p>
    <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge&logo=github" alt="Version" />
    <img src="https://img.shields.io/badge/maintained-yes-success?style=for-the-badge&logo=checkmark" alt="Maintained" />
    <img src="https://img.shields.io/badge/license-MIT-purple?style=for-the-badge&logo=book" alt="License" />
    <img src="https://img.shields.io/badge/built%20with-Markdown-white?style=for-the-badge&logo=markdown" alt="Markdown" />
  </p>

  <h3>
    A comprehensive guide to <a href="https://docs.github.com/en/get-started/writing-on-github">GitHub Flavored Markdown</a> formatting.
  </h3>
  
  <p>
    <a href="#-features">Features</a> • 
    <a href="#-installation">Installation</a> • 
    <a href="#-documentation">Docs</a> • 
    <a href="#-support">Support</a>
  </p>
</div>

---

## 📖 Table of Contents
- [1. Typography & Text](#1-typography--text)
- [2. Advanced Blocks (Alerts & Quotes)](#2-advanced-blocks-alerts--quotes)
- [3. Code & Syntax Highlighting](#3-code--syntax-highlighting)
- [4. Visual Elements (Tables & Diagrams)](#4-visual-elements-tables--diagrams)
- [5. Interactive Elements](#5-interactive-elements)

---

## 1. Typography & Text

### Basics
| Style | Syntax | Result |
| :--- | :--- | :--- |
| **Bold** | `**Bold**` | **Bold** |
| *Italic* | `*Italic*` | *Italic* |
| ~~Strike~~ | `~~Strike~~` | ~~Strike~~ |
| `Monospace` | `` `Code` `` | `Code` |

### Math (LaTeX)
GitHub supports math expressions using LaTeX syntax (MathJax).
- **Inline:** $E = mc^2$ (`$E = mc^2$`)
- **Block:**
$$
\sum_{i=1}^{n} x_i
$$
(Wrapped in `$$`)

### Keyboard Shortcuts
Use the `<kbd>` HTML tag to visualize keys:
> Press <kbd>CTRL</kbd> + <kbd>C</kbd> to copy.

---

## 2. Advanced Blocks (Alerts & Quotes)

### Standard Blockquote
> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

### GitHub Alerts
Use these specific headers inside blockquotes to create colored alerts.

> [!NOTE]
> **Note:** Useful information that users should know, even when skimming.

> [!TIP]
> **Tip:** Helpful advice for doing things better or faster.

> [!IMPORTANT]
> **Important:** Key information users need to know to achieve their goal.

> [!WARNING]
> **Warning:** Urgent info that needs immediate user attention.

> [!CAUTION]
> **Caution:** Advises about risks or negative outcomes of certain actions.

---

## 3. Code & Syntax Highlighting

### Multi-line Blocks
Specify the language (e.g., `python`, `js`, `rust`, `lua`) for color support.

```python
# Python Example
def hello_world():
    print("Welcome to the Premium Readme")
