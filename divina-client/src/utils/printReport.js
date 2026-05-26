import { brand } from '../theme/dashboardTheme';

export function openPrintReport({ title, description, contentHtml }) {
  const printContent = contentHtml;
  if (!printContent) {
    return;
  }

  const printWindow = window.open('', '_blank', 'width=1200,height=900');
  if (!printWindow) {
    return;
  }

  const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((node) => node.outerHTML)
    .join('');

  const exportedAt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date());

  printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    ${headMarkup}
    <style>
      @page {
        size: A4;
        margin: 16mm;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: system-ui, "Segoe UI", Roboto, sans-serif;
        background: #fff;
        color: ${brand.ink};
      }

      .report-shell {
        padding: 28px;
      }

      .report-brand {
        display: inline-block;
        margin-bottom: 8px;
        padding: 6px 12px;
        border: 2px solid ${brand.border};
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: ${brand.orange};
      }

      .report-header {
        margin-bottom: 24px;
        padding-bottom: 14px;
        border-bottom: 2px solid ${brand.border};
      }

      .report-header h1 {
        margin: 0 0 8px;
        font-size: 28px;
        font-weight: 900;
        letter-spacing: -0.02em;
      }

      .report-header p {
        margin: 0 0 4px;
        font-size: 14px;
        color: ${brand.muted};
        line-height: 1.5;
      }

      .report-meta {
        margin-top: 10px;
        font-size: 12px;
        color: ${brand.muted};
      }

      .report-content .MuiCard-root {
        box-shadow: none !important;
        border: 2px solid ${brand.border} !important;
        border-radius: 20px !important;
        break-inside: avoid;
        page-break-inside: avoid;
        margin-bottom: 16px;
      }

      .report-content .MuiCardContent-root {
        padding: 20px;
      }

      .report-content svg {
        max-width: 100%;
      }

      .report-content table {
        width: 100%;
        border-collapse: collapse;
      }

      .report-content th,
      .report-content td {
        padding: 10px 12px;
        text-align: left;
        border-bottom: 1px solid #e5e5e5;
        font-size: 12px;
      }

      .report-content th {
        background-color: ${brand.orangeLight};
        font-weight: 800;
      }
    </style>
  </head>
  <body>
    <main class="report-shell">
      <header class="report-header">
        <span class="report-brand">Paws &amp; Claws</span>
        <h1>${title}</h1>
        <p>${description}</p>
        <p class="report-meta">Prepared on ${exportedAt}</p>
      </header>
      <section class="report-content">
        ${printContent}
      </section>
    </main>
  </body>
</html>`);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
