// 联系页面样式
export const contactPageStyles = `
  body {
    background: linear-gradient(120deg, #fffaf5 0%, #fff5f0 50%, #fff0eb 100%) !important;
    min-height: 100vh;
  }
  :root {
    --size-content: 1200px !important;
  }
  .contact-page-container {
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 0 2rem !important;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .contact-page-container {
      padding: 0 1rem !important;
    }
    .contact-title {
      font-size: 2rem !important;
    }
    .contact-subtitle {
      font-size: 1.1rem !important;
    }
  }
` 